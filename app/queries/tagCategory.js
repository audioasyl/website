import { values, map } from 'lodash';
import { Categories } from '../enums';
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

export const MODEL_NAME = 'tag_category';
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
    .select(...map(metaData, value => `${MODEL_SCHEMAS}.${value}`)
  );

export const tagCategoriesWithTagItemsAndSchema =
  (categories = values(Categories), metaData = values(TAG_ITEMS_ATTRIBUTES)) =>
    tagCategories()
      .where('key', 'in', categories)
      .joins(MODEL_TAG_ITEMS)
      .joins(MODEL_SCHEMAS)
      .select(
        ...map(SCHEMA_ATTRIBUTES, value => `${MODEL_SCHEMAS}.${value}`),
        ...map(metaData, value => `${MODEL_TAG_ITEMS}.${value}`)
    );

export const tagCategoriesWithMetaDataItems = (metaData = values(META_DATA_ITEMS_ATTRIBUTES)) =>
  tagCategories()
    .joins(META_DATA_ITEMS)
    .select(...map(metaData, value => `${META_DATA_ITEMS}.${value}`)
  );

export const tagCategoryWithTagItems = (categories, attrs = values(TAG_ITEMS_ATTRIBUTES)) =>
  tagCategories()
    .where('key', 'in', categories)
    .joins(MODEL_TAG_ITEMS)
    .select(
      ...map(attrs, value => `${MODEL_TAG_ITEMS}.${value}`)
  );
