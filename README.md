# Fishmart

A project to display all sea commodities from all over Indonesia.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

- `Domain` : where most of our feature lies, separated by domain. Could be your team, your business unit, etc
  - api : contain request to API
  - hooks : custom hook
  - entity: define data type returned from the server
  - dto : define data type to send from our app
- `Page` : contain all pages of our app which user interacted with
- `Assets` : contain images, fonts, etc
- `Common`: all shared code used throughout the app which we can specialized little further
