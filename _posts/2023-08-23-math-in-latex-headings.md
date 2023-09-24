---
layout: post
title: Math in LaTeX headings
date: 2023-08-23 15:45:00 +0200
author: markolenik
tags: []
---

I often need math in my LaTeX headings.
This is a problem because headings are used in the table of contents, where math can't be properly rendered.
`chktex` also complains about math in headings and throws the error:
```
Token not allowed in a PDF string (Unicode)
```


The fix is to provide a "plain text" version of the heading for the PDF table of contents as an option, for example:.

```latex
\section[The Logistic Map: x_{n+1} = r x_n (1 - x_n)]{The Logistic Map: $x_{n+1} = r x_n (1 - x_n)$}
```

# Resources
* User BRBoer on [r/LaTeX](https://www.reddit.com/r/LaTeX/comments/qxudfy/math_mode_in_section/hlclqxj/)