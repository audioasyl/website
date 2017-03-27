import React, { PropTypes } from 'react';

import Show from './Show';
import Type from './Type';
import Genre from './Genre';
import Author from './Author';
import { Categories } from '../../enums';
import ContentLoader from '../ContentLoader';
import { tagCategoriesToMap } from '../../parsers/category';
import { tagItemsWithMetaData } from '../../queries/tagItem';
import { tagCategoriesSchemas } from '../../queries/tagCategory';

import './TileDetails.scss';
class TileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategoryLoading: false,
      isItemLoading: false,
    };
  }

  componentWillMount = () => {
    this.fetchData(this.props);
    this.fetchSchema(this.props);
  }

  componentWillReceiveProps = nextProps => {
    this.fetchData(nextProps);
    this.fetchSchema(nextProps);
  }

  onCloseClick = () =>
    this.props.router.goBack()

  fetchSchema = props => {
    this.setState({ isCategoryLoading: true });
    tagCategoriesSchemas()
      .where('key', 'eq', props.router.params.category)
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({
          category: tagCategoriesToMap(data.toJS())[props.router.params.category],
          isCategoryLoading: false,
        });
      })
      .on('error', (_, __, err) => {
        console.log('error', err);
      });
  }

  fetchData = props => {
    this.setState({ isItemLoading: true });
    tagItemsWithMetaData([props.router.params.id])
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({ item: data.toJS()[0] });
        this.setState({ isItemLoading: false });
      })
      .on('error', (_, __, err) => {
        console.log('error', err);
      });
  }
  renderContent = () => {
    const { category, item } = this.state;
    switch (this.props.router.params.category) {
    case Categories.SHOW:
      return (<Show category={category} show={item} />);
    case Categories.AUTHOR:
      return (<Author category={category} author={item} />);
    case Categories.GENRE:
      return (<Genre category={category} genre={item} />);
    case Categories.TYPE:
      return (<Type category={category} type={item} />);
    default:
      return null;
    }
  }

  render() {
    const { isCategoryLoading, isItemLoading } = this.state;
    if (isCategoryLoading || isItemLoading) {
      return (
        <div className="TileDetails TileDetails-placeholder" >
          <ContentLoader />
        </div>
      );
    }

    return (
      <div className="TileDetails TileDetails-fadeOut" >
        <div />
        <button className="TileDetails-close" onClick={this.onCloseClick}>
          Go back to home page
        </button>
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
};

TileDetails.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default TileDetails;
