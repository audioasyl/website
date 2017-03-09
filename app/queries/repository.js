import RadioKitApi, { REPOSITORY_ID, SOURCE_NAME } from '../config/radioKit';

export const selectRepository = query => query.where('record_repository_id', 'eq', REPOSITORY_ID);

export const vaultData = model => RadioKitApi.query(SOURCE_NAME, model);

export const setStage = (query, stage = 'current') => query.where('stage', 'eq', stage);
