import sass from '@csstools/postcss-sass';

export default function () {
  return {
    parser: 'postcss-scss',
    plugins: {
      'postcss-import': {
        plugins: [
          sass(),
        ],
      },
      'postcss-url': [
        {
          assetsPath: '../',
        },
      ],
      'autoprefixer': {},
      'postcss-csso': {},
    },
  };
}
