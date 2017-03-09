import { values, map } from 'lodash';
import { selectRepository, vaultData } from './repository';
import {
  MODEL_ATTRIBUTES as META_DATA_ITEMS_ATTRIBUTES,
  MODEL_NAME as META_DATA_ITEMS,
} from './metaDataItem';
import {
  MODEL_ATTRIBUTES as SCHEMA_ATTRIBUTES,
  MODEL_NAME as MODEL_SCHEMAS,
} from './metaSchema';
import {
  MODEL_ATTRIBUTES as TAG_ITEMS_ATTRIBUTES,
  MODEL_NAME as MODEL_TAG_ITEMS,
} from './tagItem';

export const MODEL_NAME = 'tag_categories';
export const MODEL = 'Data.Tag.Category';
export const MODEL_ATTRIBUTES = {
  references: 'references',
  extra: 'extra',
  name: 'name',
  key: 'key',
  id: 'id',
};

export const tagCategories = (attrs = values(MODEL_ATTRIBUTES)) =>
  selectRepository(
    vaultData(MODEL)
      .select(...attrs)
  );

export const tagCategoriesSchemas = (metaData = values(SCHEMA_ATTRIBUTES)) =>
  tagCategories()
    .joins(MODEL_SCHEMAS)
    .select(...map(metaData, value => `metadata_schemas.${value}`)
  );

export const tagCategoriesWithTagItemsAndSchema = (metaData = values(TAG_ITEMS_ATTRIBUTES)) =>
  tagCategories()
    .joins(MODEL_TAG_ITEMS)
    .joins(MODEL_SCHEMAS)
    .select(
      ...map(SCHEMA_ATTRIBUTES, value => `metadata_schemas.${value}`),
      ...map(metaData, value => `tag_items.${value}`)
  );

export const tagCategoriesWithMetaDataItems = (metaData = values(META_DATA_ITEMS_ATTRIBUTES)) =>
  tagCategories()
    .joins(META_DATA_ITEMS)
    .select(...map(metaData, value => `metadata_items.${value}`)
  );
