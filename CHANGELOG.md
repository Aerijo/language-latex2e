# Changelog

<!-- ## Unreleased -->

## 0.17.0
#### Changed
- Updated and locked `tree-sitter-biber` to v0.5.0; this adds support for `@` in keys and identifiers (field keys, macro names)
- Set biber name to `Biber` from `Tree Biber`. This makes it work better with the Language Server Protocol.
- Added and changed most of the node to scope rules (to match the planned `language-latex` ones)

// TODO: Fill this out.

## 0.13.4
#### Added
- Templates for issues and PR's

#### Changed
- Underscore rules are only applied in math mode.

## 0.13.0
#### Changed
- Math mode is now scoped to `markup` (from `string`). Style support is builtin.
- Begin work on `tree-sitter` grammar.

## 0.12.2
#### Removed
Generic functions no longer get their name in the scope. Hopefully temporary, but necessary for `linter-spell` compatibility.

## 0.12.1
#### Changed
- File path sections inside `\input` and `\include` no longer get dedicated scopes; this is (hopefully temporary) to prevent an infinite loop bug.

#### Removed
- The `makeatletter` rules are no longer useful (now that `@` is always considered a valid control word character), so have been removed.

## 0.12.0
#### Added
- Magic syntax comments
- Supporting documentation in README.md and docs
- File used to make preview screenshot
- Package keywords

#### Changed
- Redone ./docs/structure.md

## 0.11.1
#### Added
- Scopes unit-value pairs (no space) to allow spell checker to ignore; eg. 12pt
- Preview of highlighting using a dark theme

#### Changed
- Code cleanup to remove redundant lines

#### Fixed
- `\verb` will optionally finish on end of line (doesn't wait for terminating character to appear before applying scope)

#### Removed
- In `genericSymbol`, the symbol itself from the generic scope name. It caused odd behaviour with <section>\\`</section> and the toggle comment line command


## 0.11.0
#### Added
- `\include` (in addition to `\input`)
- Hyperref url commands
- Font commands (eg. `\textbf`); plain TeX ones such as `\bf` are marked as deprecated
- Using `\text{...}` within mathmode will cause the contents to look normal/different to regular math (or at least appear to)
- `\footnote`, `\footnotemark`, `\footnotetext`
- Reference commands (eg. `\label`). These were taken from `language-latex`
- Extended constants support (besides escaped characters). These were taken from `language-latex`
- List environments (eg. enumerate)
- alignat environment
- Mathmode can find numbers of form 123, 1.23, or .123
- Verbatim environment
- Gnuplot environment
- Luacode environment
- Better TikZ environment (actual TikZ highlighting still lacking specific rules)
- Minted environment for various languages, and generic scope for unknown languages
- Table environment. This was taken (verbatim) from `language-latex`


#### Changed
- `@` is now always considered a valid control word character
- `_` and `^` patterns improved
- The (control word | environment name) is now the final selector in the scope chain (the terminology here is probably wrong, just look at [this commit](https://github.com/Aerijo/language-latex2e/commit/08b5cae144b0ad6d251cf6b86fd19051fea1f24d))
- document environment is no longer a begin/end match; it will simply find all instances of either
- Allows starred variant of figure environment
- Various scope name changes; changes will be reduced after 1.0.0 release


#### Fixed
- `\item` now checks it is at a word boundary before it gets applied

#### Removed
- Redundant comment checking patterns on some rules
- Some other rules that were not used

## 0.10.0
#### Added
- More primitives (unknown origin)
- Basic specs; will be foundation for proper implementation in 1.0.0 release
- `LaTeX TikZ`: Regular LaTeX grammar added as final pattern / fallback

#### Changed
- Renamed `./lib/resources/primitives.txt` to `texPrimitives.txt` (and corresponding regex file)
- Improved regex generator
- Structure of rules more modular and layered by using more `meta` groups
- Internal `$base` calls changed to `$self`
- Scopes of arguments now call `$self` as final pattern
- `usepackage` and `documentclass` get alternative argument scope rules to regular control sequence + argument pairs

#### Fixed
- Primitive highlighting for `\ `, `\-`, and `\/`

#### Removed
- `hypersetup` grammar; was unfinished and unused

## 0.9.0
#### Added
- `pdfTeX` primitives
- Default setting to prevent automatic whitespace removal in log file
- Support for `^^` syntax

#### Changed
- Version number jumped; wasn't synced properly with actual version
- Reformatted grammar file to condense single value objects
- Rescoped `{}` groups to meta; this prevents it from overriding syntax highlighting (eg. within maths)
- Mathmode now ended by `}` as well; prevents breaking in things like `\begin{tabular}{>{$}c<{$}}`
- Scopename of `\\` to match `language-latex`

## 0.6.0
#### Added
- `.jshintrc`
- Primitive highlighting (the control sequence)
- Tools to generate regex for word list

#### Changed
- Refactored `lib/language-latex2e.js`

#### Removed
- Snippets (use [autocomplete-latex](https://github.com/Aerijo/autocomplete-latex) instead)

## 0.5.0
#### Added
- CHANGELOG.md
- Coffeelint support (in package.json)
- Snippets
- License (MIT)
- Default softwrap to true

#### Changed
- README.md
- Default tabLength now 4

## 0.4.0

#### Added
- Menu item for log cursor scope
- Increase/decrease indent pattern detection for environemnts
- Default tablength (set to 2 spaces)
- Log file support

#### Changed
- README.md


## 0.3.0
#### Changed
- Root scope from `source.latex` to `text.tex.latex`
- README.md


#### Fixed
- Highlighting for long (1000+) lines

## 0.2.0
#### Added
- Comment support
- Tikz support
- Miscellaneous changes

## 0.1.0
- Initial release
