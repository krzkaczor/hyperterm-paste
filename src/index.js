const { clipboard } = require('electron')
const sanitizeInput = require('./sanitizeShellInput')

const isPasting = e => {
  const isDarwin = process.platform === 'darwin'
  const key = e.keyCode // keyCode detection
  if (isDarwin) {
    return e.metaKey && key === 86
  }
  return key === 86 && e.ctrlKey
}

const getSeparator = config => {
  if (!config) return // sometimes global config itself is not defined :(

  const configInstance = config.getConfig()
  if (!configInstance.env) return

  return configInstance.env.HYPER_PASTE_SEPARATOR
}

exports.decorateTerm = (Term, { React }) => {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context)
      this._onTerminal = this._onTerminal.bind(this)
    }

    _onTerminal (term) {
      if (this.props && this.props.onTerminal) this.props.onTerminal(term)

      term.uninstallKeyboard()

      const customSeparator = getSeparator(config)

      const pastingHandler = [ 'keydown', (e) => {
        const terminal = term.keyboard.terminal

        if (isPasting(e)) {
          const rawClipboard = clipboard.readText()

          let sanitizedClipboard
          if (!e.shiftKey) {
            sanitizedClipboard = sanitizeInput(rawClipboard, customSeparator)
          } else {
            sanitizedClipboard = rawClipboard
          }
          terminal.io.sendString(sanitizedClipboard)

          e.preventDefault()
        }
      } ]

      term.keyboard.handlers_ = [ pastingHandler ].concat(term.keyboard.handlers_)

      term.installKeyboard()
    }

    render () {
      return React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      }))
    }
  }
}
