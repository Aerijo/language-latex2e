This package introduces a new [magic comment](https://tex.stackexchange.com/questions/78101/when-and-why-should-i-use-tex-ts-program-and-tex-encoding) of the form
```latex
% !TEX syntax = value
```
where _value_ is one of the following choices:
- `plain`: Used to reduce syntax highlighting to the bare minimum to be considered "LaTeX aware"
- `none`: Removes all highlighting that follows
- `math`: Switches to math mode
- `verbatim`: Switches to verbatim
- `text`: Breaks out of math mode or verbatim

Note that the implementation is not perfect, and probably cannot be done in a feasible way unless I were to switch to compiling the grammar from code, ~~which sounds like fun!~~. Seriously though, it may be best in the long run for maintainability and consistency as the package gets more complicated.

Some tips for now on how to avoid screwing up the highlighting more than before you used these comments:
- Make sure that if you begin inside of a group, you end it inside as well. This applies to things like `{...}`, `$...$`, `\begin{}...\end{}`, etc. To check if it will cause a problem, log the scope of where you want to put the comment (right click: `Show Cursor Scope`). If the scope has something that was caused by an earlier pattern (eg. it might say `string.other.math...`), put another magic syntax comment before the closing `$` or `\)`.
  - Of course, when in doubt, you can always just put the comment earlier. Placing it at the top of the file will have no issues.

- Place the comment outside of any complicated areas. Although, it might remove some legitimate highlighting, it's probably not worth the effort deciding if it'll break anything else.
