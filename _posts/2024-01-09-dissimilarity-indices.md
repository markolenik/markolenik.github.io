---
layout: post
title: Dissimilarity indices and identities
date: 2024-01-09 17:56:00 +0200
author: markolenik
katex: true
tags: []
---
The two common dissimilarity indices used in microbiome research are the Bray-Curtis and the Jaccard indices.
Both can be applied to either abundance data (non-negative vectors) or presence/absence data (binary vectors). 
The Bray-Curtis index is more commonly used for non-negative vectors and the Jaccard index for binary vectors, however, here I'll consider only binary vectors.
In R they are implemented in the `vegan` package as

```R
vegdist(x, method="bray", binary=FALSE, diag=FALSE, upper=FALSE, 
        na.rm = FALSE, ...) 
```

The documentation for the [`vegdist`](https://rdrr.io/cran/vegan/man/vegdist.html) function is cramped and poorly structured, like most R docs.
But it contains some interesting identities that I'd like to derive here.

## Note on terminology
The terminology in the context of ecological dissimilarities is all over the place.
Very often the terms "metric", "distance", and "dissimilarity" are used interchangeably, e.g. [Kers et al (2021)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8928147/) writes "Bray-Curtis metric" and "Bray-Curtis dissimilarity".
Only the latter is correct, since the Bray-Curtis does not satisfy the triangle inequality and is therefore not a metric (e.g. see [mathworld](https://mathworld.wolfram.com/Metric.html)).
The terms "coefficient" and "index" are also used in a hand-wavy way.
Throughout the documentation of `vegdist()` the authors use "index" to mean either "dissimilarity" or "distance".
Wikipedia uses "index" and means "coefficient" or "similarity", e.g. in the [Jaccard index](https://en.wikipedia.org/wiki/Jaccard_index), where
$$
\text{dissimilarity} = 1 - \text{similarity}
$$

## Bray-Curtis dissimilarity
The Bray-Curtis dissimilarity $d_B$ for binary vectors $\bold{x}, \bold{y} \in \set{0, 1}^N$ is informally (e.g. in [wikipedia](https://en.wikipedia.org/wiki/Bray-Curtis_dissimilarity)) defined as
$$
d_B(\bold x, \bold y) := 1 - \frac{2 C_{xy}}{S_x + S_y}
$$
where $C_{xy}$ is the number of common species between $\bold x$ and $\bold y$, and $S_x$ and $S_y$ are the total number of species in $\bold x$ and $\bold y$, respectively.
A more explicit definition is 
$$
d_B(\bold{x}, \bold{y}) := 1 - \frac{2 \sum\limits_i \min{(x_i, y_i)}}{\sum\limits_i(x_i + y_i)} \overset{(1)}{=} \frac{\sum\limits_i |x_i - y_i|}{\sum\limits_i (x_i + y_i)}
$$

The identity $(1)$ can be shown using the properties of the absolute value function:
$$
|x - y| = \max{(x, y)} - \min{(x, y)} 
$$

Then 
$$
\begin{align*}
1 - \frac{2 \sum\limits_i \min{(x_i, y_i)}}{\sum\limits_i(x_i + y_i)} &= \frac{\sum\limits_i \big(x_i + y_i- 2 \min{(x_i, y_i)}\big)}{\sum\limits_i(x_i + y_i)} \\

&= \frac{\sum\limits_i \big(x_i + y_i- 2 \min{(x_i, y_i)} + \max{(x_i, y_i) - \max{(x_i, y_i)}}\big)}{ \sum\limits_i(x_i + y_i)} \\

&= \frac{\sum\limits_i \big(x_i + y_i- \max{(x_i, y_i)} - \min{(x_i, y_i)} + |x_i - y_i| \big)}{\sum\limits_i(x_i + y_i)}\\

&= \frac{\sum\limits_i \big(|x_i - y_i| \big)}{\sum\limits_i(x_i + y_i)}\; \blacksquare\\
\end{align*}
$$
The last step follows from the fact that 

$$\max{(x_i, y_i)} + \min{(x_i, y_i)} = x_i + y_i$$




## Jaccard distance
The Jaccard distance is defined as
$$ d_J(\bold x, \bold y) := 1 - \frac{\sum\limits_i \min{(x_i, y_i)}}{\sum\limits_i\max{(x_i, y_i)}} $$

According to [`vegdist`](https://rdrr.io/cran/vegan/man/vegdist.html) it can be expressed in terms of the Bray-Curtis dissimilarity as
$$ d_J(\bold x, \bold y) = \frac{2\; d_B(\bold x, \bold y)}{1 + d_B(\bold x, \bold y)} $$

Substituting the definition of $d_B$ and simplifying we get
$$ d_J(\bold x, \bold y) = \frac{2 \sum \limits_i |x_i - y_i|}{\sum \limits_i (x_i + y_i) + \sum \limits_i |x_i - y_i|} $$

To prove this identity we start by simplifying the numerator as follows
$$
2 \sum_i |x_i - y_i| = 2 \sum_i \max{(x_i, y_i)} - 2 \sum_i \min{(x_i, y_i)}

$$

We simplify the denominator as follows
$$
\begin{align*}
&\sum \limits_i (x_i + y_i) + \sum \limits_i |x_i - y_i| =\sum \limits_i \big( x_i + y_i + \max{(x_i, y_i)} - \min{(x_i, y_i)} \big) =\\[1.5em]
&\sum \limits_i \big( x_i + y_i + \max{(x_i, y_i)} - \min{(x_i, y_i)} + \max{(x_i, y_i)} - \max{(x_i, y_i)} \big) =\\[1.5em]
&2\sum \limits_i \max{(x_i, y_i)}
\end{align*}
$$

Putting everything together we get
$$
\frac{2 \sum \limits_i \max{(x_i, y_i)} - 2 \sum \limits_i \min{(x_i, y_i)}}{ 2\sum \limits_i \max{(x_i, y_i)} } =
 1 - \frac{\sum \limits_i \min{(x_i, y_i)}}{\sum \limits_i \max{(x_i, y_i)}} \; \blacksquare
$$
thus proving the identity.

## Tanimoto distance
The Tanimoto distance, also called "generalized Jaccard distance", is another common distance found in theoretical ecology.
It is defined using dot products as
$$ d_T(\bold x, \bold y) := 1 - \frac{\bold x \cdot \bold y}{\bold x \cdot \bold x + \bold y \cdot \bold y - \bold x \cdot \bold y} $$

The Tanimoto distance is equal to the Jaccard distance for binary vectors:

$$
\begin{align*}
d_J(\bold x, \bold y) &= d_T(\bold x, \bold y)\\[1.5em]
1 - \frac{\sum \min(x_i, y_i)}{\sum \max(x_i, y_i)} &= 1 - \frac{\bold x \cdot \bold y}{\bold x \cdot \bold x + \bold y \cdot \bold y - \bold x \cdot \bold y}
\end{align*}
$$
This identity follows from the fact that for binary vectors the dot product can be simplified to 
$$\begin{align*}
\bold x \cdot \bold y &= \sum \min{(x_i, y_i)}\\
\bold x \cdot \bold x &= \sum x_i
\end{align*}
$$

Simplifying $d_T$ we get
$$
\begin{align*}
d_T(\mathbf{x}, \mathbf{y}) &= 1 -\frac{\sum \min(x_i, y_i)}{\sum x_i + \sum y_i - \sum \min(x_i, y_i)} \\[1.5em]
&=1 - \frac{\sum \min(x_i, y_i)}{\sum \big( x_i + y_i - \min(x_i, y_i) + \max(x_i, y_i) - \max(x_i, y_i)\big )} \\[1.5em]
&=1 - \frac{\sum \min(x_i, y_i)}{\sum \max(x_i, y_i)} = d_J(\mathbf{x}, \mathbf{y}) \; \blacksquare
\end{align*}
$$

# References
* [Metric and Euclidean properties of dissimilarity coefficients (Gower et al 1986)](https://link.springer.com/article/10.1007/BF01896809)
* <https://www.jak.bio/posts/me/20211129_jaccard/jaccard.html>