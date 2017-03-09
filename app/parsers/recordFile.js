import { reduce } from 'lodash';
import { metaDataItemsToProperties } from './metadataItems';
import { metaDataSchemaToMap } from './metadataSchema';

export const recordFileToMap = recordFiles =>
  reduce(recordFiles, (result, recordFile) => ({
    ...result,
    [recordFile.id]: {
      ...recordFile,
      metadata_items:
        metaDataItemsToProperties(
          recordFile.metadata_items,
          metaDataSchemaToMap(recordFile.metadata_schemas)
        ),
    },
  }));
