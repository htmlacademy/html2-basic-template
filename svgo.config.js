export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // customize options for plugins included in preset
          convertPathData: {
            floatPrecision: 2,
            forceAbsolutePath: false,
            utilizeAbsolute: false,
          },
          // or disable plugins
          removeViewBox: false,
        },
      },
    },
    // enable builtin plugin not included in default preset
    'removeDimensions',
  ],
};
