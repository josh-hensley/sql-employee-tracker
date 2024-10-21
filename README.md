# SQL Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A CLI app that modifies an SQL database of employees and roles.

## Table of Contents


* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Questions](#Questions)
 

## <a name="Installation"></a>Installation

This app requires node.js and postgresql.  Run `npm i` to install dependencies and then `npm run build` to build the dist folder.  Rename the .env.EXAMPLE file to .env and fill in the variables.   You will need to cd into the db folder and run `psql -U postgres` and enter your password, then run `\i schema.sql` from postgres to create the database.

## <a name="Usage"></a>Usage

run `npm start` to begin.  Use arrow keys to select options and then input data or select from a menu to create, update and read data.

## <a name="license"></a>License

  [MIT](https://opensource.org/licenses/MIT)

## <a name="contributing"></a>Contributing

If you wish to contribute, please follow these [guidelines](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)..

## <a name="questions"></a>Questions

If you have questions you can reach me at me@joshhensley.com. Add me on [Github](github.com/josh-hensley).
