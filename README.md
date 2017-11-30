# language-latex2e package

This package is a replacement for the already existing [`language-latex`](https://atom.io/packages/language-latex) package. The design philosophy is if it is valid LaTeX, it gets correct syntax highlighting (within reason). For example, it will correctly highlight the optional arguments to `\usepackage`.


## Current Status

This package is still in a decidedly unfinished state, with many scopes missing and already implemented behaviour lacking some features. It currently requires a custom theme to display as intended, and it's a bit of a hack job to get programs such as [`linter-spell`](https://atom.io/packages/linter-spell) and [`linter-chktex`](https://atom.io/packages/linter-chktex) working.

However, I am working to fix these issues and add more functionality to the package. If you think you can help in anyway, feel free to go to the GitHub page and raise an issue or submit a pull request.

## Installation

The package will scope grammar if it is installed through Atom like any other package. You may find that [`language-latex`](https://atom.io/packages/language-latex) (if installed) needs to be disabled for this one to work properly.

## The hack jobs. Sorry.
These sections detail how to set up the spell checking, linting and formatting packages.

### Snippets

Snippets have been removed from this package. To get them back ~~mail ₿10 by carrier swallow (African) to the following offshore location~~ you can install my other package [`autocomplete-latex`](https://atom.io/packages/autocomplete-latex), or any other completion package you like.

### Spell checking

I recommend using the package [`linter-spell`](https://atom.io/packages/linter-spell) to manage spell checking. You will need a version of Aspell or Hunspell on your system, see the package itself for more help. One thing to make sure of is that you specify the absolute path for Hunspell / Aspell.

In addition, you want the package [`linter-spell-latex`](https://atom.io/packages/linter-spell-latex). This is where the hack job begins: when a LaTeX command is marked as misspelt, check the scope (right click; Show Cursor Scope). Then go to the package folder (settings; view code) and open `lib/main.js`. Scroll down a little to reach the big list of scopes (you'll know when you see it). Add the scope in the same style as the ones already there (make sure you set it to false).

Some things (such as `[2em]` for spacing) are not scoped by this package yet, so this solution will not work every time.


### Chktex

[`linter-chktex`](https://atom.io/packages/linter-chktex) should work out of the box, assuming you have the full TeXLive install (and if you don't, I'll assume you know enough to install the `chktex` package yourself).

However, you may not see the linting: in this case, make sure you have both [`linter`](https://atom.io/packages/linter) and [`linter-ui-default`](https://atom.io/packages/linter-ui-default) installed and enabled.

### Beautify

The only problem here is getting `latexindent` (part of TeXLive install) to work. I resorted to installing a Perl Package manager, and tried running the terminal command `latexindent` and installing the package required by the error message until it worked. It seemed to be `YAML::tiny` and some Unicode package it needed.

- **Note**: The Atom package will not give a very informative error message, so be sure to get it working in the command line first.
