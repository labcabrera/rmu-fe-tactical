const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const deps = require("./package.json").dependencies;

const printCompilationMessage = require("./compilation.config.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { error } = require("console");

module.exports = (_, argv) => ({
  output: {
    //publicPath: process.env.RMU_FE_TACTICAL_PUBLIC_PATH || "http://localhost:8083/"
    publicPath: "http://localhost:8083/"
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: 8083,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    onListening: function (devServer) {
      const port = devServer.server.address().port;

      printCompilationMessage("compiling", port);

      devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage("failure", port);
          } else {
            printCompilationMessage("success", port);
          }
        });
      });
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|jfif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: 'json-loader',
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new ModuleFederationPlugin({
      name: "tactical",
      filename: "tactical-app.js",
      remotes: {},
      exposes: {
        "./TacticalApp": "./src/App.jsx",
      },
      shared: {
        'react': {
          singleton: true,
          requiredVersion: deps["react"],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
        },
        '@mui/material': {
          singleton: true,
          requiredVersion: deps['@mui/material'],
        },
        '@mui/x-data-grid': {
          singleton: true,
          requiredVersion: deps['@mui/x-data-grid'],
        },
        '@mui/icons-material': {
          singleton: true,
          requiredVersion: deps['@mui/icons-material'],
        },
        '@mui/lab': {
          singleton: true,
          requiredVersion: deps['@mui/lab'],
        },
        '@emotion/react': {
          singleton: true,
          requiredVersion: deps['@emotion/react'],
        },
        '@emotion/styled': {
          singleton: true,
          requiredVersion: deps['@emotion/styled'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv({
      path: `./.env.${argv.mode || 'development'}`,
      safe: false,
      systemvars: true,
      silent: false,
      defaults: './.env'
    }),
  ]
});
