import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map, size, sortBy, lowerCase } from 'lodash';
import Modal from 'react-modal';
import TilePlaceholder from '../TilePlaceholder';
import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import AboutContent from './AboutContent';
import Search from '../header/Search';
import Contact from '../Contact';

import './About.scss';
import './Categories.scss';

const customStyles = {
  content: {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class About extends React.Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

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
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle} className="Contact-title">
            Contact Form
          </h2>
          <Contact onClose={this.closeModal} />
        </Modal>

        <div className="Category">
          <div className="Category-anchor" id="about" ref="anchor" />
          <div className="Category-section">
            <div className="Category-section-left" />
            <div className="Category-section-right">
              <div className="Category-section-title Invisibility">SHOW</div>
              <div className="Category-section-title Invisibility">STYLE</div>
              <div className="Category-section-title Invisibility">TYPE</div>
              <div className="Category-section-title">ABOUT</div>
              <Search setSearchText="Search on page..." hidden />
            </div>
          </div>


          <div className="Category-about-text">ABOUT AUDIOASYL</div>
          <div style={{ height: 15 }} />
          <div className="Category-content-container White">
            <div className="Category-about-text-containter">
              <div className="Category-about-text">Audioasyl.net is an independent music hub based in Zurich, Switzerland.<br />Broadcasting daily live shows on the web, audioasyl.net serves as a showcase for the Swiss scene.<br />In addition audioasyl.net aims to establish international ties in the world of electronic music. Jack into our special programmer.</div><br />
            </div>
            <div className="Category-about-impressum">
              <div className="Category-about-impressum-text">
                <div>Impressum:</div><br />
                <div>audiostreaming</div>
                <a href="http://nocloud.ch" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                  <div className="Link">nocloud.ch</div><br />
                </a>
                <div>graphic design</div>
                <a href="http://www.pulse.ch" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                  <div className="Link">www.pulse.ch</div><br />
                </a>
                <div>coding</div>
                <a href="http://www.alainwolf.ch" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                  <div className="Link">www.alainwolf.ch</div><br />
                </a>
                <a href="http://www.marox.ch" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                  <div className="Link">www.marox.ch</div><br />
                </a>
                <a href="http://nocloud.ch" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                  <div className="Link">nocloud.ch</div><br />
                </a>
                <div>software</div>
                <a href="http://www.icecast.org" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>  
                  <div className="Link">www.icecast.org</div>
                </a>
                <div>Liquidsoap</div><br />
                <div>licensed by SUISA</div><br /><br />
                <div>audioasyl.net</div>
                <div>Kochstrasse 18</div>
                <div>8004 Zurich</div>
                <div>Switzerland</div><br />
                <div onClick={this.openModal}>
                  <div className="Link">Send Email</div><br />
                </div>
              </div>
            </div>
          </div>

          <div className="Category-about-text Underline">HOSTS</div>
          <div style={{ height: 25 }} />

          {size(category.tag_items) ? <div className="Category-about-container">
            {this.renderContent()}
          </div> : <TilePlaceholder />}

          <div style={{ height: 125 }} />
        </div>

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
