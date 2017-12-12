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
    let tokens = grammar.tokenizeLine("text$$math$$text").tokens;
    expect(tokens[0]).toEqual({value: "text", scopes: [root]});
    expect(tokens[1]).toEqual({value: "$$", scopes: [root, "string.other.math.display.begin.latex", "invalid.deprecated.latex"]});
    expect(tokens[2]).toEqual({value: "math", scopes: [root, "string.other.math.display.latex"]});
    expect(tokens[3]).toEqual({value: "$$", scopes: [root, "string.other.math.display.end.latex", "invalid.deprecated.latex"]});
    expect(tokens[4]).toEqual({value: "text", scopes: [root]});

    tokens = grammar.tokenizeLine("text\\[math\\]text").tokens;
    expect(tokens[0]).toEqual({value: "text", scopes: [root]});
    expect(tokens[1]).toEqual({value: "\\[", scopes: [root, "string.other.math.display.begin.latex"]});
    expect(tokens[2]).toEqual({value: "math", scopes: [root, "string.other.math.display.latex"]});
    expect(tokens[3]).toEqual({value: "\\]", scopes: [root, "string.other.math.display.end.latex"]});
    expect(tokens[4]).toEqual({value: "text", scopes: [root]});
  });

  it("tokenizes generic environment", () => {
    let tokenLines = grammar.tokenizeLines("\\begin{environment}\ntext\n\\end{environment}");
    expect(tokenLines[0][0]).toEqual({value: "\\begin", scopes: [root, "support.function.environment.begin.latex"]});
    expect(tokenLines[0][1]).toEqual({value: "{", scopes: [root, "support.function.environment.begin.latex", "punctuation.definition.argument.begin.latex"]});
    expect(tokenLines[0][2]).toEqual({value: "environment", scopes: [root, "support.function.environment.begin.latex", "variable.parameter.argument.latex"]});
    expect(tokenLines[0][3]).toEqual({value: "}", scopes: [root, "support.function.environment.begin.latex", "punctuation.definition.argument.end.latex"]});

    expect(tokenLines[1][0]).toEqual({value: "text", scopes: [root, "meta.environment.latex"]});

    expect(tokenLines[2][0]).toEqual({value: "\\end", scopes: [root, "support.function.environment.end.latex"]});
    expect(tokenLines[2][1]).toEqual({value: "{", scopes: [root, "support.function.environment.end.latex", "punctuation.definition.argument.begin.latex"]});
    expect(tokenLines[2][2]).toEqual({value: "environment", scopes: [root, "support.function.environment.end.latex", "variable.parameter.argument.latex"]});
    expect(tokenLines[2][3]).toEqual({value: "}", scopes: [root, "support.function.environment.end.latex", "punctuation.definition.argument.end.latex"]});
  });

  it("tokenizes generic command words", () => {
    let tokens = grammar.tokenizeLines("\\generic\n\\generic@text\n\\generic1text\n\\generic text");
    expect(tokens[0][0]).toEqual({value: "\\generic", scopes: [root, "support.function.general.latex"]});

    expect(tokens[1][0]).toEqual({value: "\\generic", scopes: [root, "support.function.general.latex"]});
    expect(tokens[1][1]).toEqual({value: "@text", scopes: [root]});

    expect(tokens[2][0]).toEqual({value: "\\generic", scopes: [root, "support.function.general.latex"]});
    expect(tokens[2][1]).toEqual({value: "1text", scopes: [root]});

    expect(tokens[3][0]).toEqual({value: "\\generic", scopes: [root, "support.function.general.latex"]});
    expect(tokens[3][1]).toEqual({value: " text", scopes: [root]});
  });

  it("tokenizes generic command symbols", () => {
    let tokens = grammar.tokenizeLines("\\8\n\\89\n\\8text");
    expect(tokens[0][0]).toEqual({value: "\\8", scopes: [root,"keyword.control.symbol.latex"]});

    expect(tokens[1][0]).toEqual({value: "\\8", scopes: [root,"keyword.control.symbol.latex"]});
    expect(tokens[1][1]).toEqual({value: "9", scopes: [root]});
    
    expect(tokens[2][0]).toEqual({value: "\\8", scopes: [root,"keyword.control.symbol.latex"]});
    expect(tokens[2][1]).toEqual({value: "text", scopes: [root]});
  });

});
