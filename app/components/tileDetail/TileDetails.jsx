import React, { PropTypes } from 'react';

import Show from './Show';
import Type from './Type';
import Genre from './Genre';
import Author from './Author';
import superFetch from '../../superFetch';
import ContentLoader from '../ContentLoader';
import { Categories, Status } from '../../enums';
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
  }

  componentDidMount = () => {
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
    superFetch(
      tagCategoriesSchemas().where('key', 'eq', props.router.params.category),
      data => {
        this.setState({
          category: tagCategoriesToMap(data)[props.router.params.category],
          isCategoryLoading: Status.LOADED,
        });
      },
      err => {
        this.setState({ isCategoryLoading: Status.ERROR });
        console.log('error', err); // eslint-disable-line
      });
  }

  fetchData = props => {
    this.setState({ isItemLoading: Status.LOADING });
    superFetch(
      tagItemsWithMetaData([props.router.params.id]),
      data => this.setState({ item: data[0], isItemLoading: Status.LOADED }),
      err => {
        this.setState({ isItemLoading: Status.ERROR });
        console.log('error', err); // eslint-disable-line
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
  router: PropTypes.object.isRequired,
};

TileDetails.defaultProps = {
  likes: [],
};

export default TileDetails;
