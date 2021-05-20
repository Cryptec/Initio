# Initio


<!-- MarkdownTOC autolink="true" -->

- [Getting Started](#Getting-Started)
  - [Commands](#Basic-Commands-with-concurrently)
- [Techstack](#Create-React-App-&-Electron-Application)
  - [Basic Recipe](#Basic-Recipe)


<!-- /MarkdownTOC -->
## Getting Started

### Basic Commands with concurrently
1. `yarn install` install the dependencys.
2. `yarn run dev` starts Frontend and Express Server.
3. `yarn run electron` starts the electron app.

###  Or run all components seperatly 
1. `yarn start` starts the react app on port 3000.
2. `cd ./src/Backend` followed by `node Server.js` starts the Backend Express Server on port 5000.
3. `yarn run electron` starts the electron app.


## Create React App & Electron Application

# Basic Recipe
1. run `create-react-app` to generate a basic React application
2. run `npm install --save-dev electron`
3. add `main.js` from [electron-quick-start](https://github.com/electron/electron-quick-start) (we’ll rename it to `electron-starter.js`, for clarity)
4. modify call to `mainWindow.loadURL` (in `electron-starter.js`) to use `localhost:3000` (webpack-dev-server)
5. add a main entry to `package.json` for `electron-starter.js`
6. add a run target to start Electron to `package.json`
7. `npm start` followed by `npm run electron`

more infos at:

https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/
