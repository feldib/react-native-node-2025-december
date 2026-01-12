import * as Keychain from 'react-native-keychain';

export const storeAccessToken = async (accessToken: string) => {
  await Keychain.setGenericPassword('accessToken', accessToken, {
    service: 'access',
  });
};

export const storeRefreshToken = async (refreshToken: string) => {
  await Keychain.setGenericPassword('refreshToken', refreshToken, {
    service: 'refresh',
  });
};

export const getAccessToken = async () => {
  const credentials = await Keychain.getGenericPassword({ service: 'access' });
  return credentials ? credentials.password : null;
};

export const getRefreshToken = async () => {
  const credentials = await Keychain.getGenericPassword({ service: 'refresh' });
  return credentials ? credentials.password : null;
};

export const clearTokens = async () => {
  await Keychain.resetGenericPassword({ service: 'access' });
  await Keychain.resetGenericPassword({ service: 'refresh' });
};
