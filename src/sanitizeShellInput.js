function sanitizeInput (input, separator = ' && ') {
  return input
    .replace(/^\s*\$?\s*/gm, '')          // remove any leading $ and leading whitespaces
    .replace(/(?:\r\n|\r)+/g, '\n')       // replace all EOLs with LF
    .split('\n')                          // spliting by LF only
    .filter(line => !/^\s*$/.test(line))  // removes any empty lines
    .join(separator)                      // change newlines into separators (&& by default)
}

module.exports = sanitizeInput
