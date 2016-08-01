const { clipboard } = require('electron')
const sanitizeInput = require('./sanitizeShellInput')

exports.decorateTerm = (Term, { React }) => {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context)
      this._onTerminal = this._onTerminal.bind(this)
    }

    _onTerminal (term) {
      if (this.props && this.props.onTerminal) this.props.onTerminal(term)

      term.uninstallKeyboard()

      const pastingHandler = [ 'keydown', (e) => {
        const terminal = term.keyboard.terminal

        if (e.metaKey && e.keyCode === 86) {
          const rawClipboard = clipboard.readText()

          let sanitizedClipboard
          if (!e.shiftKey) {
            sanitizedClipboard = sanitizeInput(rawClipboard)
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
