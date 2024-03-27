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
          filter: '**/*',
          url: 'rebase',
        },
        {
          filter: '**/icons/**/*.svg',
          url: (asset) => asset.url.replace(
            /icons\/(.+?)\.svg$/,
            (match, p1) => `icons/stack.svg#${p1.replace(/\//g, '_')}`
          ),
          multi: true,
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
