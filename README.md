
# Weather App Group 60

A weather app for elderly people with simplicity and clear GUI for them to understand their local weather temperature.


## 🧑‍💻 Creators

- [@Sharusan17](https://github.com/Sharusan17)
- [@Khirani1](https://github.com/Khirani1)
- [@Ibrahim Haji Abdi](https://github.com)
- [@lewis-ljh](https://github.com/lewis-ljh)
- [@Mohammad](https://github.com)


## Set-Up Guide
- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Quick Overview](#quick-boilerplate-overview)
- [Extra Info](#extra-info)

**0. Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed :**

https://nodejs.org/en/download/package-manager - (Link For nodejs Download)

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm - (Link for npm Download)
```sh
node -v
npm -v
```

**0.1. If doesn't work, you may have to update nodejs :**

https://blog.hubspot.com/website/update-node-js - (Visit to update node versions)
## Installation

**1. Clone this repository :**

```sh
git clone --depth 1 https://github.com/Sharusan17/weatherApp60.git
cd weatherApp60
```

**2. Make it your own :**

```sh
rm -rf .git && git init && npm init
```

> :information_source: Command above re-initializes the repo and sets up your NPM project.

**2a. Make it your own (Windows):**

If you are using Windowsyou can run the three necessary comand using Powershell. You mught need elevated privileges.

```sh
rm -r -fo .git
git init 
npm init
```

**3. Install the dependencies :**

```sh
npm install
```

## Development Workflow


**4. Start a live-reload development server :**

```sh
npm run dev
```

> This is a full web server for your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


**5. Generate a production build in `./build` :**

```sh
npm run build
```

**6. Start local production server with [serve](https://github.com/zeit/serve):**

```sh
npm start
```

> This simply serves up the contents of `./build`. Bear in mind, if you use this, the localhost port your server is running on will refresh, and you'll also need to restart it to see any changes you've made to the code in `src`.


## Not Working?🤔
https://blog.hubspot.com/website/update-node-js - (Visit this to update node)

## Quick Overview

- The initial run will display the iPhone version (iPhone 6/7 Plus screen size); however, if you modify the path on the url bar by adding "/ipad", you can view the tablet version (iPad Air screen size).

- The CSS pre-processor in use is Less. You don't have to worry about the syntax and just write in normal CSS as there are helper modules to assist you (located in `style/helpers`).

- There are many weather APIs out there; this boilerplate uses OpenWeatherMap. Sign up, is free and you can find out more about it here : https://openweathermap.org/api 

- Most importantly, have fun with it ! 👌


## Extra Info

1. Handling URLS

:information_source: You can use URL Routing as defined [here](http://git.io/preact-router).

Pages are just regular components that get mounted when you navigate to a certain URL. Any URL parameters get passed to the component as `props`.

Defining what component(s) to load for a given URL is easy and declarative. You can even mix-and-match URL parameters and normal props.

```js
<Router>
  <A path="/" />
  <B path="/b" id="42" />
  <C path="/c/:id" />
</Router>
```
    
