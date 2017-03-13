import { reduce, map, flattenDeep, uniq } from 'lodash';
import { metaDataItemsToProperties } from './metadataItems';
import { metaDataSchemaToMap } from './metadataSchema';

export const recordFileToMap = recordFiles =>
  reduce(recordFiles, (result, recordFile) => ({
    ...result,
    [recordFile.id]: {
      ...recordFile,
      metadata_items:
        recordFile.metadata_items.length && metaDataItemsToProperties(
          recordFile.metadata_items,
          metaDataSchemaToMap(recordFile.metadata_schemas)
        ),
    },
  }), {});

export const freshRecordsToMap = recordFiles => {
  const tagIds = map(recordFiles, recordFile =>
    map(recordFile.tag_items, tagItem => tagItem.id)
  );

  return uniq(flattenDeep(tagIds));
};
