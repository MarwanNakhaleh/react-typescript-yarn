const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require("./package.json");

module.exports = () => {
  return {
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "index.html",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
      }),
      new ModuleFederationPlugin({
        name: "Microfrontend",
        filename: "moduleEntry.js",
        exposes: {
          "./App": "./src/App"
        },
        shared: {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
        },
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          use: ["ts-loader"],
          test: /\.ts$|tsx/,
          exclude: [/node_modules/],
        }
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
  };
};
