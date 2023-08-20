---
layout: post
title: Github CLI overview
date: 2023-08-19 17:18
author: markolenik
tags: []
---

How I came across it

The main idea is to work from within repos.

My usecase
- search for repos: `gh search repos <search term>`.
- view repos: `gh repo view <repo name>` or with `--web` flag to open in browser.

Overview of commands
- [ ] Make figure with oveview

Dealing with secrets in general
- List repo secrets: `gh secret list --repo <namespace>/<repo name>`
- Add secret to repo

Manage pacakges, delete etc

create a secret for a repo:
Good for when you want to add a github action to build and push an image.
Only Github organization allow for namespace-wide secrets (see [issue #4136](https://github.com/orgs/community/discussions/4136)).

Most common commands I'm using


How to trigger a workflow
- list workflows
- trigger workflow: `gh workflow run <workflow name>`
  - You can also provide the tags manually etc, and there's a menu for selecting the workflow.

- view workflow runs: `gh run view`
  - You don't need to specify an item, gh will use an ncurses selection menu.




GITHUB_TOKEN
How to give write permissions