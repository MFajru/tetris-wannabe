const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // automate script injection
const webpack = require("webpack");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  entry: "./src/index.ts", // Entry point of your TypeScript application
  output: {
    filename: "bundle.js", // Name of the bundled output file
    path: path.resolve(__dirname, "dist"), // Output directory
    clean: true, // Clean the output directory before each build
  },
  plugins: [
    new FaviconsWebpackPlugin("./public/favicon.ico"),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Path to your source index.html
      filename: "index.html", // The output file name
      chunks: ["main"], // Specifies which JS bundle to include
    }),
    // for new page
    // new HtmlWebpackPlugin({
    //   template: "./src/test.html", // Path to your source index.html
    //   filename: "test.html", // The output file name
    //   chunks: ["main"], // Specifies which JS bundle to include
    // }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"], // Resolve these file extensions when importing
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Apply this rule to .ts and .tsx files
        use: "ts-loader", // Use ts-loader to transpile TypeScript
        exclude: /node_modules/, // Exclude dependencies
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Match common image file types
        type: "asset/resource", // Tells Webpack to emit the file and return the URL
      },
    ],
  },
  mode: "production", // Set Webpack mode (development or production)
  devServer: {
    static: path.resolve(__dirname, "dist"), // Serve static files from the 'dist' directory
    port: 3000, // Serve the app on http://localhost:3000
    open: true, // Automatically open the browser when the server starts
    historyApiFallback: {
      rewrites: [
        // This one rule handles /test, /about, /contact, etc. automatically
        { from: /^\/test$/, to: "/test.html" },
      ],
    },
  },
};
