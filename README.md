# language-latex2e package

This package is a replacement for the already existing [`language-latex`](https://atom.io/packages/language-latex) package. The design philosophy is if it is valid LaTeX, it gets correct syntax highlighting (within reason). For example, it will correctly highlight the optional arguments to `\usepackage`.


## Current Status

This package is still in a decidedly unfinished state, with many scopes missing and already implemented behaviour lacking some features. It currently requires a custom theme to display as intended, and it's a bit of a hack job to get programs such as [`linter-spell`](https://atom.io/packages/linter-spell) and [`linter-chktex`](https://atom.io/packages/linter-chktex) working.

However, I am working to fix these issues and add more functionality to the package. If you think you can help in anyway, feel free to go to the GitHub page and raise an issue or submit a pull request.

## Installation

The package will scope grammar if it is installed through Atom like any other package. You may find that [`language-latex`](https://atom.io/packages/language-latex) (if installed) needs to be disabled for this one to work properly.

## The hack jobs. Sorry.
These sections detail how to set up the spell checking, linting and formatting packages.

### Grammar token limit

This is fixed in version 0.5.0

There should be no errors if also using the [`grammar-token-limit`](https://atom.io/packages/grammar-token-limit) package. It's value will be overriden by what you set in this package's settings. If this does not happen, open an issue and I'll se what I can do.

### Snippets

**NOTE: Snippets will be removed eventually. They will be replaced by `autocomplete-latex`, which will be released when working at a satisfactory level.**

This package comes with snippets for common LaTeX commands. Typing the prefix and pressing tab will expand them properly (eg. `\frac` expands to `\frac{}{}` when `tab` is pressed). Some are limited to a specific scope (`\frac` only works in mathmode).

However, you will find that the autocomplete menu does not appear or contain these snippets.

This is a limitation of the package [`autocomplete-snippets`](https://atom.io/packages/autocomplete-snippets) and/or [`autocomplete-plus`](https://atom.io/packages/autocomplete-plus). There are actually two problems here: it does not recognise snippets with punctuation in them, and it does not show snippets in comments or strings (mathmode is scoped to string).

The first has an [issue page here](https://github.com/atom/autocomplete-snippets/issues/67). Please give it some attention, eg. a thumbs up. There is a partial solution in the thread ([here it is](https://github.com/ezuhaib/autocomplete-snippets/commit/00d31fd9df735fa16c67954f0f93b929bc10c22d)) that you can implement yourself, but I would really like for the issue to be solved properly.

The second is solved in a similar manner. The [issue is here](https://github.com/atom/autocomplete-snippets/issues/63) and it has a pull request also waiting. Unfortunately, the maintainers will not merge until you can update the blacklisted scopes without restarting Atom. Until then, you'll need to edit a local copy of the [`autocomplete-snippets`](https://atom.io/packages/autocomplete-snippets) package to remove `string` from disabled scopes. This second issue will perhaps be irrelevant in the future, as this package will likely change the scope of maths from `string` to `markup`.

### Spell checking

I recommend using the package [`linter-spell`](https://atom.io/packages/linter-spell) to manage spell checking. You will need a version of Aspell or Hunspell on your system, see the package itself for more help. One thing to make sure of is that you specify the absolute path for Hunspell / Aspell.

In addition, you want the package [`linter-spell-latex`](https://atom.io/packages/linter-spell-latex). This is where the hack job begins: when a LaTeX command is marked as misspelt, check the scope (right click; Show Cursor Scope). Then go to the package folder (settings; view code) and open `lib/main.js`. Scroll down a little to reach the big list of scopes (you'll know when you see it). Add the scope in the same style as the ones already there (make sure you set it to false).

Some things (such as `[2em]` for spacing) are not scoped by this package yet, so this solution will not work every time.



### Chktex

[`linter-chktex`](https://atom.io/packages/linter-chktex) should work out of the box, assuming you have the full TeXLive install (and if you don't, I'll assume you know enough to install the `chktex` package yourself).

However, you may not see the linting: in this case, make sure you have both [`linter`](https://atom.io/packages/linter) and [`linter-ui-default`](https://atom.io/packages/linter-ui-default) installed and enabled.

### Beautify

The only problem here is getting `latexindent` (part of TeXLive install) to work. I resorted to installing a Perl Package manager, and tried running the terminal command `latexindent` and installing the package required by the error message until it worked. It seemed to be `YAML::tiny` and some Unicode package it needed.

NOTE: The Atom package will not give a very informative warning as to what's happening, so be sure to get it working in the command line first.
