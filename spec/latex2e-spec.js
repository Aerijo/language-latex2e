describe("LaTeX grammar", function() {
  var grammar = null;
  var root = "text.tex.latex"

  beforeEach(() => {
    waitsForPromise(() => {
      return atom.packages.activatePackage("language-latex2e");
    });

    runs(() => {
      grammar = atom.grammars.grammarForScopeName("text.tex.latex");
    });
  });

  it("parses the grammar", () => {
    expect(grammar).toBeDefined();
    expect(grammar.scopeName).toBe(root);
  });

  it("is configured correctly", () => {
    expect(grammar.maxLineLength).toBe(Infinity);
    expect(grammar.maxTokensPerLine).toBe(atom.config.get("language-latex2e.maxTokensPerLine"));
  })

  it("tokenizes spaces", () => {
    let tokens = grammar.tokenizeLine(" ").tokens;
    expect(tokens[0]).toEqual({value: " ", scopes:[root]});
  });

  it("tokenizes simple comments", () => {
    let tokens = grammar.tokenizeLine("%comment").tokens;
    expect(tokens[0]).toEqual({value: "%", scopes: [root, "comment.line.percentage.latex"]});
    expect(tokens[1]).toEqual({value: "comment", scopes: [root, "comment.line.percentage.latex"]});
  });

  it("tokenizes magic comments", () => {
    let tokens = grammar.tokenizeLine("% !TEX root = main.tex").tokens;
    expect(tokens[0]).toEqual({value: "% !TEX root = main.tex", scopes: [root, "keyword.control.magic.latex"]});
  });

  it("tokenizes simple inline math", () => {
    let tokens = grammar.tokenizeLine("text$math$text").tokens;
    expect(tokens[0]).toEqual({value: "text", scopes: [root]});
    expect(tokens[1]).toEqual({value: "$", scopes: [root, "string.other.math.inline.begin.latex"]});
    expect(tokens[2]).toEqual({value: "math", scopes: [root, "string.other.math.inline.latex"]});
    expect(tokens[3]).toEqual({value: "$", scopes: [root, "string.other.math.inline.end.latex"]});
    expect(tokens[4]).toEqual({value: "text", scopes: [root]});

    tokens = grammar.tokenizeLine("text\\(math\\)text").tokens;
    expect(tokens[0]).toEqual({value: "text", scopes: [root]});
    expect(tokens[1]).toEqual({value: "\\(", scopes: [root, "string.other.math.inline.begin.latex"]});
    expect(tokens[2]).toEqual({value: "math", scopes: [root, "string.other.math.inline.latex"]});
    expect(tokens[3]).toEqual({value: "\\)", scopes: [root, "string.other.math.inline.end.latex"]});
    expect(tokens[4]).toEqual({value: "text", scopes: [root]});
  });

  it("tokenizes simple display math", () => {
    let tokens = grammar.tokenizeLine("text\\[math\\]text").tokens;
    expect(tokens[0]).toEqual({value: "text", scopes: [root]});
    expect(tokens[1]).toEqual({value: "\\[", scopes: [root, "string.other.math.display.begin.latex"]});
    expect(tokens[2]).toEqual({value: "math", scopes: [root, "string.other.math.display.latex"]});
    expect(tokens[3]).toEqual({value: "\\]", scopes: [root, "string.other.math.display.end.latex"]});
    expect(tokens[4]).toEqual({value: "text", scopes: [root]});
  });
});
