import React, { PropTypes } from 'react';
import levenshtein from 'fast-levenshtein';
import { map, flattenDeep, filter, reduce } from 'lodash';

import { tagCategoriesWithTagItemsAndSchema } from '../queries/tagCategory';
import { recordFiles, onlyFreshRecords } from '../queries/recordItem';
import { tagItemsWithMetaData } from '../queries/tagItem';
import { tagCategoriesToMap } from '../parsers/category';
import { freshRecordsToMap } from '../parsers/recordFile';
import { tagItemsToMap } from '../parsers/tagItem';
import MainHeader from './header/MainHeader';
import ContentLoader from './ContentLoader';
import Category from './Category';

import './Audioasyl.scss';
class Audioasyl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchContext: {
        artist: artists => this.setState({ artists }),
        album: albums => this.setState({ albums }),
      },
      searchText: '',
      categories: {},
      distance: Infinity,
    };
  }

  componentWillMount = () => {
    this.loadData(this.props);
    this.fetchRepositoryFiles();
  }

  buildSearchContext = () => {

  }

  fetchRepositoryFiles = () =>
    onlyFreshRecords(recordFiles([]))
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({ freshRecordIds: freshRecordsToMap(data.toJS()) });
      })
      .on('error', (_, __, err) => console.log('error', err));

  loadData = () => {
    this.setState({ isLoading: true });
    tagCategoriesWithTagItemsAndSchema(['authors', 'series', 'genre'])
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({ categories: tagCategoriesToMap(data.toJS()) });
        this.loadMetaData(pickTegItemIds(data.toJS()));
      })
      .on('error', (_, __, err) => console.log('error', err));
  }

  loadMetaData = ids => {
    tagItemsWithMetaData(ids)
      .fetch()
      .on('fetch', (_, __, data) =>
        this.setState({
          metaData: tagItemsToMap(data.toJS()),
          isLoading: false,
        })
      )
      .on('error', (_, __, err) => console.log('error', err));
  }

  filterMetaData = () => {
    if (!this.state.searchText) {
      return this.state.categories;
    }

    const searchText = this.state.searchText;

    return reduce(this.state.categories, (result, category) => {
      const filteredTags = filter(category.tag_items, tagItem => {
        const distance = levenshtein.get(searchText, tagItem.name);
        return distance - (tagItem.name.length - searchText.length) < 3;
      });

      return {
        ...result,
        [category.key]: {
          ...category,
          tag_items: filteredTags,
        },
      };
    }, {});
  }

  scrollToElement = (e, category) => {
    if (`#${category.key}` === this.context.location.hash) {
      window.scrollTo(0, e.refs.anchor.parentElement.offsetTop + e.refs.anchor.offsetTop);
    }
  }

  renderCategories = () =>
    map(this.filterMetaData(), category => (
      <Category
        key={category.id}
        category={category}
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
