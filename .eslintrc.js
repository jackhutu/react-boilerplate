module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "plugins": [
    "react"
  ],
  "globals": {
    "__DEVTOOLS__": true,
    "__DEVLOGGER__": true
  },
  "extends": ["eslint:recommended","plugin:react/recommended"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "globalReturn": true,
      "impliedStrict": true,
      "experimentalObjectRestSpread":true,
      "jsx": true,
      "legacyDecorators": true
    }
  },
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "indent": [
      "error",
      2,
      {"SwitchCase": 1}
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-console": 0,
    // "no-unused-vars": ["error", { "vars": "all", "args": "none" }],
    "no-unused-vars": 0,
    "no-mixed-spaces-and-tabs": [0],
    "react/no-danger": 0,
    "react/display-name": 0,
    "linebreak-styl":0,
    "no-useless-escape":0,
    "react/no-string-refs":0
  }
}