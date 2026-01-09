import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import en from './locales/en.json';
import hu from './locales/hu.json';

const resources = {
  en,
  hu,
};

// Detect device language
const getDeviceLanguage = (): string => {
  try {
    const locales = getLocales();
    if (locales && locales.length > 0) {
      const deviceLang = locales[0].languageCode;
      return deviceLang;
    }
  } catch (error) {
    console.warn('Error detecting device language:', error);
  }
  return 'en'; // Fallback to English
};

// Initialize i18n with device language
const initializeI18n = async () => {
  try {
    i18n.use(initReactI18next).init({
      resources,
      lng: getDeviceLanguage(),
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  } catch (error) {
    console.warn('Error initializing i18n:', error);
  }
};

// Initialize i18n on app start
initializeI18n();

export default i18n;
