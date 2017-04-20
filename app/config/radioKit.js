import RadioKitApi from 'radiokit-api';

export const REPOSITORY_ID = 'f857896b-10a4-4dd8-b1ae-6d8e3cb9c6a0';
export const SOURCE_NAME = 'vault';

const getEnv = () => {
  if (typeof window !== 'undefined' && typeof (window.ENV) === 'object') {
    return window.ENV;
  }

  return {
    auth: {
      clientId: 'placeholder', // config.auth.clientId,
      baseUrl: 'https://auth.radiokitapp.org',
      accessToken: 'placeholder', // config.auth.accessToken,
    },
    apps: {
      plumber: { baseUrl: 'https://plumber.radiokitapp.org' },
      auth: { baseUrl: 'https://auth.radiokitapp.org' },
      vault: { baseUrl: 'https://vault.radiokitapp-stag.org' },
      agenda: { baseUrl: 'https://agenda.radiokitapp.org' },
      diffusor: { baseUrl: 'https://diffusor.radiokitapp.org' },
    },
    verbose: false,
    useFetch: true,
  };
};

export default new RadioKitApi.Data.Interface(getEnv());
