import { reduce } from 'lodash';
import { metaDataItemToMap } from './metadataItems';

export const tagItemsToMap = tagItems =>
  reduce(tagItems, (result, tagItem) => ({
    ...result,
    [tagItem.id]: {
      ...tagItem,
      metadata_items: tagItem.metadata_items
        && tagItem.metadata_items.length
        && metaDataItemToMap(tagItem.metadata_items),
    },
  }), {});
