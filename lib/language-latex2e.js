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
  config: {
    maxTokensPerLine: {
      type: "integer",
      minimum: 1,
      default: 300,
      description: "Use with caution; higher numbers can reduce performance measurably. See README for more info."
    }
  },

  activate(serialized) {
    this.disposables = new CompositeDisposable();
    this.disposables.add(
      atom.grammars.onDidAddGrammar(setMaxLines),
      atom.config.observe("language-latex2e.maxTokensPerLine", updateMaxLines)
    );
  },

  deactivate() {
    if (this.disposables) {
      this.disposables.dispose();
    }
  }
};
