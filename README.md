# Description

## General info
Project have been built with express.js and typescript. No GUI in an app, just json view.

**All further operations should be done in a source folder** 

## Run app

Install dependencies `npm i`

Run app on host machine `npm start` 

App will be available at `localhost:9090`

## Endpoints

* `/` - generic greeting
* `/decision/` - call to make decision about loan. Passing user code and lan info is done by GET request parameters
    - `regCode` - code to identify user. Codes from requirements used
    - `amount` - sum user want to have loan
    - `period` - period user want to have loan

Example of request: `http://localhost:9090/decision?regCode=49002010976&amount=3000&period=12`
