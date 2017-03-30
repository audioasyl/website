import React, { PropTypes } from 'react';

import Show from './Show';
import Type from './Type';
import Genre from './Genre';
import Author from './Author';
import { Categories, Status } from '../../enums';
import ContentLoader from '../ContentLoader';
import { tagCategoriesToMap } from '../../parsers/category';
import { tagItemsWithMetaData } from '../../queries/tagItem';
import { tagCategoriesSchemas } from '../../queries/tagCategory';

import './TileDetails.scss';
class TileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategoryLoading: Status.UNLOADED,
      isItemLoading: Status.UNLOADED,
    };
  }

  componentWillMount = () => {
    this.fetchData(this.props);
    this.fetchSchema(this.props);
    !this.state.id && this.setState({ id: this.context.router.params.id });
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    this.setState({ id: this.context.router.params.id });
    if (this.state.id !== nextContext.router.params.id) {
      this.setState({
        isCategoryLoading: Status.UNLOADED,
        isItemLoading: Status.UNLOADED,
      });

      this.fetchData(nextProps);
      this.fetchSchema(nextProps);
    }
  }

  fetchSchema = props => {
    this.setState({ isCategoryLoading: Status.LOADING });
    tagCategoriesSchemas()
      .where('key', 'eq', props.router.params.category)
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({
          category: tagCategoriesToMap(data.toJS())[props.router.params.category],
          isCategoryLoading: Status.LOADED,
        });
      })
      .on('error', (_, __, err) => {
        this.setState({ isCategoryLoading: Status.ERROR });
        console.log('error', err);
      });
  }

  fetchData = props => {
    this.setState({ isItemLoading: Status.LOADING });
    tagItemsWithMetaData([props.router.params.id])
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({ item: data.toJS()[0], isItemLoading: Status.LOADED });
      })
      .on('error', (_, __, err) => {
        this.setState({ isItemLoading: Status.ERROR });
        console.log('error', err);
      });
  }

  renderContent = () => {
    const { category, item } = this.state;
    switch (this.props.router.params.category) {
    case Categories.SHOW:
      return (<Show category={category} show={item} likes={this.props.likes} />);
    case Categories.AUTHOR:
      return (<Author category={category} author={item} likes={this.props.likes} />);
    case Categories.GENRE:
      return (<Genre category={category} genre={item} likes={this.props.likes} />);
    case Categories.TYPE:
      return (<Type category={category} type={item} likes={this.props.likes} />);
    default:
      return null;
    }
  }

  render() {
    const { isCategoryLoading, isItemLoading } = this.state;
    if (isCategoryLoading === Status.LOADING || isItemLoading === Status.LOADING) {
      return (
        <div className="TileDetails TileDetails-placeholder" >
          <ContentLoader />
        </div>
      );
    }

    return (
      <div className="TileDetails" >
        <div />
        <div className="TileDetails-main">
          {this.renderContent()}
        </div>
        <div />
      </div>
    );
  }
}

TileDetails.propTypes = {
  router: PropTypes.object.isRequired,
  likes: PropTypes.array,
};

TileDetails.contextTypes = {
  likes: [],
  router: PropTypes.object.isRequired,
};

export default TileDetails;
