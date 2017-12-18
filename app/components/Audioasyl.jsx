import React, { PropTypes } from 'react';
// import levenshtein from 'fast-levenshtein';
import { map, flattenDeep, filter, reduce, toLower } from 'lodash';
import VisibilitySensor from 'react-visibility-sensor';

import { tagCategoriesWithTagItemsAndSchema } from '../queries/tagCategory';
import { recordFiles, onlyFreshRecords } from '../queries/recordItem';
import { restoreScrollPosition, getLikes } from '../utils';
import { tagItemsWithMetaData } from '../queries/tagItem';
import { freshRecordsToMap } from '../parsers/recordFile';
import { tagCategoriesToMap } from '../parsers/category';
import { tagItemsToMap } from '../parsers/tagItem';
import MainHeader from './header/MainHeader';
import ContentLoader from './ContentLoader';
import superFetch from '../superFetch';
import News from './categories/News';
import Show from './categories/Show';
import Type from './categories/Type';
import Style from './categories/Style';
import About from './categories/About';
import Footer from './footer/Footer';
import './Audioasyl.scss';
class Audioasyl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchContext: {
        artist: artists => this.setState({ artists }),
        album: albums => this.setState({ albums }),
      },
      likes: [],
      searchText: '',
      categories: {},
      distance: Infinity,
      width: '0',
      height: '0',
      on: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount = () => {
    this.loadData(this.props);
    this.fetchRepositoryFiles();
    getLikes()
      .then(({ likes }) => this.setState({ likes }))
      .catch(err => console.error(err)); // eslint-disable-line
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  fetchRepositoryFiles = () =>
    superFetch(
      onlyFreshRecords(recordFiles([])),
      data => this.setState({ freshRecordIds: freshRecordsToMap(data) }),
    );

  loadData = () => {
    this.setState({ isLoading: true });
    superFetch(
      tagCategoriesWithTagItemsAndSchema(['authors', 'series', 'genre']),
      data => {
        this.setState({ categories: tagCategoriesToMap(data) });
        this.loadMetaData(pickTegItemIds(data));
      });
  }

  loadMetaData = ids => {
    superFetch(
      tagItemsWithMetaData(ids),
      data =>
        this.setState({
          metaData: tagItemsToMap(data),
          isLoading: false,
        })
      );
  }

  filterMetaData = () => {
    if (!this.state.searchText) {
      return this.state.categories;
    }

    const searchText = this.state.searchText;
    const REGEX = new RegExp(toLower(searchText));

    return reduce(this.state.categories, (result, category) => {
      const filteredTags = filter(category.tag_items, tagItem =>
        toLower(tagItem.name).match(REGEX)
      );
        // if you want to use levenshtein
        // const distance = levenshtein.get(searchText, tagItem.name);
        // return distance - (tagItem.name.length - searchText.length) < 3;

      return {
        ...result,
        [category.key]: {
          ...category,
          tag_items: filteredTags,
        },
      };
    }, {});
  }

  scrollToElement = (e, key) => { // eslint-disable-line
    if (window.retainScroll) {
      return window.scrollTo(0, restoreScrollPosition());
    }

    if (key === this.context.location.hash) {
      return window.scrollTo(0, e.refs.anchor.parentElement.offsetTop + e.refs.anchor.offsetTop);
    }
  }

  onNewsChange = isVisible => {
    if (isVisible) {
      this.setState({ on: 'News' });
    }
  };
  onShowChange = isVisible => {
    if (isVisible) {
      this.setState({ on: 'Show' });
    }
  };
  onStyleChange = isVisible => {
    if (isVisible) {
      this.setState({ on: 'Style' });
    }
  };
  onTypeChange = isVisible => {
    if (isVisible) {
      this.setState({ on: 'Type' });
    }
  };
  onAboutChange = isVisible => {
    if (isVisible) {
      this.setState({ on: 'About' });
    }
  };

  renderCategories = () => {
    const categories = this.filterMetaData();
    return (
      <div>
        <VisibilitySensor minTopValue={100} intervalDelay={200} partialVisibility scrollCheck onChange={this.onNewsChange}>
          <News
            category={categories.series}
            likes={this.state.likes}
            metaData={this.state.metaData}
            freshRecordIds={this.state.freshRecordIds}
            ref={e => e && this.scrollToElement(e, '#news')}
          />
        </VisibilitySensor>
        <VisibilitySensor minTopValue={100} intervalDelay={200} partialVisibility scrollCheck onChange={this.onShowChange}>
          <Show
            category={categories.series}
            likes={this.state.likes}
            metaData={this.state.metaData}
            freshRecordIds={this.state.freshRecordIds}
            ref={e => e && this.scrollToElement(e, '#show')}
            windowHeight={this.state.height}
          />
        </VisibilitySensor>
        <VisibilitySensor minTopValue={100} intervalDelay={200} partialVisibility scrollCheck onChange={this.onStyleChange}>
          <Style
            category={categories.genre}
            likes={this.state.likes}
            metaData={this.state.metaData}
            freshRecordIds={this.state.freshRecordIds}
            ref={e => e && this.scrollToElement(e, '#style')}
          />
        </VisibilitySensor>
        <VisibilitySensor minTopValue={100} intervalDelay={200} partialVisibility scrollCheck onChange={this.onTypeChange}>
          <Type
            category={categories.authors}
            likes={this.state.likes}
            metaData={this.state.metaData}
            freshRecordIds={this.state.freshRecordIds}
            ref={e => e && this.scrollToElement(e, '#type')}
          />
        </VisibilitySensor>
        <VisibilitySensor minTopValue={100} intervalDelay={200} partialVisibility scrollCheck onChange={this.onAboutChange}>
          <About
            category={categories.authors}
            likes={this.state.likes}
            metaData={this.state.metaData}
            freshRecordIds={this.state.freshRecordIds}
            ref={e => e && this.scrollToElement(e, '#about')}
          />
        </VisibilitySensor>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="Audioasyl-placeholder">
          <ContentLoader />
        </div>
      );
    }

    return (
      <div className="Audioasyl">
        <MainHeader
          onFilterChange={this.buildSearchContext}
          setSearchText={searchText => this.setState({ searchText })}
          on={this.state.on}
        />
        {/* <MainAnimation windowWidth={this.state.width} windowHeight={this.state.height} /> */}
        {this.renderCategories()}
        <Footer />
      </div>
    );
  }
}

const pickTegItemIds = categories =>
  flattenDeep(map(categories, category =>
    map(category.tag_items, tagItem => tagItem.id))
  );

Audioasyl.contextTypes = {
  location: PropTypes.object.isRequired,
};

export default Audioasyl;

