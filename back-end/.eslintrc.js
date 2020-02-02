module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "quotes": [
        "error",
        "single",
        {
          "avoidEscape": true,
        },
      ],
      "semi": [
        "error",
        "always"
      ],
      "object-curly-spacing": [
        "error",
        "always"
      ],
    }
};