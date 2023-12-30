---
layout: post
title: Riding the Rollercoaster of R's Single Dispatch
date: 2023-09-24 19:30:00 +0200
author: markolenik
tags: []
---

Navigating the R language and its idiosyncratic single dispatch system can feel like a thrilling theme park ride. The syntax is akin to a treasure chest - full of surprises. Let's embark on a journey that introduces a new dispatch to the `stats::predict` function.

R operates on a system known as S3 for single dispatch. When you summon a generic function like `predict`, R dispatches to the specific method that aligns with the class of the input object. For instance, `predict.lm` for linear models and `predict.glm` for generalized linear models.

Here's your map to adding a custom predict function that always return `1` and works on a new class `myModel`:

```R
# Craft a simple "myModel" class
myModel <- function(formula, data) {
    class(lm_model) <- "myModel"
    return(lm_model)
}

# Carve out a new predict method for "myModel"
predict.myModel <- function(object, newdata) {
    # In this example, we'll just always return 1
    return(1)
}

# Define our model
model_mymodel = myModel(mpg ~ cyl, mtcars)

# With our model
predict(model_mymodel, mtcars)
```

The head-spinning part is that the first word after the `.` designates the class of the object for the single dispatch. And it gets even more crazy when you consider that R allows for dots pretty much everywhere. So don't mistake the `data.frame` to be a form of single dispatch, it's just an ordinary function call, as the following snippet confirms:

```R
sloop:ftype(data.frame)
#> [1] "function"
```

Now let's shift gears and explore Julia, which handles single (and multiple) dispatch with poise and elegance.

```Julia
# Define a function for adding two integers
f(x::Int, y::Int) = x + y

# Define a function for concatenating two strings
f(x::String, y::String) = string(x, y)

# Usage:
println(f(2, 3)) # prints "5"
println(f("Hello, ", "World!")) # prints "Hello, World!"
```

This article isn't intended to critique R in favor of Julia. In fact, I'm warming up to R, especially when it comes to writing code (though reading code still feels like deciphering hieroglyphics). But there's always room for improvement.

