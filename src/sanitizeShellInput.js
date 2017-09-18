const endOfLine = require('os').EOL;

function sanitizeInput (input) {

  let output = input
    .replace(/^\s*\$?\s*/gm, '')          // remove any leading $ and leading whitespaces
    .split(endOfLine)
    .filter(line => !/^\s*$/.test(line))  // removes any empty lines
    .join(' && ');                        // change newlines into "&&"
    
  // Fish shell && and || replacement
  try{
    
    const config = require('~/.hyper.js');
    if( ~config.shell.search('fish') )
      output = output
        .replace(/\s?&&\s?/g, ' ;and ')  // Replace "&&" with ";and"
        .replace(/\s?||\s?/g, ' ;or ');  // Replace "||" with ";or"
    
  } catch (err) {}
  
  return output;
  
}

module.exports = sanitizeInput;
