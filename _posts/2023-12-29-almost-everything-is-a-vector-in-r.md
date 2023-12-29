---
layout: post
title: Almost everything is a Vector in R
date: 2023-12-29 11:52:00 +0200
author: markolenik
tags: []
---

In mathematics, a vector is defined as a geometric entity with both magnitude and direction - typically represented as arrows in a space.
In R, however, the term "vector" spans a broader spectrum. Here, we encounter two primary types of vectors: atomic vectors and lists.

## Atomic Vectors
Atomic vectors in R are homogeneous, meaning they contain elements of the same type. They include types like integer, double, character, logical, and complex. Atomic vectors are efficient and are the building blocks for many data structures in R. In fact, scalar values in R are also atomic vectors of length one. For example, consider the following code snippet:

```R
is.vector(1) # [1] TRUE
1[1] # [1] 1
1[2] # [1] NA
```

Also note that the print statement contains the value `[1]` before the actual value. This is R's way of indicating that the value is the first element of a vector.
So scalars that are not vectors are a bit of a misnomer in R. They are vectors of length one. We have to be careful when interpreting the output from `is.vector()`, which is not always intuitive (see below).

## Lists: Generic Vectors
Lists in R are termed generic vectors. Lists can hold elements of different types, including numbers, strings, or even other lists. This versatility makes them incredibly useful for diverse data structures but comes at a cost of efficiency compared to atomic vectors.

## Understanding `is.vector`
The `is.vector` function checks for both atomic vectors and lists. Additionally, it returns `FALSE` if the vector has attributes other than `names`. For example, consider the following code snippet:

```R
x <- 1:10
is.vector(x) # [1] TRUE
attr(x, "a") <- 42
is.vector(x) # [1] FALSE
x <- as.vector(x)
is.vector(x) # [1] TRUE
```

To test for atomic vectors, we can either specify the mode of the vecor, i.e. `is.vector(x, mode = "numeric")`, or use `is.atomic`. I come from a Python background, so I prefer `is.atomic` and avoid `is.vector`, since when I think of vectors, I think of atomic vectors.

# References
* <https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Expression-objects>
* <https://homerhanumat.github.io/r-notes/what-is-a-vector.html>
* <https://adv-r.hadley.nz/vectors-chap.html>
