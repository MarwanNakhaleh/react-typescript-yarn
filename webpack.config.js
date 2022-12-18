module.exports = () => {
  return {
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
