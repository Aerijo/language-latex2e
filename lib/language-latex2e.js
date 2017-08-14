/** @babel */

import {CompositeDisposable} from 'atom'

function updateMaxLines (grammar) {
  return grammar.maxTokensPerLine = atom.config.get('language-latex2e.maxTokensPerLine')
}

function secondFunc (maxTokens) {
  const x = atom.grammars.getGrammars()
  console.log('Printing Grammars: ', x);
  for (var grammar in x) {
    x[grammar].maxTokensPerLine = maxTokens
    console.log(x[grammar].maxTokensPerLine)
  }
}

module.exports = {
  config: {
    maxTokensPerLine: {
      type: 'integer',
      minimum: 1,
      default: 300,
      description: 'described!'
    }
  },

  activate (serialized) {
    this.disposables = new CompositeDisposable()
    this.disposables.add(atom.grammars.onDidAddGrammar(updateMaxLines))
    // this.disposables.add(atom.config.observe('language-latex2e.maxTokensPerLine', (maxTokensPerLine) => {
    //   for (grammar in atom.grammars.getGrammars()) {
    //       grammar.maxTokensPerLine = maxTokensPerLine
    //     }}))

    return this.disposables.add(atom.config.observe('language-latex2e.maxTokensPerLine', secondFunc))
  },
}

//
// (grammar) => {
//  return grammar.maxTokensPerLine = atom.config.get('language-latex2e.maxTokensPerLine')
//    }
