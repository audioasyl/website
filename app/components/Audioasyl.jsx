import React, { PropTypes } from 'react';
import { map, flattenDeep } from 'lodash';

import { tagCategoriesWithTagItemsAndSchema } from '../queries/tagCategory';
import { tagItemsWithMetaData } from '../queries/tagItem';
import { tagCategoriesToMap } from '../parsers/category';
import { tagItemsToMap } from '../parsers/tagItem';
import MainHeader from './header/MainHeader';
import Player from './player/Player';
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
      categories: {},
    };
  }

  getChildContext = () => ({
    router: this.props.router,
    location: this.props.location,
  });

  componentWillMount = () => {
    this.loadData(this.props);
  }

  buildSearchContext = () => {

  }

  loadData = () => {
    this.setState({ isLoading: true });
    tagCategoriesWithTagItemsAndSchema()
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

  renderCategories = () =>
    map(this.state.categories, category => (
      <Category key={category.id} category={category} metaData={this.state.metaData} />
    ))

  render() {
    if (this.state.isLoading) {
      return (<div>LOADING !!!</div>);
    }

    return (
      <div className="Audioasyl">
        <MainHeader
          searchContext={this.state.searchContext}
          onFilterChange={this.buildSearchContext}
        />
        {this.renderCategories()}
        <Player />
      </div>
    );
  }
}

const pickTegItemIds = categories =>
  flattenDeep(map(categories, category =>
    map(category.tag_items, tagItem => tagItem.id))
  );

Audioasyl.childContextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

Audioasyl.propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Audioasyl;
