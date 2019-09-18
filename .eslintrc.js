module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest": true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 0,
    'semi':0,
    'arrow-parens': 0,
    'import/newline-after-import':0,
    'arrow-body-style': 0,
    'no-underscore-dangle':0,
    'no-param-reassign': 0,
    'consistent-return':0,
  },
};
