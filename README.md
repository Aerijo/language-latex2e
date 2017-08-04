# language-latex2e package

This package is a replacement for the already existing [`language-latex`](https://atom.io/packages/language-latex) package. The design philosophy is if it is valid LaTeX, it gets correct syntax highlighting. For example, my main motivation for starting this package was how poorly the other package handles optional arguments to commands like `\usepackage`. Hopefully, you will find this package better accommodates multiline arguments and the like.

## Current Status

This package is still in a decidedly unfinished state, with many scopes missing and already implemented behaviour lacking some features. It currently requires a custom theme to display as intended, and it's a bit of a hack job to get programs such as [`linter-spell`](https://atom.io/packages/linter-spell) and [`linter-chktex`](https://atom.io/packages/linter-chktex) working.

However, I am working to fix these issues and add more functionality to the package. If you think you can help in anyway, feel free to go to the GitHub page and raise an issue or submit a pull request.

## Installation

The package will scope grammar if it is installed through Atom like any other package. You may find that [`language-latex`](https://atom.io/packages/language-latex) (if installed) needs to be disabled for this one to work properly.

## The hack jobs. Sorry.
These sections detail how to set up the spell checking, linting and formatting packages.

### Grammar token limit

You may notice this package stops working in long paragraphs with a lot of macros. This is a limitation of Atom, and can be patched by installing the package [`grammar-token-limit`](https://atom.io/packages/grammar-token-limit). Raising the limit this way can fix your problems, but may impact performance so use with caution.

If this doesn't help (maybe it's a _really_ long paragraph), try inserting a newline in a convenient place. This does nothing to the output, and it will reset the token limit (this is because the limit is only for each line).

### Spell checking

I recommend using the package [`linter-spell`](https://atom.io/packages/linter-spell) to manage spell checking. You will need a version of Aspell or Hunspell on your system, see the package itself for more help. One thing to make sure of is that you specify the absolute path for Hunspell / Aspell.

In addition, you want the package [`linter-spell-latex`](https://atom.io/packages/linter-spell-latex) (duh). This is where the hack job begins: when a LaTeX command is marked as misspelt, check the scope (right click; print cursor scope). Then go to the package folder (settings; view code) and open `lib/main.js`. Scroll down a little to reach the big list of scopes (you'll know when you see it). Add the scope in the same style as the ones already there (make sure you set it to false).

Simple, right?


### Chktex

[`linter-chktex`](https://atom.io/packages/linter-chktex) should work out of the box, assuming you have the full TeXLive install (and if you don't, I'll assume you know enough to install the `chktex` package yourself).

However, you may not see the linting: in this case, make sure you have the packages [`linter`](https://atom.io/packages/linter) and [`linter-ui-default`](https://atom.io/packages/linter-ui-default) installed.

### Beautify

My final "hack" job, the only problem here is getting `latexindent` (part of TeXLive install) to work. I resorted to installing a Perl Package manager, and tried running the terminal command `latexindent` and installing the package required by the error message until it worked. It seemed to be `YAML::tiny` and some Unicode package it needed.

NOTE: The Atom package will not give a very informative warning as to what's happening, so be sure to get it working in the command line first.
