In this file, I'll try and explain the logic behind some choices in the syntax rules.

## General structure
First, the root scope is defined, as well as the grammar name (appears in grammar selector window) and file types that use the grammar. `limitLineLength` does what it says, meaning the highlighting will not stop because the line is too long. Note that the engine will still stop when too many matches have been made on the same line; this is fixed by in a different place.

The main `patterns` array is quite plain, only holding references to 11 patterns found in the `repository`. Even these patterns tend to be a group of other patterns, and so forth, until the 'atomic' building blocks are reached. I have chosen to call these pattern aggregates 'meta', to show their abstract nature. That is, each meta pattern is made up of other meta patterns or atomic patterns. This is intended to make the structure of the grammar clear, and easily maintainable.

Of the 11 main groups, 10 represent the special characters in normal LaTeX, while the 11th is for miscellaneous patterns that do not fall into the above.

- Note: Some 'meta' patterns (such as `metaTilde`) are not actually meta; I just decided it looked more consistent and makes it easier to add new rules in the future.

The order they appear in is mostly arbitrary; so long as `metaControl` is first, it will catch all escaped special characters and prevent something like `\%` from turning into a comment. The rest do not 'intermingle' as far as I know, so there is little possibility of interference.


## Specific patterns

### `metaControl`
This is perhaps the most complicated pattern, as almost all special or quirky behaviour is started by a `\` in LaTeX. To make it more manageable, it was split up into 6 different patterns: common control sequences, environments, math mode symbols, primitives, and generic control symbols & words. Where to place a new rule (that begins with a `\`) should be self evident: if it isn't a primitive or environment, it goes in `metaCommonControlSequences`.

### `metaCommonControlSequences`
A sort of catch all for control sequences that need specific patterns. As it is, most rules in it are standalone. However, as it gets bigger, it may need to be organised better. Font commands and references have already been turned into meta groups.

### `controlWord`
The `@` symbol is allowed in every control word, even if it would not normally be considered a part of the control word. This was done intentionally because 1) it led to issues with `\makeatletter`, and 2) anyone legitimately wanting an `@` right after a control word can always put a space between the two.


## TODO
Migrated to GitHub projects tab
