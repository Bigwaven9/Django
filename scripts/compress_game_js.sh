#! /bin/bash

JS_PATH=~/acapp/game/static/js/
JS_PATH_DIST=~/acapp/game/static/js/dist
JS_PATH_SRC=~/acapp/game/static/js/src

find $JS_PATH_SRC -type f -name '*.js' | sort | xargs cat > ${JS_PATH_DIST}game.js
