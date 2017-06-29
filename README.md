# syntax-experiments package

A LaTeX syntax highlighting package. Works best with a dedicated theme that will find the custom scopes (like the solarized one I modified).

NOTE: If the highlighting is not working on a long line (100> characters), insert a line break in an appropriate location. LaTeX should not do anything different (you could write each sentence on a new line if you wanted). This error is caused by how Atom handles grammar scoping and syntax highlighting; it will only find 100 "tokens" per line by default. This can be increased using a package, but that could in turn cause performance decreases. I do not know another way to prevent this issue.
