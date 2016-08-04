const endOfLine = require('os').EOL

function sanitizeInput (input) {
  return input
    .replace(/^\s*\$?\s*/gm, '')          // remove any leading $ and leading whitespaces
    .split(endOfLine)
    .filter(line => !/^\s*$/.test(line))  // removes any empty lines
    .join(' && ')                       // change newlines into &&
}

module.exports = sanitizeInput
