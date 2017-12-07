# Changelog

<!-- ## Unreleased -->

## 0.9.0
#### Added
- `pdfteX` primitives

#### Changed
- Version number jumped; wasn't synced properly with actual version
- Reformatted grammar file to condense single value objects
- Rescoped `{}` groups to meta; this prevents it from overriding syntax highlighting (eg. within maths)
- Mathmode now ended by `}` as well; prevents breaking in things like `\begin{tabular}{>{$}c<{$}}`

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
