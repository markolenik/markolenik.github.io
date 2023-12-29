---
layout: post
title:  "Multi-arch Docker Builds"
date:   2023-08-17 17:14:00 +0200
author: markolenik
---

In the process of developing a solid reproducible research pipeline for R, I was surprised to learn that robust reproducibility requires multi-arch Docker builds.
I was even more surprised to learn that building multi-arch Docker images is not as straightforward as I had hoped.
Here's is a summary of my findings.

#  Multi-arch images
Most of my prototyping is done on a Macbook Pro with an M1 processor (ARM64 chip), compute intensive tasks are run on an Intel Xeon server (AMD64 chip).
When building with `docker build .` docker will build an image for the architecture of the host machine.
This means that if I build an image on my M1 Macbook Pro, the image will not run on the Intel Xeon server, which is a problem.

The solution is multi-arch images.
A multi-arch image uses a so called "manifest" that contains the image for each architecture.
When the multi-arch image is pulled, docker will automatically select the correct image for the architecture of the host machine.

# How to build multi-arch images
There are two ways to build multi-arch images, use Docker's `buildx`, or manually build and push the image for each architecture.

## Buildx approach
The `buildx` method is the easier of the two, it builds and pushes the multi-arch image in a single command, and the images for each architecture are built in concurrently.
It requires a builder that supports multi-arch, which can be created with
```
docker buildx create --name multi-arch-builder --bootstrap --use
```
Building and pushing the multi-arch image is then done with a single command:
```
docker buildx build --push --platform linux/arm64,linux/amd64 -t <registry>/<namespace>/<package>:<tag> .
```
I encountered a couple issues with this method, which is why right now I prefer the old and manual approach.
1. Currently the `buildx` method requires that building and pushing happens in a single command (see [this issue](https://github.com/docker/buildx/issues/1152)).
2. There's no automatic caching of intermediate layers.
Even if your build succeeds but the push fails, you have to start from scratch.
There's a manual workaround for this, but it's not ideal (see [this discusssion]( https://github.com/docker/buildx/discussions/1382)).
3. Podman doesn't support multi-arch `buildx` yet (which might change in the future).

## Manual approach
The old and manual approach works with both Docker and Podman.
It involves the following steps:
1. Build the image for each architecture.
2. Push the image for each architecture.
3. Create a manifest that contains both images.
4. Push manifest to the registry.

Building for both `ARM64` and `AMD64` can be done with the following commands:
```
# Build images
docker build --platform linux/arm64 -t <registry>/<namespace>/<package>:<tag>-arm64 .
docker build --platform linux/amd64 -t <registry>/<namespace>/<package>:<tag>-amd64 .

# Push images
docker push <registry>/<namespace>/<package>:<tag>-arm64
docker push <registry>/<namespace>/<package>:<tag>-amd64

# Create manifest
docker manifest create <registry>/<namespace>/<package>:<tag> <registry>/<namespace>/<package>:<tag>-arm64 <registry>/<namespace>/<package>:<tag>-amd64

# Push manifest
docker manifest push <registry>/<namespace>/<package>:<tag>
```

# References
* <https://www.thorsten-hans.com/how-to-build-multi-arch-docker-images-with-ease/>
* <https://www.docker.com/blog/how-to-rapidly-build-multi-architecture-images-with-buildx/>