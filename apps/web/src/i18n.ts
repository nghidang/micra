import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { usersLocale } from '@repo/mfe-users';

void i18n.use(initReactI18next).init({
  lng: 'vi',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { users: usersLocale.en },
    vi: { users: usersLocale.vi },
  },
});

export default i18n;
