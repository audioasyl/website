import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map, size, sortBy, lowerCase } from 'lodash';
import TilePlaceholder from '../TilePlaceholder';
import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import AboutContent from './AboutContent';

import './About.scss';
import './Categories.scss';

class About extends React.Component {

  renderContent = () => {
    const {
      likes,
      category,
      metaData,
      freshRecordIds,
    } = this.props;

    return map(sortBy(category.tag_items, item => lowerCase(item.name)), tagItem => {
      const itemProperties =
        metaDataItemsToProperties(metaData[tagItem.id].metadata_items, category.metadata_schemas);

      itemProperties.isFresh = freshRecordIds.indexOf(tagItem.id) >= 0;
      //itemProperties.broadcast_channel_id = '15ffeff6-d946-4087-bc5c-ce9912ef222c'; // FIXME!!!!

      return (
        <div className="Category-about-inner">
          <AboutContent
            likes={likes}
            audio={tagItem}
            type={category.key}
            properties={itemProperties}
            key={tagItem.id}
            schema={category.metadata_schemas}
          />
        </div>
      );
    });
  }

  render() {
    const { category } = this.props;
    return (
      <div className="Category">
        <div className="Category-anchor" id="about" ref="anchor" />
        <div className="Category-section">
          <div className="Category-section-left" />
          <div className="Category-section-right">
            <div className="Category-section-title Invisibility">SHOW</div>
            <div className="Category-section-title Invisibility">STYLE</div>
            <div className="Category-section-title Invisibility">TYPE</div>
            <div className="Category-section-title">ABOUT</div>
          </div>
        </div>

        <div className="Catergory-common Category-about Underline">CONTRIBUTORS</div>
        <div style={{ height: 15 }} />

        {size(category.tag_items) ? <div className="Category-about-container">
          {this.renderContent()}
        </div> : <TilePlaceholder />}

        <div style={{ height: 35 }} />
        <div className="Catergory-common Category-about">ABOUT AUDIOASYL</div>
        <div style={{ height: 15 }} />
        <div className="Category-content-container">
          <div className="Category-content-inner">
            <div className="Catergory-common Category-about Normalcase">Audioasyl.net is an independent music hub based in Zurich, Switzerland.<br />Broadcasting daily live shows on the web, audioasyl.net serves as a showcase for the Swiss scene.<br />In addition audioasyl.net aims to establish international ties in the world of electronic music. Jack into our special programmer.</div>
          </div>
          <div className="Category-content-inner">
            <div className="Catergory-common Category-about Normalcase">zxc</div>
          </div>
        </div>
        <div style={{ height: 125 }} />
      </div>
    );
  }
}

About.propTypes = {
  likes: PropTypes.array,
  freshRecordIds: PropTypes.array,
  category: PropTypes.object.isRequired,
  metaData: PropTypes.object.isRequired,
};

About.defaultProps = {
  freshRecordIds: [],
  likes: [],
};

export default About;
