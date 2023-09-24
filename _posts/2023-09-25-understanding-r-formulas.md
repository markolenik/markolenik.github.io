---
layout: post
title: Understanding R Formulas
date: 2023-09-24 20:00:00 +0200
author: markolenik
tags: []
---

Why is the formula `x ~ (y + z)^2` equivalent to `x ~ y*z`?
Here are the exact transformation steps:
- **Step 1:** Start with the formula `x ~ (y + z)^2` and take the square, we get `y^2 + z^2 + 2*y*z`.
- **Step 2:** In R, the square of a term in a formula (like `y^2` or `z^2`) just refers to the term itself. So, `y^2` becomes `y` and `z^2` becomes `z`. Now, the formula is `x ~ y + z + 2*y*z`.
- **Step 4:** The coefficient `2` in front of the interaction term `y*z` doesn't change the nature of the interaction, so it is dropped. Now, the formula is `x ~ y + z + y*z`.
- **Step 5:** Since `y*z` is a shorthand for `y+z+y:z`, we get `x ~ 2y + 2z+ y:z`. Again we can get rid of the coefficients, which simplifies to `x ~ y + z + y:z`, i.e. `x ~ y*z`.
