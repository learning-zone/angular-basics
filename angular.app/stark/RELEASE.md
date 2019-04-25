# Releasing Stark

## Pre-reqs

### Local

On your local machine, you must configure the `GITHUB_TOKEN` environment variable.
It will be used by release-it to push to and create the release page on GitHub (cfr release:prepare section below).

### Travis

On Travis, the following should be configured:

-   NPM_TOKEN environment variable
    -   if 2FA is enabled for the account the only auth-only level can be used: https://docs.npmjs.com/getting-started/using-two-factor-authentication#levels-of-authentication
    -   that variable MUST NEVER be logged/exposed. If exposed then the token MUST be revoked and the account password changed ASAP

## Changelog

First of all: _Never_ edit CHANGELOG.md manually!

The changelog will be updated automatically as part of the release process and based on the commit log using conventional-changelog (https://github.com/conventional-changelog)
We use the Angular format for our changelog and for it to work properly, please make sure to respect our commit conventions (see CONTRIBUTING guide).

## Creating a release

Make sure that:

-   all changes have merged into master
-   everything is up to date locally
-   everything is clean locally
-   execute `npm run release`

Enjoy the show.

## Publishing the release on npm

Once you have pushed the tag, Travis will handle things from there.

Once done, you must make sure that the tags are adapted so that the "latest" tag still points to what we consider the latest (i.e., next major/minor)!
Refer to the "Adapting tags of published packages" section below.

## What happens once a release is triggered

### release

-   first we make sure that there are no local changes (if there are we stop right there)
-   then we execute release-it: https://github.com/webpro/release-it which
    -   bumps the version in the root package.json automatically (determines the bump type to use depending on the commit message logs)
        -   that version number will be used as basis in the build to adapt all other package.json files
    -   generates/updates the CHANGELOG.md file using: conventional-changelog: https://github.com/conventional-changelog
    -   commits both package.json and CHANGELOG.md
    -   creates a new git tag and pushes it
    -   creates a github release page and makes it final

After this, the release is tagged and visible on github

### documentation publish

#### What

Once the tag is pushed to GitHub, Travis picks it up and initiates a build.

Travis executes builds, tests, then executes `npm run docs:publish`.

That script makes some checks then, if all succeed it publishes the API docs of the different packages as well as the production build output of the showcase to Github pages.

#### How

Checks that are performed:

-   node version: should be "8"
-   TRAVIS_REPO_SLUG should be "NationalBankBelgium/stark"
-   TRAVIS_TAG should be defined and not empty (this is the case when Travis builds for a tag)
-   TRAVIS_PULL_REQUEST should be false
-   TRAVIS_BRANCH should be "master"
-   TRAVIS_EVENT_TYPE should be "cron" (i.e., not a nightly build or manual build)
-   encrypted\_... environment should be available (those have been created by encrypting our SSH key; cfr below!)

More details here: https://github.com/NationalBankBelgium/stark/issues/282

#### Security

The docs publication uses an SSH key that has write access to the Stark repository.
That key is available in the source code in encrypted form in the `stark-ssh` file.
That file actually corresponds to the private key of an SSH key-pair encrypted using the Travis CLI (details below).

#### Replacing the GitHub credentials (SSH key)

To replace the keys used by the docs publish script:

-   create a new SSH key pair: `ssh-keygen -t rsa -b 4096 -C "..."`
    -   call it `stark-ssh` for safety: that name is in the .gitignore list
-   associate the public key with the Stark repository as a "Deploy Key": https://developer.github.com/v3/guides/managing-deploy-keys/
-   encrypt the private key with the Travis CLI: `travis encrypt-file ./stark-ssh -r NationalBankBelgium/stark`
    -   that command will generate an encrypted version of the key
    -   make sure you're logged in (see next section)
    -   **IMPORTANT: on Windows the generation of the encrypted key produces a corrupted file. So you should generate it on a Linux system. See https://github.com/travis-ci/travis-ci/issues/4746**
-   save the encrypted file as `stark-ssh.enc` and get rid of the non-encrypted key directly

The command will also

-   store the (randomly generated) encryption key and initialization vector as (secure) Travis environment variables
-   provide the openssl command to use in the scripts to decrypt the stark-ssh.enc file; for example: `openssl aes-256-cbc -K $encrypted_e546efaa49e5_key -iv $encrypted_e546efaa49e5_iv -in stark-ssh.enc -out ./stark-ssh -d`.

The name of those variables will change each time it is used, therefore the `gh-deploy.sh` MUST also be adapted afterwards.

#### Installing the Travis CLI

Steps:

-   Install Ruby to get the `gem` command
-   Install Travis CLI with gem install travis
-   Login to Travis using GH credentials: travis login --org --github-token yourtoken
    -   `Successfully logged in as ...`
-   Have fun!

### npm packages publish

Finally, Travis executes `npm run release:publish`.

That script makes some checks then, if all succeed it publishes the different packages on npm.
Checks that are performed:

-   node version: should be "8"
-   NPM_TOKEN environment variable should be defined
-   TRAVIS_REPO_SLUG should be "NationalBankBelgium/stark"
-   TRAVIS_TAG should be defined and not empty (this is the case when Travis builds for a tag)

Other details can be found here: https://github.com/NationalBankBelgium/stark/issues/54

## Adapting tags of published packages

If a published version doesn't have all necessary tags, or if we want to adapt those for some reason (e.g., latest pointing to a patch release rather than the latest major/minor), then we can use the `npm dist-tag` command.
Reference: https://docs.npmjs.com/cli/dist-tag
