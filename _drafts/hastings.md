---
title: Metropolis-Hastings Algorithm
subtitle: The Metropolis-Hastings algorithm is a Markov chain Monte Carlo (MCMC) algorithm that generates a sequence of random variables from a probability distribution from which direct sampling is difficult.
# layout: math_page_template
layout: post
date: 2023-04-13
author: markolenik
keywords: probabilistic-thinking machine-learning bayesian-inference bayesian-statistics conjugate-prior conjugate-family metropolis-hastings-algorithm mcmc
# published: true
# tags: probability algorithm data-science machine-learning binomial-distribution bayesian-statistics beta-distribution conjugate-prior mcmc 
---

Here's the model:

{% katexmm %}
$$
\begin{aligned}
Y | \mu  &\sim \mathcal{N}(\mu, 0.75^2) \\
\mu &\sim \mathcal{N}(0, 1^2)
\end{aligned}
$$

test as was foretold in {% cite abbott1997 %} and {% cite bose2011 %} and {% cite olenik2023 %}. 

$$
\frac{dx}{dt} = x^2
$$

{% endkatexmm %}


