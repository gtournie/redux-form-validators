const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'examples/src/locales/extracted',
  translationsDirectory: 'examples/src/locales/',
  languages: ['en'],
});