# React Seed

> A [React.js](http://facebook.github.io/react/) seed project. Stack: ES6+, Babel6, React, React Router and [Webpack](http://webpack.github.io/).


### Features

&nbsp; &nbsp; ✓ Next generation JavaScript with [Babel6.x](https://github.com/babel/babel)<br>
&nbsp; &nbsp; ✓ [Sass](http://sass-lang.com/) syntax for CSS via [postCSS](https://github.com/postcss/postcss)<br>
&nbsp; &nbsp; ✓ Development web server with `webpack-dev-server`. Soon will use `Koa` instead.<br>
&nbsp; &nbsp; ✓ Bundling and optimization with [Webpack](http://webpack.github.io/)<br>
&nbsp; &nbsp; ✓ Hot replace. Currently support live reload, and will support hot replacement soon.<br>


### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /app/                       # React app, source files
│   ├── /components/            # Common react components
│   ├── /pages/                 # React-router's Route component, like traditional pages
│   ├── /styles/                # Common styles(mixins, variables, and global styles)
│   ├── /images/                # Common images
│   ├── /app.js                 # Entry script
│   ├── /index.html             # Index page (template)
│   └── /routes.js              # Router
├── /tools/                     # Build automation scripts and utilities
│── package.json                # Dev dependencies and NPM scripts
└── readme.md                   # Project overview
```

### Getting Started

Just clone the repo, install Node.js modules and run `npm start`:

```
$ git clone -o react-seed -b master --single-branch \
      https://github.com/creeperyang/react-seed.git MyApp
$ cd MyApp
$ npm install
$ npm start
```

Then will automatically open `0.0.0.0:3000` in your browser.


### How to Update

You can always fetch and merge the recent changes from this repo back into
your own project:

```shell
$ git checkout master
$ git fetch react-seed
$ git merge react-seed/master
$ npm install
```

### License

MIT

