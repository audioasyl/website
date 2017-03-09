import { reduce } from 'lodash';

export const metaDataItemToMap = metaDataItems =>
  reduce(metaDataItems, (result, metaDataItem) => ({
    ...result,
    [metaDataItem.id]: metaDataItem,
  }), {});

export const metaDataItemsToProperties = (metaDataItems, schemas) =>
  reduce(metaDataItems, (result, metaDataItem) => {
    const schema = schemas[metaDataItem.metadata_schema_id];
    return {
      ...result,
      [schema.key]: metaDataItem[schema.kind],
    };
  }, {});
