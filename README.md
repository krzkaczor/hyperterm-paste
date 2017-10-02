# hyperterm-paste
Makes pasting into hyperterm safe and easy


[![npm](https://img.shields.io/npm/dm/hyperterm-paste.svg)](https://www.npmjs.com/package/hyperterm-paste)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)


![Pasting into hyperterm](https://raw.githubusercontent.com/krzkaczor/hyperterm-paste/master/demo.gif)

```
hpm install hyperterm-paste
```

### Description
Now pasting from browser into terminal will never run shell command by itself!

Transformations applied to input:
 - remove leading `$`
 - remove leading whitespaces
 - multiline input will be concatenated to one line by adding `&&`
 - trailing newline will be removed which prevents from execution

#### Custom separators
By default plugin will use `&&` for new lines which is fine for `bash` and `zsh` shells. If you use something more exotic you can specify custom separator as env in your config `.hyper.js` file:

```
env: {
  "HYPER_PASTE_SEPARATOR": " & "
},
```
 
### Escape hatch
You can still make "raw" paste by using `ctrl` + `shift` + `v`
