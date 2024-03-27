import sass from '@csstools/postcss-sass';

export default function (context) {
  const { isDevelopment } = context;

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
      'postcss-lightningcss': {
        'lightningcssOptions': {
          'minify': !isDevelopment,
        },
      },
    },
  };
}
