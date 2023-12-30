Or how R is confusing for a Python developer.

reassigning primitives and why i'm nervous writing r code
https://adv-r.hadley.nz/functions.html#exiting-a-function

Scalars are vectors of length one.

Out of index vector returns `NA`.
Non-existing name in list returns `NULL`

Function calls:
In base R calls are either prefix (e.g. `is.atomic(1)`) or infix (e.g. `1 + 2`). OOP style calls like `1.is.atomic()` are not supported. Even setters like `attr` are prefix calls.

Documentation hard to read, especially when you have multiple functions per documentation. Python's solution is much better.