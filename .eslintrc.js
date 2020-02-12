module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jest": true
  },
  "globals": {
      "__DEV__": false,
      "__TEST__": false,
      "__PROD__": false,
      "__COVERAGE__": false,
      "__dirname": false,
      "Buffer": true,
      "process": true
  },    
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true
      },
      "ecmaVersion": 8,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
      "semi": [ "warn", "always" ],
      "no-console":  "off",
      "no-unused-vars": "off",
      "no-extra-boolean-cast": "off",
      "no-unreachable": "warn",
      "no-case-declarations": "warn",
      "key-spacing": "off",
      "jsx-quotes": [ 2, "prefer-single" ],
      // "max-len": [ 2, 120, 2 ],
      "object-curly-spacing": [ 2, "always" ],
      "comma-dangle": "off",
      "no-mixed-spaces-and-tabs": "off"
  }
};
