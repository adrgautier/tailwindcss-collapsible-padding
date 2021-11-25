const plugin = require('tailwindcss/plugin')

const findValue = (rule) => {
  let value = undefined
  rule.walkDecls(/^padding/, (decl) => {
    if (['padding-top', 'padding-bottom', 'padding'].includes(decl.prop)) {
      value = decl.value
      return false
    }
  })
  return value
}

const collapsibleVariant = plugin(function ({ addVariant }) {
  addVariant('collapsible', ({ container }) => {
    container.walkRules((rule) => {
      const isTopPadding = /^\.p(?:y|t)-/gm.test(rule.selector)
      const isBottomPadding = /^\.p(?:y|b)-/gm.test(rule.selector)
      const isAllPadding = /^\.p-/gm.test(rule.selector)
      const isAnyPadding = /^\.p\S?-/gm.test(rule.selector)
      const selectorWithVariant = `.collapsible\\:${rule.selector.slice(1)}`
      const value = findValue(rule)
      if (isAllPadding || isTopPadding) {
        container.append(`${selectorWithVariant}::before {
            content: "";
            display: table;
            margin-bottom: ${value};
          }`)
      }
      if (isAllPadding || isBottomPadding) {
        container.append(`${selectorWithVariant}::after {
            content: "";
            display: table;
            margin-top: ${value};
          }`)
      }
      if (isAllPadding) {
        container.append(`${selectorWithVariant} {
            padding-left: ${value};
            padding-right: ${value};
          }`)
      }
      if (isAnyPadding) {
        rule.remove() // would be duplicated otherwise
      }
    })
  })
})

module.exports = collapsibleVariant
