const languages = [
  'curl',
  'nodejs',
  'java',
  'python',
  'javascript',
  'ruby',
  'php',
  'shell',
  'powershell',
  'http',
  'csharp',
  'c',
  'dart',
  'go',
  'kotlin',
  'objective-c',
  'r',
  'rust',
  'swift',
  'ocaml',
];

const languageTabs = languages.map(lang => ({
  highlight: lang,
  language: lang,
  logoClass: lang,
}));

module.exports = languageTabs;
