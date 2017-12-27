This file aims to document the expected syntax of the commands highlighted by this package.

Values enclosed in `<>` represent a different set of rules, which should be defined elsewhere in this file. E.g., in`\begin{tikzpicture}[<options>]`, `<options>` represents a set of rules under the heading `options`.

## TikZ
The following is taken from the TikZ manual. I have done my best to provide the relevant section numbers that appear to provide the full grammar for each construction.

#### Tikz control word (§12.2.2)
```
\tikz[<options>]{<path commands>}
```
- With only one path command, the braces are unnecessary. It ends at the first `;`


#### Tikzpicture environment (§12.2.1)
```
\begin{tikzpicture}[<options>]
  <environment contents>
\end{tikzpicture}
```

There also exists `tikzfadingfrompicture` which is documented in §23.4

#### Scope environment (§12.3.1)
```
\begin{scope}[<options>]
  <environment contents>
\end{scope}
```

#### Scope control word
```
\scoped[<options>]<path command>
```
- Same rules as `\tikz` for the argument

#### Coordinate (§13)
```
([<options>]<coordinate specification>)
```

#### Coordinate specification
This has two forms: explicit, and implicit. Explicit is the coordinate system name, followed by `cs:` followed by `key-value` pairs.
- Note: the TikZ manual has parentheses surrounding the following definition. I assume that is a typo, or they are optional.

```
<coordinate system> cs: <key-value pairs>
```
Alternatively, implicit relies on differences in syntax: e.g., `(2mm,5mm)` is rectangular, whereas `(30:5mm)` is polar. Additionally, the presence of a dimension determines if it uses the `canvas` (with) or the `xyz` (without) coordinate systems.

#### Coordinate systems (§13.2)
Basic coordinate systems:
- `canvas`
- `xyz`
- `canvas polar`
- `xyz polar`
- `xy polar`

Other systems:
- `barycentric`
- `node`
- `tangent`
- `perpendicular` (§13.3.1)


More can be defined by the user, but it is recommended they follow the `key-value` syntax.

#### Coordinate calculations (§13.5)
```
([<options>]$<coordinate computation>$)
```

#### Coordinate computation
```
<factor>*<coordinate><modifiers>
```
The above is optionally followed by `+` or `-`, and then repeated as much as desired.

`<factor>` is optional, and is determined by whether or not the `$` preceeding `<coordinate computation>` is immediately followed by a `(` (I believe spaces are ignored). This also applies to directly after the `+|-` for subsequent factor/coordinate/modifier groups. A factor is anything that can be handled by `\pgfmathparse`. The rule for distinguishing factor from coordinate is that the first occurrence of `*(` is the boundary. However, instances of this within `{}` groups do not count. `<modifiers>` are complicated, and probably not easy (read: possible) to scope. Read §13.5.3 for a guide on their syntax.

#### Path (§14)
```
\path<specification>;
```

A `<specification>` is 'a long stream of _path operations_'

Possible types include the following:
- `\path ... <coordinate> ...;` - the `move-to` operation.
- `\path ... -- <coordinate|cycle> ...;` - the `line-to` operation.
- `\path ... -| <coordinate|cycle> ...;` - horizontal then vertical lines.
- `\path ... |- <coordinate|cycle> ...;` - vertical then horizontal lines.
- `\path ... ..controls<c>and<d>..<y|cycle> ...;` - the `curve-to` operation. `c`, `d`, and `y` are coordinates. `and<d>` is optional.
- `\path ... rectangle<coordinate|cycle> ...;` - the `rectangle` operation. Rectangle is formed between current coordinate and the given coordinate.
- `\path ... circle[<options>] ...;` - the `circle` operation. Circle is formed centred on current coordinate. `circle (1pt)` is also valid, but is deprecated because `()` should only be used for coordinates.
- `\path ... ellipse[<options>] ...;` - the `ellipse` operation. Same rules as circles apply.
- `\path ... arc[<options>] ...;` - the `arc` operation. Same rules as circles apply.
- `\path ... grid[<options>]<coordinate|cycle> ...;` - the `grid` operation.
- `\path ... parabola[<options>]bend<bend coordinate><coordinate|cycle> ...;` - the `parabola` operation. The bend is optional.
- `\path ... sin<coordinate|cycle> ...;` - the `sine` operation.
- `\path ... cos<coordinate|cycle> ...;` - the `cosine` operation.
- `\path ... svg[<options>]{<path data>} ...;` - the `svg` operation.
- Note: the manual states there is a `plot` operation, but does not describe it's syntax yet.
- `\path ... to[<options>]<nodes><coordinate|cycle> ...;` - the `to` operation.
- `\path ... foreach<variables>[<options>]<nodes>in<path commands> ...;` - the `foreach` operation. See §83 for details.
- `\path ... let<assignment>in ...;` - the `let` operation. The number of assignments is optional, with comma separation. `<assingment>` is of the form `\n<number register>={<formula>}`. `\n` can be replaced by `\p`, making the following grammar a `<point register>`. The x and y coordinates of the point can be accessed with `\x` and `\y`
- The `node`, `edge`, `graph`, and `pic` operations are complex and given their own sections.
- `\path ... \pgfextra{<code>} ...;` - the `pgfextra` operation. The `<code>` is normal latex and is ignored by TikZ.
- `\path ... \pgfextra<code>\endpgfextra ...;` - alternative syntax.

Possible path-like commands include:
- `\draw`
- `\fill`
- `\filldraw`
- `\pattern`
- `\shade`
- `\shadedraw`
- `\clip`
- `\useasboundingbox`

#### Arrows
Specification for arrows is:
```
<start specification>-<end specification>
```
The expansion of these is irregular, but `[]` always represents options.

#### Node
```
\path ... node<foreach statements>[<options>](<name>)at(<coordinate>){<node contents>} ...;
```
According to the manual, 'everything between `node` and the opening brace of a node is optional'. I take this to mean `node {}` is the bare minimum for a legal node. It further clarifies that the end of the node specification os detected by the opening curly brace. However, if the key `node contents` is given as an option, the node specifications ends at the closing square bracket. This makes it difficult to reliably scope a node, as users can make custom aliases for the options. A better approach is to handle each element separately, and work out a way to differentiate `(<coordinate>)` from `(<name>)`.
  - Although, the name is techinically a reference to the node's position, so it wouldn't be wrong to scope the name as a coordinate as well.

  Additionally, the ordering of any elements following the `<foreach statements>` is optional and can be repeated.

There exists several shorthand versions (much like `\path` itself).
```
\path ... coordinate[<options>](<name>)at(<coordinate>) ...;
```
Also, `\node` is an abbreviation for `\path node` and `\coordinate` means `\path coordinate`

The following specifies different text groups in a node.
```
\nodepart[<options>]{<partname>}
```

 - Note: if the node operation appears inside of another path operation (eg. `-- <node here> (<coordinate>)`), it will be positioned along the constructed path (see §17.8 for details).

Label syntax can have the following shorthand:
```
"<text>"<options>
```
If the options are not enclosed in `{}`, they end at the first comma. It expands to
```
label={[<options>]<text>}
```
Additionally, quote marks in the `<text>` can be enclosed with `{}` to prevent them from prematurely ending the `<text>`.

Also, there exists the following version for later commands:
```
\path ... node also[<late options>](<name>) ...;
```

And children:
```
\path ... child[<options>]foreach<variables>in{<values>}{<child path>} ...;
```

```
\path ... edge from parent[<options>] ...;
```

#### Edge
```
\path ... edge[<options>]<nodes>(<coordinate>) ...;
```

#### Pic
```
\path ... pic <foreach statements>[<options>](<prefix>)at(<coordinate>){<pic type>}
```
All elements, except `pic`, are optional.

#### Graph
```
\path ... graph[<options>]<group specification> ...;
```

`<group specification>` has the following syntax:
```
{[<options>]<list of chain specifications>}
```

#### Matrix
The command `\matrix` is an abbreviation for  `\path node[matrix]`

#### Plot
```
\path ... plot[<local options>]<further arguments> ...;
```
Where `<further arguments>` is one of the following:
- `coordinates{<coordinate 1><c 2>...<c n>}`
- `file{<filename>}`
- `<coordinate expression>`
- `function{<gnuplot formula>}`
