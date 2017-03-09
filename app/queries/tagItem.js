import { values, map } from 'lodash';
import { vaultData } from './repository';
import {
  MODEL_ATTRIBUTES as META_DATA_ITEMS_ATTRIBUTES,
  MODEL_NAME as META_DATA_ITEMS_NAME,
} from './metaDataItem';

export const MODEL_NAME = 'tag_items';
export const MODEL = 'Data.Tag.Item';
export const MODEL_ATTRIBUTES = {
  references: 'references',
  extra: 'extra',
  name: 'name',
  id: 'id',
};

export const tagItemsWithMetaData = ids =>
vaultData(MODEL)
  .where('id', 'in', ids)
  .joins(META_DATA_ITEMS_NAME)
  .select(
    ...values(MODEL_ATTRIBUTES),
    ...map(META_DATA_ITEMS_ATTRIBUTES, value => `metadata_items.${value}`)
  );

export const tagItemsMetaData = ids =>
  vaultData(META_DATA_ITEMS_NAME)
    .where('tag_item_id', 'in', ids)
    .select('tag_item_id', ...values(META_DATA_ITEMS_ATTRIBUTES));
