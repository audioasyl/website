import { values, map } from 'lodash';
import { selectRepository, vaultData } from './repository';
import {
  MODEL_ATTRIBUTES as SCHEMA_ATTRIBUTES,
  MODEL_NAME as MODEL_SCHEMAS,
} from './metaSchema';
import {
  MODEL_ATTRIBUTES as META_DATA_ITEMS_ATTRIBUTES,
  MODEL_NAME as META_DATA_ITEMS,
} from './metaDataItem';

export const MODEL_NAME = 'record_files';
export const MODEL = 'Data.Record.File';
export const MODEL_ATTRIBUTES = {
  references: 'references',
  fileSize: 'file_size',
  extra: 'extra',
  stage: 'stage',
  name: 'name',
  id: 'id',
};

export const recordFiles = (attrs = values(MODEL_ATTRIBUTES)) =>
  selectRepository(
    vaultData(MODEL)
      .select(...attrs)
  );

export const recordFilesForTagItems = (tagIds, stage = 'current') =>
  recordFiles()
    .joins('tag_items')
    .where('tag_items.id', 'in', tagIds)
    .where('stage', 'eq', stage)
    .joins(MODEL_SCHEMAS)
    .joins(META_DATA_ITEMS)
    .select(
      ...map(SCHEMA_ATTRIBUTES, value => `metadata_schemas.${value}`),
      ...map(META_DATA_ITEMS_ATTRIBUTES, value => `metadata_items.${value}`)
    );
