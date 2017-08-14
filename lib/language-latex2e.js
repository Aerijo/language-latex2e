/** @babel */

import {CompositeDisposable} from 'atom'

function updateMaxLines (grammar) {
  if (grammar.scopeName === "text.tex.latex") {
    return grammar.maxTokensPerLine = atom.config.get('language-latex2e.maxTokensPerLine')
  }
}

function secondFunc (maxTokens) {
  // This could be done with getGrammarByScope
  const x = atom.grammars.getGrammars()
  for (var grammar in x) {
    if (x[grammar].scopeName === "text.tex.latex") {
      x[grammar].maxTokensPerLine = maxTokens
    }
  }
}

module.exports = {
  config: {
    maxTokensPerLine: {
      type: 'integer',
      minimum: 1,
      default: 300,
      description: 'Use with caution; higher numbers can reduce performance measurably. See README for more info.'
    }
  },

  activate (serialized) {
    this.disposables = new CompositeDisposable()
    this.disposables.add(atom.grammars.onDidAddGrammar(updateMaxLines))
    return this.disposables.add(atom.config.observe('language-latex2e.maxTokensPerLine', secondFunc))
  },
  //TODO: Add dispose method --- is already compatible with postcasio's package
}
