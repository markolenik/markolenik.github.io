---
layout: post
title: What's an atomic vector in R?
date: 2023-12-29 11:52:00 +0200
author: markolenik
tags: []
---

In R the most common base types like "numeric", "character", "logical", and "complex" are all in fact atomic vectors - this includes scalars.
For example, consider the following code snippet:

```R
length(1) # [1] 1
1[1] # [1] 1
1[2] # [1] NA
```

`NA` is a special atomic vector of length zero.
Also note that the print statement contains the value `[1]` before the actual value. This is R's way of indicating that the value is the first element of a vector.

To test if a variable is an atomic vector, we can use the `is.atomic` function.

```R
is.atomic(1) # [1] TRUE
is.atomic(NULL) # [1] TRUE
is.atomic(c(1, 2, 3)) # [1] TRUE
is.atomic(list(1, 2, 3)) # [1] FALSE
```

Lists are not atomic, but "generic vectors". Atomic and generic vectors together make up the class of vectors in R, which I find counterintuitive. The function `is.vector` is even more confusing, as it only returns `TRUE` if an object is a vector has no attributes other than `names`. So an object might be indexed like a vector, but not pass `is.vector`. For example:

```R
x <- 1:10
is.vector(x) # [1] TRUE
attr(x, "a") <- 42
is.vector(x) # [1] FALSE
x[2] # [1] 2
```

R is odd.

# References
* <https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Expression-objects>
* <https://homerhanumat.github.io/r-notes/what-is-a-vector.html>
* <https://adv-r.hadley.nz/vectors-chap.html>
