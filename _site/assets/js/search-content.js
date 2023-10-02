window.store = {
  
  
  
  
    "2023-08-17-multi-arch-docker-builds-html": {
      "title": "Multi-arch Docker Builds",
      "author": "markolenik",
      "category": "",
      "content": "In the process of developing a solid reproducible research pipeline for R, I was surprised to learn that robust reproducibility requires multi-arch Docker builds.\nI was even more surprised to learn that building multi-arch Docker images is not as straightforward as I had hoped.\nHere’s is a summary of my findings.\n\nMulti-arch images\nMost of my prototyping is done on a Macbook Pro with an M1 processor (ARM64 chip), compute intensive tasks are run on an Intel Xeon server (AMD64 chip).\nWhen building with docker build . docker will build an image for the architecture of the host machine.\nThis means that if I build an image on my M1 Macbook Pro, the image will not run on the Intel Xeon server, which is a problem.\n\nThe solution is multi-arch images.\nA multi-arch image uses a so called “manifest” that contains the image for each architecture.\nWhen the multi-arch image is pulled, docker will automatically select the correct image for the architecture of the host machine.\n\nHow to build multi-arch images\nThere are two ways to build multi-arch images, use Docker’s buildx, or manually build and push the image for each architecture.\n\nBuildx approach\nThe buildx method is the easier of the two, it builds and pushes the multi-arch image in a single command, and the images for each architecture are built in concurrently.\nIt requires a builder that supports multi-arch, which can be created with\ndocker buildx create --name multi-arch-builder --bootstrap --use\n\nBuilding and pushing the multi-arch image is then done with a single command:\ndocker buildx build --push --platform linux/arm64,linux/amd64 -t &lt;registry&gt;/&lt;namespace&gt;/&lt;package&gt;:&lt;tag&gt; .\n\nI encountered a couple issues with this method, which is why right now I prefer the old and manual approach.\n\n  Currently the buildx method requires that building and pushing happens in a single command (see this issue).\n  There’s no automatic caching of intermediate layers.\nEven if your build succeeds but the push fails, you have to start from scratch.\nThere’s a manual workaround for this, but it’s not ideal (see this discusssion).\n  Podman doesn’t support multi-arch buildx yet (which might change in the future).\n\n\nManual approach\nThe old and manual approach works with both Docker and Podman.\nIt involves the following steps:\n\n  Build the image for each architecture.\n  Push the image for each architecture.\n  Create a manifest that contains both images.\n  Push manifest to the registry.\n\n\nBuilding for both ARM64 and AMD64 can be done with the following commands:\n# Build images\ndocker build --platform linux/arm64 -t &lt;registry&gt;/&lt;namespace&gt;/&lt;package&gt;:&lt;tag&gt;-arm64 .\ndocker build --platform linux/amd64 -t &lt;registry&gt;/&lt;namespace&gt;/&lt;package&gt;:&lt;tag&gt;-amd64 .\n\n# Push images\ndocker push &lt;registry&gt;/&lt;namespace&gt;/&lt;package&gt;:&lt;tag&gt;-arm64\ndocker push &lt;registry&gt;/&lt;namespace&gt;/&lt;package&gt;:&lt;tag&gt;-amd64\n\n# Create manifest\ndocker manifest create &lt;registry&gt;/&lt;namespace&gt;/&lt;package&gt;:&lt;tag&gt; &lt;registry&gt;/&lt;namespace&gt;/&lt;package&gt;:&lt;tag&gt;-arm64 &lt;registry&gt;/&lt;namespace&gt;/&lt;package&gt;:&lt;tag&gt;-amd64\n\n# Push manifest\ndocker manifest push &lt;registry&gt;/&lt;namespace&gt;/&lt;package&gt;:&lt;tag&gt;\n\n\nReferences\n\n  https://www.thorsten-hans.com/how-to-build-multi-arch-docker-images-with-ease/\n  https://www.docker.com/blog/how-to-rapidly-build-multi-architecture-images-with-buildx/\n\n",
      "url": "/2023/08/17/multi-arch-docker-builds.html"
    }
    ,
  
    "2023-08-20-github-actions-github-token-html": {
      "title": "Using GITHUB_TOKEN in GitHub workflows",
      "author": "markolenik",
      "category": "",
      "content": "Today, I was learning about GitHub Actions and wanted to set up a workflow that builds and pushes an image to the GitHub registry as a package.\nHowever, pushing images requires write permission, which I used to add in the past using a custom token via GitHub’s “secrets” feature.\nFor example, I would use the command gh secret set GH_TOKEN, and within my workflow, I could access it using the variable secrets.GH_TOKEN.\nThis approach required adding an explicit secret for each repository, which had some overhead.\n\nA more convenient solution is to use the GITHUB_TOKEN variable, which is a built-in token provided by GitHub with repo-scope permission.\nBy default, it only has read permissions, but for pushing images, it needs write permission.\nI changed this option in the repository’s settings menu under “Actions/Workflow permissions” to “Read and write permission”1.\n\nNow I can simply use the token everywhere a password is required.\nFor example to login to ghcr I can do:\n...\n\n    steps:\n      - name: Login to GHCR\n        uses: docker/login-action@v2\n        with:\n          registry: ghcr.io\n          username: ${{ github.repository_owner }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n\n\n\n\n  \n    \n      I’d like to change that option using a Github CLI command, e.g. gh ..., but I couldn’t find one. &#8617;\n    \n  \n\n",
      "url": "/2023/08/20/github-actions-github-token.html"
    }
    ,
  
    "2023-08-23-math-in-latex-headings-html": {
      "title": "Math in LaTeX headings",
      "author": "markolenik",
      "category": "",
      "content": "I often need math in my LaTeX headings.\nThis is a problem because headings are used in the table of contents, where math can’t be properly rendered.\nchktex also complains about math in headings and throws the error:\nToken not allowed in a PDF string (Unicode)\n\n\nThe fix is to provide a “plain text” version of the heading for the PDF table of contents as an option, for example:.\n\n\\section[The Logistic Map: x_{n+1} = r x_n (1 - x_n)]{The Logistic Map: $x_{n+1} = r x_n (1 - x_n)$}\n\n\nResources\n\n  User BRBoer on r/LaTeX\n\n",
      "url": "/2023/08/23/math-in-latex-headings.html"
    }
    ,
  
    "2023-09-24-riding-the-rollercoaster-of-r-s-single-dispatch-html": {
      "title": "Riding the Rollercoaster of R&apos;s Single Dispatch",
      "author": "markolenik",
      "category": "",
      "content": "Navigating the R language and its idiosyncratic single dispatch system can feel like a thrilling theme park ride. The syntax is akin to a treasure chest - full of surprises. Let’s embark on a journey that introduces a new dispatch to the stats::predict function.\n\nR operates on a system known as S3 for single dispatch. When you summon a generic function like predict, R dispatches to the specific method that aligns with the class of the input object. For instance, predict.lm for linear models and predict.glm for generalized linear models.\n\nHere’s your map to adding a custom predict function that always return 1 and works on a new class myModel:\n\n# Craft a simple \"myModel\" class\nmyModel &lt;- function(formula, data) {\n    class(lm_model) &lt;- \"myModel\"\n    return(lm_model)\n}\n\n# Carve out a new predict method for \"myModel\"\npredict.myModel &lt;- function(object, newdata) {\n    # In this example, we'll just always return 1\n    return(1)\n}\n\n# Define our model\nmodel_mymodel = myModel(mpg ~ cyl, mtcars)\n\n# With our model\npredict(model_mymodel, mtcars)\n\n\nThe head-spinning part is that the first word after the . designates the class of the object for the single dispatch. And it gets even more crazy when you consider that R allows for dots pretty much everywhere. So don’t mistake the data.frame to be a form of single dispatch, it’s just an ordinary function call.\n\nNow let’s shift gears and explore Julia, which handles single (and multiple) dispatch with poise and elegance.\n\n# Define a function for adding two integers\nf(x::Int, y::Int) = x + y\n\n# Define a function for concatenating two strings\nf(x::String, y::String) = string(x, y)\n\n# Usage:\nprintln(f(2, 3)) # prints \"5\"\nprintln(f(\"Hello, \", \"World!\")) # prints \"Hello, World!\"\n\n\nThis article isn’t intended to critique R in favor of Julia. In fact, I’m warming up to R, especially when it comes to writing code (though reading code still feels like deciphering hieroglyphics). But there’s always room for improvement.\n\n",
      "url": "/2023/09/24/riding-the-rollercoaster-of-r&apos;s-single-dispatch.html"
    }
    ,
  
    "2023-09-24-understanding-r-formulas-html": {
      "title": "Understanding R Formulas",
      "author": "markolenik",
      "category": "",
      "content": "Why is the formula x ~ (y + z)^2 equivalent to x ~ y*z?\nHere are the exact transformation steps:\n\n  Step 1: Start with the formula x ~ (y + z)^2 and take the square, we get y^2 + z^2 + 2*y*z.\n  Step 2: In R, the square of a term in a formula (like y^2 or z^2) just refers to the term itself. So, y^2 becomes y and z^2 becomes z. Now, the formula is x ~ y + z + 2*y*z.\n  Step 4: The coefficient 2 in front of the interaction term y*z doesn’t change the nature of the interaction, so it is dropped. Now, the formula is x ~ y + z + y*z.\n  Step 5: Since y*z is a shorthand for y+z+y:z, we get x ~ 2y + 2z+ y:z. Again we can get rid of the coefficients, which simplifies to x ~ y + z + y:z, i.e. x ~ y*z.\n\n",
      "url": "/2023/09/24/understanding-r-formulas.html"
    }
    
  
}