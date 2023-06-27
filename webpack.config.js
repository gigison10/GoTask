const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  // other webpack configuration options...
  target: "web",
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
      util: require.resolve("util/"),
      net: require.resolve("net"),
      tls: require.resolve("tls"),
      url: require.resolve("path-browserify-es6"),
      buffer: require.resolve("buffer/"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      querystring: require.resolve("querystring-es3"),
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert/"),
      os: require.resolve("os-browserify/browser"),
      child_process: require.resolve("child_process-browserify"),
      extensions: [".js", ".jsx"],
    },
  },
  plugins: [
    // Other plugins...
    WebExtensionTarget(nodeConfig),
    new NodePolyfillPlugin(),
    new ProvidePlugin({
      fs: "graceful-fs",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser", // Provide the process variable for browser environment
    }),
  ],

  experiments: {
    topLevelAwait: true,
  },

  externals: [nodeExternals()],
  // module: {
  //   rules: [
  //     {
  //       test: /\.scss$/,
  //       use: ["style-loader", "css-loader", "sass-loader"],
  //     },
  //     {
  //       test: /\.jsx?$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           presets: ["@babel/preset-env", "@babel/preset-react"],
  //         },
  //       },
  //     },
  //     // ... other loaders if any
  //   ],
  // },
  // Rest of your webpack configuration

  //////////////////////
  ////////////////////////
  // resolve: {
  //   fallback: {
  //     stream: require.resolve("stream-browserify"),
  //   },
  // },
  // resolve: {
  //   fallback: {
  //     stream: false,
  //   },
  // },
};
