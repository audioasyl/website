import React, { PropTypes } from 'react';
// import levenshtein from 'fast-levenshtein';
import { map, flattenDeep, filter, reduce, toLower } from 'lodash';

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
import Category from './Category';
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
    };
  }

  componentWillMount = () => {
    this.loadData(this.props);
    this.fetchRepositoryFiles();
    getLikes()
      .then(({ likes }) => this.setState({ likes }))
      .catch(err => console.error(err)); // eslint-disable-line
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

  scrollToElement = (e, category) => { // eslint-disable-line
    if (window.retainScroll) {
      return window.scrollTo(0, restoreScrollPosition());
    }

    if (`#${category.key}` === this.context.location.hash) {
      return window.scrollTo(0, e.refs.anchor.parentElement.offsetTop + e.refs.anchor.offsetTop);
    }
  }

  renderCategories = () =>
    map(this.filterMetaData(), category => (
      <Category
        key={category.id}
        category={category}
        likes={this.state.likes}
        metaData={this.state.metaData}
        freshRecordIds={this.state.freshRecordIds}
        ref={e => e && this.scrollToElement(e, category)}
      />
  ))

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
        />
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
