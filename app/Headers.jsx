import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import img from '../public/images/logo.png';
const Headers = ({ title, ogTitle, ogDescription, ogImage }) => (
  <Helmet>
    <title>{`Audioasyl - ${title}`}</title>
    <meta
      property="og:url"
      content={window.location.href}
    />
    <meta
      property="og:type"
      content="article"
    />
    <meta
      property="og:title"
      content={`Audioasyl - ${ogTitle}`}
    />
    <meta
      property="og:description"
      content={ogDescription}
    />
    <meta
      property="og:image"
      content={ogImage}
    />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </Helmet>
);

Headers.propTypes = {
  title: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
};

Headers.defaultProps = {
  title: '',
  ogTitle: '',
  ogImage: img,
  ogDescription: 'Audioasyl',
};

export default Headers;
