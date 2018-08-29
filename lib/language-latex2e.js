const { CompositeDisposable } = require("atom");

function setMaxLines(grammar) {
  if (grammar.scopeName === "text.tex.latex") {
    grammar.maxTokensPerLine = atom.config.get("language-latex2e.maxTokensPerLine");
  }
}

function updateMaxLines(maxTokens) {
  const grammar = atom.grammars.grammarForScopeName("text.tex.latex");
  if (grammar) {
    grammar.maxTokensPerLine = maxTokens;
  }
}

module.exports = {
  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.grammars.onDidAddGrammar(setMaxLines),
      atom.config.observe("language-latex2e.maxTokensPerLine", updateMaxLines)
    );
  },

  deactivate() {
    if (this.subscriptions) {
      this.subscriptions.dispose();
    }
  }
};
