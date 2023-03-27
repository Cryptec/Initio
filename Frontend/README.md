# Initio

<!-- MarkdownTOC autolink="true" -->
- [About](#About)
- [Getting Started](#Getting-Started)
  - [Commands](#Basic-Commands-with-concurrently)
- [Techstack](#Create-React-App-&-Electron-Application)
  - [Basic Recipe](#Basic-Recipe)


<!-- /MarkdownTOC -->
## About

Initio is an open-source Tool for stocks for your Collection or Company. And the best?
it runs in the Browser AND as Desktop Application, and offer some useful features like
a login window to protect your data! 

<p align="center">
  <img src="/Frontend/src/Assets/Complete.png" alt="Initio"/>
</p>

want to contribute? simply open a PR in the ```development``` branch, or get in touch. 

NOTE:
The project is at a very early stage, so don´t expect it to work as it should already.

## Getting Started

First, you can edit the two dotenv files in the root of the project for enabling / disabling the auto open for Browsers, and in the Backend folder to set the credentials for the Nodemailer.

### Basic Commands with concurrently
1. `yarn install` install the dependencys.
2. `yarn run dev` starts Frontend and Express Server.
3. `yarn run electron` starts the electron app.

###  Or run all components seperatly 
1. `yarn start` starts the react app on port 3000.
2. `cd ./src/Backend` followed by `node Server.js` starts the Backend Express Server on port 5000.
3. `yarn run electron` starts the electron app.


## Create React App & Electron Application

### Basic Recipe
1. run `create-react-app` to generate a basic React application
2. run `npm install --save-dev electron`
3. add `main.js` from [electron-quick-start](https://github.com/electron/electron-quick-start) (we’ll rename it to `electron-starter.js`, for clarity)
4. modify call to `mainWindow.loadURL` (in `electron-starter.js`) to use `localhost:3000` (webpack-dev-server)
5. add a main entry to `package.json` for `electron-starter.js`
6. add a run target to start Electron to `package.json`
7. `npm start` followed by `npm run electron`

more infos at:

https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/

build and pack

https://wykrhm.medium.com/creating-standalone-desktop-applications-with-react-electron-and-sqlite3-269dbb310aee