# Overlord Boilerplate

Gulp boilerplate with everything you need to make some rad static websites

* * *

## Installation
As a prerequisite it's assumed you have installed [node.js](http://nodejs.org). To start using the boilerplate you need to run the following terminal commands.

Clone the repo

```sh
$ git clone https://"your-username"@bitbucket.org/ejcorcoran/overlord-boilerplate.git
```

Change directory to the boilerplate directory and install dependencies

```sh
$ bundle
$ npm install
```

**Hint**: If you get errors while installing `gulp-imagemin` it may help to execute this command before running `npm install`:

```sh
export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig
```

* * *

## Setup

Open `gulp/config.js` and change settings if needed.

* * *

## Running Gulp.js

One task is available:

```sh
$ gulp
```

- Running `gulp` will start a Browsersync server, build and optimize assets then start a watch task.

* * *
