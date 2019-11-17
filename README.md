# require-match
This utility was originally written as a tool to dynamically register routes under express.

## Install
```bash
npm i @byaga/require-match
```

## Example Usage
```javascript
const express = require('express');
const requireMatch = require("@byaga/require-match");

const app = express();
requireMatch("./**/*.route.js", __dirname).then(files => {
  files.forEach(({name, exports}) => {
    const resourceName = name.split(".")[0].toLowerCase();
    app.use('/' + resourceName, exports)
  });
  app.listen(3000);
}, err => console.error('err', err.message, err));
```

## Params
- match (string)
- baseDir (string)[default=process.cwd()] - the directory to begin searching for matching files