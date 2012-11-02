$ java -classpath lib/js.jar \
org.mozilla.javascript.tools.debugger.Main -debug \
-modules nodejs_modules -modules rhino_modules -modules . \
jsdoc.js \
your/script.js
