---
layout: post
title: Using GITHUB_TOKEN in GitHub workflows
date: 2023-08-20 11:52
author: markolenik
tags: []
---

Today, I was learning about GitHub Actions and wanted to set up a workflow that builds and pushes an image to the GitHub registry as a package.
However, pushing images requires write permission, which I used to add in the past using a custom token via GitHub's "secrets" feature.
For example, I would use the command `gh secret set GH_TOKEN`, and within my workflow, I could access it using the variable `secrets.GH_TOKEN`.
This approach required adding an explicit secret for each repository, which had some overhead.

A more convenient solution is to use the `GITHUB_TOKEN` variable, which is a built-in token provided by GitHub with repo-scope permission.
By default, it only has read permissions, but for pushing images, it needs write permission.
I changed this option in the repository's settings menu under "Actions/Workflow permissions" to "Read and write permission"[^1].

Now I can simply use the token everywhere a password is required.
For example to login to ghcr I can do:
```yaml
...
{% raw %}
    steps:
      - name: Login to GHCR
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}
{% endraw %}
```

[^1]: I'd like to change that option using a Github CLI command, e.g. `gh ...`, but I couldn't find one.

<script src="https://giscus.app/client.js"
        data-repo="markolenik/markolenik.github.io"
        data-repo-id="R_kgDOKH0A5g"
        data-category="Announcements"
        data-category-id="DIC_kwDOKH0A5s4CYwG8"
        data-mapping="title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>


