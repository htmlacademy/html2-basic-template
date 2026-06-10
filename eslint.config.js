import vanilla from 'eslint-config-htmlacademy/vanilla';

export default [
  {
    ignores: [
      'build/',
      'node_modules/',
      'source/vendor/',
      'vendor/',
    ],
  },
  ...vanilla,
  {
    languageOptions: {
      globals: {
        noUiSlider: 'readonly',
        Pristine: 'readonly',
      },
    },
  },
];
