describe("LaTeX grammar", function() {
  var grammar = null;
  var rootScope = "text.tex.latex"

  beforeEach(() => {
    waitsForPromise(function() {
      return atom.packages.activatePackage("language-latex2e");
    });

    runs(() => {
      grammar = atom.grammars.grammarForScopeName("text.tex.latex");
    });
  });

  it("parses the grammar", () => {
    expect(grammar).toBeDefined();
    expect(grammar.scopeName).toBe(rootScope);
  });

  it("is configured correctly", () => {
    expect(grammar.maxLineLength).toBe(Infinity);
    expect(grammar.maxTokensPerLine).toBe(atom.config.get("language-latex2e.maxTokensPerLine"));
  })

  it("tokenizes spaces", () => {
    let tokens = grammar.tokenizeLine(" ").tokens;
    expect(tokens[0]).toEqual({value: " ", scopes:[rootScope]});
  });

  it("tokenizes simple comments", () => {
    let tokens = grammar.tokenizeLine("%comment").tokens;
    expect(tokens[0]).toEqual({value: "%", scopes: [rootScope, "comment.line.percentage.latex"]});
    expect(tokens[1]).toEqual({value: "comment", scopes: [rootScope, "comment.line.percentage.latex"]});
  });

  it("tokenizes magic comments", () => {
    let tokens = grammar.tokenizeLine("% !TEX root = main.tex").tokens;
    expect(tokens[0]).toEqual({value: "% !TEX root = main.tex", scopes: [rootScope, "keyword.control.magic.latex"]});
  });

  it("tokenizes simple inline math", () => {
    let tokens = grammar.tokenizeLine("text$math$text").tokens;
    expect(tokens[0]).toEqual({value: "text", scopes: [rootScope]});
    expect(tokens[1]).toEqual({value: "$", scopes: [rootScope, "string.other.math.inline.begin.latex"]});
    expect(tokens[2]).toEqual({value: "math", scopes: [rootScope, "string.other.math.inline.latex"]});
    expect(tokens[3]).toEqual({value: "$", scopes: [rootScope, "string.other.math.inline.end.latex"]});
    expect(tokens[4]).toEqual({value: "text", scopes: [rootScope]});

    tokens = grammar.tokenizeLine("text\\(math\\)text").tokens;
    expect(tokens[0]).toEqual({value: "text", scopes: [rootScope]});
    expect(tokens[1]).toEqual({value: "\\(", scopes: [rootScope, "string.other.math.inline.begin.latex"]});
    expect(tokens[2]).toEqual({value: "math", scopes: [rootScope, "string.other.math.inline.latex"]});
    expect(tokens[3]).toEqual({value: "\\)", scopes: [rootScope, "string.other.math.inline.end.latex"]});
    expect(tokens[4]).toEqual({value: "text", scopes: [rootScope]});
  });
});
