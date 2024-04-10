// locales.js
import { createI18n } from 'vue-i18n';
import enMessages from './locales/en';
import ruMessages from './locales/ru';

const messages = {
  en: enMessages,
  ru: ruMessages
};

const i18n = createI18n({
  locale: 'ru', // Начальная локаль
  messages
});

export default i18n;
