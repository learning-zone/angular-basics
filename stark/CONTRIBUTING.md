# Contributing to Stark

Stark has been created to fulfill the National Bank of Belgium's front-end development needs, but is now an open source project.

As such, third party contributions are more than welcome! Here you'll find all the information you need to get started.

We would love for you to contribute to Stark and make it better and better.
As a contributor, here are the guidelines we would like you to follow.

## Code of Conduct

Help us keep Stark open and inclusive. Please read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## Got a question or problem?

Ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/stark) where the questions should be tagged with tag `stark`

Stack Overflow is a much better place to ask questions since:

-   there are thousands of people willing to help on Stack Overflow
-   questions and answers stay available for public viewing so your question / answer might help someone else
-   Stack Overflow's voting system assures that the best answers are prominently visible.

You may also create GH issues with the "question" label. We'll do our best to help.

## Don't know where to start?

Take a look at the project's open [issues](https://github.com/NationalBankBelgium/stark/issues) and [milestones](https://github.com/NationalBankBelgium/stark/issues/milestones).
This contains tons of ideas to help us out.

## Found a bug?

If you feel like you've discovered a bug, then a GH issue is clearly the way to go, with a follow-up PR indeed ;-)

## Missing a feature?

You can _request_ a new feature by submitting an issue to our repository. If you would like to _implement_ a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

## Submission guidelines

### Submitting an issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we will systematically ask you to provide a minimal reproduction scenario using [Plunker](https://plnkr.co).
Having a live, reproductible scenario gives us a wealth of important information without going back & forth to you with additional questions like:

-   version of Stark & Angular used
-   3rd party libraries and their versions
-   and most importantly, a use-case that fails

A minimal reproduce scenario allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem. If plunker is not a suitable way to demonstrate the problem (for example for issues related to our npm packaging), please create a standalone git repository demonstrating the problem.

We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs.

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by filling out our [new issue form](https://github.com/NationalBankBelgium/stark/issues/new).

### Forking

Stark development is done using a forking model with Pull Requests (PRs), so the very first thing you should do is create your fork: https://help.github.com/articles/fork-a-repo/

We heavily recommend using the "GitFlow" workflow (see workflow section below) with feature branches.

### Integrating changes to your fork

Once you're found what you want to contribute to Stark, then:

-   Create a feature branch in your fork: `git checkout -b my-new-branch master`
-   Configure the upstream
    -   `git remote add upstream https://github.com/NationalBankBelgium/stark.git`
    -   reference: https://help.github.com/articles/configuring-a-remote-for-a-fork/

From then on, you may work on your feature at your own rhythm and commit/push to your fork.

Don't forget to write test cases (or adapt existing ones) for your changes!

### Keeping in sync

While you're busy developing your feature and before you propose them, make sure that your fork is up to date with the upstream.

First, download the latest commits:

-   `git fetch upstream`
-   or `git remote update -p`

Then, integrate those changes to your fork (whatever branch you're working on).

First try a fast-forward merge: `git merge --ff-only upstream/master`

-   that command tells git to merge the upstream branch ONLY if you local branch can be "fast forwarded" to the upstream branch (i.e., if it hasn't diverged)

If the fast-forward merge fails, then you'll have to rebase with the upstream (i.e., align): `git rebase -p upstream/master`

-   the `-p` options tells git to preserve merges. This prevents git from linearizing the commits being rebased

Once done, make sure the history looks like what you expect: `git log --graph --oneline --decorate --date-order --color --boundary upstream/master`

Certainly so before creating a Pull Request (PR). If you don't do it then we'll request it anyways.

References

-   https://stackoverflow.com/questions/6406762/why-am-i-merging-remote-tracking-branch-origin-develop-into-develop
-   https://help.github.com/articles/syncing-a-fork/

### Proposing your changes by submitting a Pull Request (PR)

Before you propose your changes, make sure that your fork is up to date with the upstream (see previous section) and that the whole test suite passes.

At this point, you'll probably want to do a rebase in order to squash your commits and align with our [commit message conventions](#commit) (you can always fix those during the rebase or using `git commit --amend ...`).

The idea there is to let you make as many commits as you want with or without respecting our commit message conventions, as long as you clean those when you're ready to send us a PR.

Once done, you may submit a new Pull Request (PR): https://github.com/NationalBankBelgium/stark/pull/new/master

Note that if you didn't follow this, we'll probably ask for a cleanup/rebase before we merge your changes.

### Committing with Commitizen

To help you respect our [commit message conventions](#commit), you can use [Commitizen](https://github.com/commitizen/cz-cli).
Instead of running `git commit`, use `npm run commit`.
You'll be prompted to fill in any required fields and your commit message will be formatted according to our guidelines.

You can still use `git commit`, but be sure to follow the guidelines, otherwise [Commitlint](https://github.com/marionebl/commitlint) will throw an error during your commit.

### Workflow

As mentioned above, we recommend using the GitFlow inspired workflow. That workflow was initially proposed here: https://datasift.github.io/gitflow/IntroducingGitFlow.html
There a great introduction tutorial by Atlassian: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

More recently, git flow was integrated through git extensions: https://github.com/nvie/gitflow
Now, `git flow` commands are integrated at least in the Windows client and allow for easy usage.

First, here's a very useful cheatsheet about the git flow commands: https://danielkummer.github.io/git-flow-cheatsheet/

Here's a summary of the workflow we recommend to contribute to Stark along with the commands to use. Note that this only uses a subset of what git flow has to offer.

You'll notice that we sometimes give a `git flow ...` command and alternative commands without git flow.

Workflow and commands:

-   fork: through GitHub
-   clone: `git clone https://github.com/<username>/stark`
-   add upstream: `git remote add upstream https://github.com/NationalBankBelgium/stark`
    -   that way you can fetch new commits that have been integrated into Stark's main repository
-   initialize git flow: `git flow init -d`
    -   you now have a develop branch
    -   -d for default branch names (develop, master, feature/, release/, hotfix/)
-   push your local develop branch to your fork
    -   `git checkout develop`
    -   `git push -u origin develop`
    -   that you can integrate anything you like on your fork's develop branch (e.g., for integration checks)
-   create a feature branch for whatever you want to work on
    -   `git flow feature start <name>`
    -   alternative: `git checkout -b feature/<name>`
    -   you may include a specific issue number in the branch name (e.g., 24-awesome-feature)
-   publish the feature branch on your fork
    -   `git flow feature publish <name>`
    -   alternative: `git push -u origin feature/<name>`
-   work on your feature branch
    -   checkout the branch: `git checkout feature/<name>`
    -   make changes: `git add ...` then `git commit -m '...'`
    -   regularly commit the changes: `git commit -a -m 'refactor(core): made it great again'`
-   push the changes to your fork's corresponding feature branch: `git push`
-   update your fork/feature branch with upstream changes
    -   first fetch the changes: `git fetch upstream`
        -   alternative: `git remote update -p`
    -   then merge or rebase
        -   try fast-forward merge: `git merge --ff-only upstream/master`
        -   rebase if fast-forward failed: `git rebase -p upstream/master`
    -   see "Keeping in sync" section for details!
-   create your Pull Request (PR); see "Proposing your changes by submitting a Pull Request (PR)" for details

Sometimes you might want to work with others on some feature.

If you're the one others will collaborate with, then make sure to publish your feature branch on your fork:

-   create a feature branch to work on changes for that feature: `git flow feature start <name>`
-   publish the feature branch on your fork: `git flow feature publish <name>`
-   make changes: `git add ...` then `git commit -m '...'`
-   push the changes to your fork's corresponding feature branch: `git push`

If you're helping another developer implement a feature, then, assuming he has published his feature branch on his fork:

-   add the other developer's fork as a remote: `git remote add <username> https://github.com/<username>/stark`
-   fetch their changes: `git fetch <username>`
-   create your own corresponding feature branch; assuming he has created `<username>/feature/<name>` then
    -   `git checkout -b <name> feature/<name>`
-   publish your version of the feature branch on your fork
    -   `git flow feature publish <name>`
    -   alternative: `git push -u origin feature/<name>`
-   make changes
-   push the changes to your fork's corresponding feature branch
-   create PRs towards the other developer's repository for him to integrate your changes
-   once they merge your PR, you should remove your feature branch and forget about it: `git branch -d feature/<name>`

An alternative to the above is for the other developer to give you write access to his fork; there the issue is if he does a rebase on his fork; in that case you'll have issues.
If you go that way then you have to:

-   clone the repository of the other developer or just checkout the other developer's feature branch to work on it: `git checkout -b workflow <username>/feature/<name>`
-   make changes
-   push the changes
-   sync your local repo with the main repository of Stark
-   create PRs against the main repository of Stark (or let the other developer do it)

In any case, after PRs are merged into Stark, you can normally forget about the feature branches and delete those to keep your fork clean

-   `git branch -d feature/<name>`

_It's important to keep in mind that anytime you want to continue working on an ongoing feature branch or start a new one, you'll need to fetch from upstream and merge (fast-forward) or rebase. Without this, you'll quickly fall out of sync and end up with nightmarish merges..._

Also, consider your fork to be transient. If you get lost at some point, then you can always rebase and accept everything from the upstream. If you still get lost with that and can't go back to a clean state, then just shelve your changes or create a patch file, then delete your fork/local repo and start over :)

Rinse and repeat :)

## Main project's structure

TODO add project structure details

## Building from source

If you want to build Stark from source, you need to...

-   install NodeJS (6.0.0+) and npm (5.3.0+)
-   clone this git repository: `git clone https://github.com/NationalBankBelgium/stark.git`
-   run `npm install` from the root directory of Stark
-   run `npm run install:all` from the root directory of Stark (this command will also install and build all Stark packages)

### Executing Stark's main build script

Anytime you make modifications to a Stark package (e.g., stark-build, stark-core, ...), you'll need to

-   execute `npm run build` from the root directory of Stark
-   execute `npm install` again on the showcase to get those changes
-   execute `npm install` again on the starter to get those changes

Stark's main build script is a fun Bash shell script heavily inspired by Angular's that

-   typechecks all Stark packages
-   transpiles all Stark packages
-   generates umd, esm5, ... bundles
-   minifies the bundles
-   generates sourcemaps
-   generates releasable versions of each package
-   adds license banners to the generated code
-   generates temporary tar.gz files for local testing
-   adapts the showcase's dependencies to point to the local tar.gz files
-   adapts the starter's dependencies to point to the local tar.gz files
-   ...

### Hacking the showcase

If you want to modify the showcase:

-   go to the showcase's folder: `cd showcase`
-   install dependencies: `npm install`
-   run it: `npm start`
-   open up your browser at http://localhost:3000
-   make your changes

If you make modifications, they'll be applied automatically after a Webpack rebuild.

By default the showcase depends on published Stark packages over at npm.
But once the main build script at Stark's root (cfr previous section) is executed (e.g., using `npm install` or `npm run build` at the root), then the showcase will depend on the contents of the dist folder.

#### Modifying the news html file in the showcase

To display news about **new releases of Stark**, a static html file, `new.component.html` can be modified.
That file can be found at the following location:

```txt
+---showcase
|   +---src
|   |   +---app
|   |   |   +---news
|   |   |   |   +---news.component.html
...
```

To add a news, just do as follows:

```
<news-item [release]="'x.x.x'" [newsDate]="'xx/xx/xxxx'">
	<div class="news-item-title">Write your news title here</div>
	<div class="news-item-content">
		Your contente will be written here<br>
		This div is used to write text only<br>
	</div>
	<div class="news-item-image">
		<img class="my-news-image">
		If your news is going to contain an image,
		you can add it here and indicates it's source in the `news.component.scss` file as below.
	</div>
</news-item>
```

Make sure to adapt the image's size for the screen that will display the news. For example, to set the size for a tablet screen, define
your image size as follows in the `news.component.scss` file:

```
@media #{$tablet-only-query}{
 .my-news-image {
    background-image: url("/assets/images/screenshots/my-example.png");
    background-size: cover;
    width: xxx;
    height: xxx;
  }
}
```

Don't forget to indicate the correct class to use for your elements in the html file, otherwise they won't be displayed.

### Hacking the starter

If you want to modify the starter:

-   go to the starter's folder: `cd starter`
-   install dependencies: `npm install`
-   run it: `npm start`
-   open up your browser at http://localhost:3000
-   make your changes

If you make modifications, they'll be applied automatically after a Webpack rebuild.

By default the starter depends on published Stark packages over at npm.
But once the main build script at Stark's root (cfr previous section) is executed (e.g., using `npm install` or `npm run build` at the root), then the starter will depend on the contents of the dist folder.

### Hacking the Stark packages

If you want to modify Stark packages (e.g., stark-build, stark-core, ...):

-   go to the package folder. `cd packages/<name>`
-   install its dependencies: `npm install`
-   make your changes
-   execute `npm run build` at Stark's root
-   update the Showcase and add examples to it / adapt existing code if needed

Start hacking :)

If you want to test/validate your changes against the starter, then you can use the following scripts from the root:

-   rebuild: `npm run build`
-   update the starter: `npm run update-starter`
-   run the starter: `npm run starter`

If you want to integrate examples or update code in the showcase and validate your changes, then you can use the following scripts from the root:

-   rebuild: `npm run build`
-   update the showcase: `npm run update-showcase`
-   run the showcase: `npm run showcase`

If you only want to build a subset of stark then you can

-   execute one of the `build:stark-<name>` npm scripts; for example: `npm run build:stark-core` or `npm run build:stark-build`
-   execute the `build` script through npm with the list of packages to build: `npm run build -- --packages=stark-core`
-   execute the build script from the command line: `bash ./build.sh --packages=stark-core`
-   **IMPORTANT: on MAC OS you may get the error: `sed: illegal option -- r`. The solution is to install `gnu-sed` (see https://www.gnu.org/software/sed/) with the command `brew install gnu-sed --with-default-names` (see https://stackoverflow.com/a/34815955)**

## Executing test suites

Anytime you integrate or modify features, you need to make sure the relevant test suites still pass.
You can execute the tests for all Stark parts using the following command at the root: `npm test`

## Cleaning up the project / packages

### Cleaning up dist folders

If you want to clean up the generated dist folders, you can

-   execute one of the `clean:stark-<name>` npm scripts; for example: `npm run clean:stark-core` or `npm run clean:stark-build`
-   navigate to the package folder and run the `clean` npm script; for example: `npm run clean`
-   execute the `clean:all` npm script to clean up every dist folder in your project; for example: `npm run clean:all`

### Cleaning up node_modules folder and package-lock.json

If you want to clean up completely the installed node_modules and reinstall later on from scratch (without the package-lock.json file), you can

-   execute one of the `clean:modules:stark-<name>` npm scripts; for example: `npm run clean:modules:stark-core` or `npm run clean:modules:stark-build`
-   navigate to the package folder and run the `clean:modules` npm script; for example: `npm run clean:modules`
-   execute the `clean:modules:all` npm script to clean up every modules files in your project; for example: `npm run clean:modules:all`

## Documentation

### API docs

The API documentation for packages like stark-core, stark-ui... is generated by [compodoc](https://compodoc.app).
We care a lot about the quality of our docs and for this reason, it's important to make sure that you provide [JSDoc](http://usejsdoc.org/) tags with your code.
You can build & serve the API docs in watch mode using this script for example: `npm run docs:stark-core:serve`. By doing so, you can quickly iterate between adapting the code and going back to the API docs to check the results.

You can also focus on the coverage using `npm run docs:stark-core:coverage`.

Compodoc provides some documentation about the supported JSDoc tags:

-   https://compodoc.app/guides/jsdoc-tags.html
-   https://compodoc.app/guides/comments.html

With each release of Stark (including nightly builds), we will also publish our API documentation.

### Developer guide and examples

Coming soon...

## Releasing a version

See [this page](/RELEASE.md)

## <a name="commit"></a> Commit Message Guidelines

We have precise rules over how our git commit messages can be formatted. This leads to **more readable messages** that are easy to follow when looking through the **project history**.
We also use the git commit messages to generate our changelog.

We're using Angular's commit message format: `type(scope): subject`

#### Type

Must be one of the following:

-   **feat**: A new feature
-   **fix**: A bug fix
-   **docs**: Documentation only changes
-   **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   **refactor**: A code change that neither fixes a bug nor adds a feature
-   **perf**: A code change that improves performance
-   **test**: Adding missing tests
-   **build**: Changes that affect the build system or external dependencies
-   **ci**: Changes to our CI configuration files and scripts
-   **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
-   **revert**: Reverts a previous commit

#### Scope

Must be one of the following:

-   **core**
-   **ui**
-   **test**
-   **build**
-   **accessibility**
-   **build-main**
-   **developer-guide**
-   **docs**
-   **qa**
-   **stark-all**
-   **stark-build**
-   **stark-core**
-   **stark-demo**
-   **stark-showcase**
-   **stark-starter**
-   **stark-rbac**
-   **stark-ui**
-   **testing**

If the scope you want to specify is not in the list, you can ask to add it or add it in the commitlint
configuration file (`commitlint.config.js`) in the root.

#### Subject

The subject contains succinct description of the change:

-   use the imperative, present tense: "change" not "changed" nor "changes"
-   do not capitalize first letter
-   do not place a period `.` at the end
-   entire length of the commit message must not go over 50 characters
-   describe what the commit does, not what issue it relates to or fixes
-   **be brief, yet descriptive** - we should have a good understanding of what the commit does by reading the subject

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
[reference GitHub issues that this commit closes](https://help.github.com/articles/closing-issues-via-commit-messages/).

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

## Examples

Here are some commit examples:

```
feat($browser): onUrlChange event (popstate/hashchange/polling)

Added new event to $browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

```
fix($compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
```

```
feat(directive): ng:disabled, ng:checked, ng:multiple, ng:readonly, ng:selected

New directives for proper binding these attributes in older browsers (IE).
Added coresponding description, live examples and e2e tests.

Closes #351
```

```
style($location): add couple of missing semi colons
```

```
docs(guide): updated fixed docs from Google Docs

Couple of typos fixed:
- indentation
- batchLogbatchLog -> batchLog
- start periodic checking
- missing brace
```

```
feat($compile): simplify isolate scope bindings

Changed the isolate scope binding options to:
  - @attr - attribute binding (including interpolation)
  - =model - by-directional model binding
  - &expr - expression execution binding

This change simplifies the terminology as well as
number of choices available to the developer. It
also supports local name aliasing from the parent.

BREAKING CHANGE: isolate scope bindings definition has changed and
the inject option for the directive controller injection was removed.

To migrate the code follow the example below:

Before:

scope: {
  myAttr: 'attribute',
  myBind: 'bind',
  myExpression: 'expression',
  myEval: 'evaluate',
  myAccessor: 'accessor'
}

After:

scope: {
  myAttr: '@',
  myBind: '@',
  myExpression: '&',
  // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
  myAccessor: '=' // in directive's template change myAccessor() to myAccessor
}

The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```
