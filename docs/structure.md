In this file, I'll try and explain the logic behind some choices in the syntax rules.

## General structure
First, the root scope is defined, as well as the grammar name (appears in grammar selector window) and file types that use the grammar. `limitLineLength` does what it says, meaning the highlighting will not stop because the line is too long.

The main `patterns` array is quite basic, only holding references to objects found in the `repository`. Even then, those objects tend to be a group of other objects that define the actual rules. This allows the purpose of each rule to be seen easily, and help with mitigating possible contradictions. For example, every scope that begins with a `\` is grouped together into the (imaginatively titled) `metaControl` object. As `\` is searched for before `%`, this means that no `\%` constructions will accidentally trigger the comment scope. Similarly, `\\` is searched for first in order to not mistake the second `\` as the start of another macro. In this way, constructions such as `\\\\\\\\\\\\%` are handled without issue.

The actual entries in `patterns` are the special characters that trigger something special in latex. Therefore, it's looking for one of the following (in the given order): `\%$~&{}_^#`. Note that the actual order is not entirely important, so long as `\` is searched for first.

## Specific grammars

### usepackage
This was the cause of a great many frustrations. The problem was getting nested brackets to play well, without an inner `}` being taken as the end for an outer pair. Eventually I settled on the regex seen in the file, but I couldn't tell you exactly how it works, just that it does.

## TODO
- Just noticed I broke `\(` and `\)` with the new control symbol regex; I need to write specs.
