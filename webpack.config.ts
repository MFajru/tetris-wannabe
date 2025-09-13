import { dirname, resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration } from "webpack";
import type { Argv } from "webpack-cli";
import { fileURLToPath } from "url";

// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = (_: Record<string, any>, argv: Argv): Configuration => {
  const isProduction = argv.mode === "production";
  return {
    entry: "./src/index.ts", // Entry point of your TypeScript application
    output: {
      filename: "bundle.js", // Name of the bundled output file
      path: resolve(__dirname, "dist"), // Output directory
      clean: true, // Clean the output directory before each build
    },
    plugins: [
      new FaviconsWebpackPlugin("./src/assets/favicon-32x32.png"),
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
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
        }),
    ].filter(Boolean),
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
          include: resolve(__dirname, "src"),
          // use "style-loader" in dev to able to hot reload the css
          // but hot reload css is not working when I'm using tailwind
          // so, I decide just to use MinicssExtractPlugin in dev and production
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i, // Match common image file types
          type: "asset/resource", // Tells Webpack to emit the file and return the URL
        },
      ],
    },
    mode: isProduction ? "production" : "development", // Set Webpack mode (development or production)
    devServer: {
      static: resolve(__dirname, "dist"), // Serve static files from the 'dist' directory
      port: 3000, // Serve the app on http://localhost:3000
      open: true, // Automatically open the browser when the server starts
      historyApiFallback: {
        rewrites: [
          // This one rule handles /test, /about, /contact, etc. automatically
          { from: /^\/test$/, to: "/test.html" },
        ],
      },
      client: {
        logging: "info", // or "none" to hide all client logs
        reconnect: 5, // number of times to retry before giving up
        overlay: true, // show compilation errors in browser overlay
      },
    },
  };
};

export default config;
