const fs = require('fs')
const { UKRAINIAN, ENGLISH } = require('./src/constants')

module.exports = {
  input: ['src/**/*.{js,jsx}', '!src/**/*.spec.{js,jsx}', '!**/node_modules/**'],
  output: './public',
  options: {
    debug: true,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: ['t'],
      extensions: ['.js', '.jsx'],
    },
    lngs: [ENGLISH, UKRAINIAN],
    ns: ['common'],
    defaultLng: ENGLISH,
    defaultNs: 'common',
    defaultValue: function (lng, ns, key) {
      return lng === ENGLISH ? key : ''
    },
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false,
    keySeparator: false,
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function customTransform(file, enc, done) {
    const parser = this.parser
    const content = fs.readFileSync(file.path, enc)

    // Parse content for t() function calls
    parser.parseFuncFromString(content, { list: ['t'] }, (key, options) => {
      parser.set(key, Object.assign({}, options))
    })

    done()
  },
}
