import { reduce } from 'lodash';

export const metaDataSchemaToMap = metaDataSchemas =>
  reduce(metaDataSchemas, (result, metaDataSchema) => ({
    ...result,
    [metaDataSchema.id]: {
      ...metaDataSchema,
      kind: `value_${metaDataSchema.kind}`,
    },
  }), {});
