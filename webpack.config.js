const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval",
  entry: "./src/index.js",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ test: /\.js(\?.*)?$/i })],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/[name].[hash:5].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash:5].css",
      linkType: "text/css",
    }),
    new ESLintPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "public/assets", to: "static/media" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|tsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
          plugins: ["@babel/plugin-proposal-object-rest-spread"],
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      // {
      //   test: /\.css$/i,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "style-loader",
      //       options: {
      //         injectType: "linkTag",
      //       },
      //     },
      //     {
      //       loader: "css-loader",
      //       options: {
      //         sourceMap: true,
      //         url: true,
      //         modules: {
      //           localIdentName: "[path][name]__[local]--[hash:base64:5]",
      //           localIdentContext: path.resolve(__dirname, "src"),
      //         },
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.tsx?$/,
      //   use: [
      //     "babel-loader",
      //     {
      //       loader: "ts-loader",
      //       options: {
      //         compilerOptions: {
      //           noEmit: false,
      //         },
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "static/media/",
              limit: "8000",
              name: "[name].[hash:5].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "url-loader",
        options: {
          outputPath: "static/media/",
          limit: "8000",
          name: "[name].[hash:5].[ext]",
        },
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          outputPath: "static/media/",
          name: "[name].[hash:5].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    port: 9000,
    open: true,
    historyApiFallback: true,
  },
};
