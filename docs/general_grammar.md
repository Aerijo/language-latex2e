# LaTeX grammar assumptions
- Spaces following a control sequence are ignored. This is technically not always true, but is useful for the heuristic regarding their arguments.
- Control sequences can contain one or more letters (plus @ in some situations), or one symbol.

# Heuristics
Given the nature of LaTeX, it is impossible to get any meaningful syntax highlighting without applying some assumptions. Therefore, this package applies the following heuristics. Hopefully, they do not cause any breaking syntax issues to your code.
 - Note: if, for some reason, it does cause some funky scoping, use the magic comment `% !TeX syntax = plain` to switch to a much simpler scoping ruleset. This can be reverted at an appropriate location with the magic comment `% !TeX syntax = default`.

0. All unescaped `{` must be balanced with (unescaped) `}`. This is necessary because many rules depend on balanced brackets. Note, this does not apply to (normal) `[` and `(` characters. Similarly, all `$`, `$$`, `\(`, and `\[` must be balanced by legal LaTeX closing statements. I say legal, because (e.g.) `$$` can be closed by `\]`.
1. When a control sequence is immediately followed (no spaces) by a `{` or `[`, the brackets represent an argument or optional argument respectively, and must be closed correctly. Note, `[` does have to be balanced in this case. No space between this closing bracket and another opening bracket similarly applies, and so on.
    - Note: maybe `end: '\\}(?!\\[\\{\\[])'`. This will hide the opening brace from the end pattern, but leave it to be discovered by the sub patterns.
2. The definition of basic LaTeX primitives and commands have not been changed, and no alternative syntax is being used for common features. For example, display math mode is reached using `\[`, or an environment, and not some user defined hook.
3. Similarly, active characters still work as normal. E.g., the `^` takes the next character or group and makes it superscript. `$` is for math mode. `{` is TeX group delimiter. `#` is for paramters.
4. The `@` symbol is always a valid part of a control word name. As this would otherwise depend on context, which is not possible to discern in most cases, allowing `@` prevents odd looking highlighting. Users will need to be vigilant about not making mistakes; e.g., `\foo@` should be rewritten as `\foo @` if it is supposed to be `\foo` followed by `@` character.
