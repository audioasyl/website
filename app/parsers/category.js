import { reduce } from 'lodash';
import { tagItemsToMap } from './tagItem';
import { metaDataSchemaToMap } from './metadataSchema';

export const tagCategoriesToMap = categories =>
  reduce(categories, (result, category) => ({
    ...result,
    [category.key]: {
      ...category,
      tag_items: tagItemsToMap(category.tag_items),
      metadata_schemas:
        category.metadata_schemas.length && metaDataSchemaToMap(category.metadata_schemas),
    },
  }), {});
