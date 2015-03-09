#!/bin/bash
cmd=${1:-watch};
args="-t babelify -t node-lessify --commondir=$PWD --extension=.jsx --extension=.js -o build.js -e src/index.jsx"
# :${cmd=watch};
case "$cmd" in
    watch)
        watchify -d --fast $args;
        ;;
    build)
        browserify $args;
        uglifyjs build.js -m -c > build.min.js
        ;;
    *)
        echo "usage: `basename $0` {watch|build}";
        exit;
esac
