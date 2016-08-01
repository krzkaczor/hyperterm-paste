# hyperterm-paste
Makes pasting into hyperterm safe and easy

![Pasting into hyperterm](https://raw.githubusercontent.com/krzkaczor/hyperterm-paste/master/demo.gif)

```
hpm install hyperterm-paste
```

###Description
Now pasting from browser into terminal will never run shell command by itself!

Transformations applied to input:
 - remove leading `$`
 - remove leading whitespaces
 - multiline input will be concatenated to one line by adding `&&`
 - trailing newline will be removed which prevents from execution
 
###Escape hatch
You can still make "raw" paste by using `ctrl` + `shift` + `v`
