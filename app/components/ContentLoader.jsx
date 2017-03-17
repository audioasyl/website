import React from 'react';
import spiner from '../../public/images/spiner.svg';

const ContentLoader = () => (
  <div className="ContentLoader">
    <img className="ContentLoader-spinner" src={spiner} alt="spiner" />
  </div>
);

export default ContentLoader;
