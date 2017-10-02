const expect = require('chai').expect
const sanitizeShellInput = require('../src/sanitizeShellInput')

describe('Sanitize shell input', function () {
  it('should remove any leading $', function () {
    expect(sanitizeShellInput('$ test')).to.be.eq('test')
  })

  it('should remove any leading spaces', function () {
    expect(sanitizeShellInput(' test')).to.be.eq('test')
  })

  it('should remove leading $ on each line of multiline inputs', function () {
    expect(sanitizeShellInput('$test\n$test2')).to.be.eq('test && test2')
  })

  it('should not remove $ in the middle of the input', function () {
    expect(sanitizeShellInput('t$est\n test"$"2')).to.be.eq('t$est && test"$"2')
  })

  it('should remove leading spaces on each line of multiline inputs', function () {
    expect(sanitizeShellInput(' test\n   test')).to.be.eq('test && test')
  })

  it('should delete trailing new lines', function () {
    expect(sanitizeShellInput(' test\n')).to.be.eq('test')
    expect(sanitizeShellInput(' test\r\n')).to.be.eq('test')
  })

  it('should join multiline inputs', function () {
    expect(sanitizeShellInput(' test\ntest2')).to.be.eq('test && test2')
    expect(sanitizeShellInput(' test\r\ntest2')).to.be.eq('test && test2')
  })

  it('should join multiline inputs with custom separator', function () {
    expect(sanitizeShellInput(' test\ntest2', ' & ')).to.be.eq('test & test2')
  })
})
