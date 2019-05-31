# Static Site Boilerplate with Sass syntax support

* Forked from : [static-site-boilerplate](https://github.com/ericalli/static-site-boilerplate)
* Added customSyntax to stylelint-webpack-plugin with [postcss-sass](https://github.com/AleshaOleg/postcss-sass) parser to support .sass files syntax

## Installation

* clone project
```bash
git clone https://github.com/ihatem/static-site-boilerplate-sass
 ```
* cd into it 
 ```bash
cd static-site-boilerplate-sass
 ```
* remove .git and node_modules and reinstall them
 ```bash
rm -rf .git && rm -rf node_modules && rm packages-lock.json && npm install --no-optional
 ```
* start dev server
 ```bash
npm run start
 ```

 * build dist for prod
 ```bash
npm run build:dist
 ```

 * deploy to gh-pages
 ```bash
npm run deploy
 ```