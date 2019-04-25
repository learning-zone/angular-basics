#!/usr/bin/env bash

# TODO
#===================
# provide a clean way to define/check the "current" version of node (i.e., the one we should execute the publish under/for)
## ideally we should read it from .nvmrc
# for local deployment, instead of using stark-ssh.enc, we should use the GITHUB_API_KEY key passed via --github-api-key=foo
## if present then we could push directly without handling decryption, etc

set -u -e -o pipefail

VERBOSE=false
TRACE=false
DRY_RUN=false
ENFORCE_SHOWCASE_VERSION_CHECK=true
TARGET_BRANCH="gh-pages"
COMMIT_HASH=`git rev-parse --verify HEAD`

TARGET_REPO="git@github.com:NationalBankBelgium/stark.git"
EXPECTED_REPO_SLUG="NationalBankBelgium/stark"
EXPECTED_NODE_VERSION="8"

COMMIT_AUTHOR_USERNAME="TravisCI"
COMMIT_AUTHOR_EMAIL="seb@dsebastien.net"

SSH_KEY_ENCRYPTED="stark-ssh.enc"
SSH_KEY_CLEARTEXT_FILE="stark-ssh"

STARK_CORE="stark-core"
STARK_UI="stark-ui"
SHOWCASE="showcase"
API_DOCS_DIR_NAME="api-docs"
LATEST_DIR_NAME="latest"

#----------------------------------------------
# Uncomment and adapt block below to test locally
#----------------------------------------------
#LOGS_DIR=./.tmp/stark/logs
#mkdir -p ${LOGS_DIR}
#touch ${LOGS_DIR}/build-perf.log
#DRY_RUN=true
#TRAVIS=true
#TRAVIS_NODE_VERSION="8"
#TRAVIS_COMMIT=${COMMIT_HASH}
#TRAVIS_REPO_SLUG="NationalBankBelgium/stark" # yes we're always on the correct repo
#ENFORCE_SHOWCASE_VERSION_CHECK=false # allows not have consistency between tag version and showcase version
#encrypted_4290e9054abd_iv="foo" # variable needed for the decryption of the SSH private key
#encrypted_4290e9054abd_key="bar" # variable needed for the decryption of the SSH private key

# Point to a fork or any other repo
#TARGET_REPO="git@github.com:dsebastien/stark.git"

# Avoid messing up Git config (even though limited to the current repo)
#COMMIT_AUTHOR_USERNAME="Sebastien Dubois"
#COMMIT_AUTHOR_EMAIL="seb@dsebastien.net"

# For PRs (NOT accepted)
#TRAVIS_EVENT_TYPE="pull_request"

# For nightly builds (NOT accepted)
#TRAVIS_PULL_REQUEST="false"
#TRAVIS_EVENT_TYPE="cron"

# For releases
#TRAVIS_PULL_REQUEST="false"
#TRAVIS_TAG="barFoo"
#TRAVIS_EVENT_TYPE="push"

#----------------------------------------------

readonly currentDir=$(cd $(dirname $0); pwd)

source ${currentDir}/scripts/ci/_travis-fold.sh
source ${currentDir}/util-functions.sh

cd ${currentDir}

logInfo "============================================="
logInfo "Stark docs publish @ github pages"

for ARG in "$@"; do
  case "$ARG" in
    --dry-run)
      logInfo "============================================="
      logInfo "Dry run enabled!"
      DRY_RUN=true
      ;;
    --verbose)
      logInfo "============================================="
      logInfo "Verbose mode enabled!"
      VERBOSE=true
      ;;
    --trace)
      logInfo "============================================="
      logInfo "Trace mode enabled!"
      TRACE=true
      ;;
    --github-api-key=*)
      logInfo "============================================="
      logInfo "Github API key provided"
      GITHUB_API_KEY=${ARG#--github-api-key=}
      ;;
    *)
      echo "Unknown option $ARG."
      exit 1
      ;;
  esac
done
logInfo "============================================="

PROJECT_ROOT_DIR=`pwd`
logTrace "PROJECT_ROOT_DIR: ${PROJECT_ROOT_DIR}" 1

ROOT_PACKAGES_DIR=${PROJECT_ROOT_DIR}/dist/packages-dist
logTrace "ROOT_PACKAGES_DIR: ${ROOT_PACKAGES_DIR}" 1

API_DOCS_SOURCE_DIR=${PROJECT_ROOT_DIR}/reports/${API_DOCS_DIR_NAME}
logTrace "API_DOCS_SOURCE_DIR: ${API_DOCS_SOURCE_DIR}"

SHOWCASE_SOURCE_DIR=${PROJECT_ROOT_DIR}/${SHOWCASE}/dist
logTrace "SHOWCASE_SOURCE_DIR: ${SHOWCASE_SOURCE_DIR}"

DOCS_WORK_DIR=${PROJECT_ROOT_DIR}/.tmp/ghpages
logTrace "DOCS_WORK_DIR: ${DOCS_WORK_DIR}" 1

logTrace "Cleaning the docs work directory..." 2
rm -rf ${DOCS_WORK_DIR}
mkdir -p ${DOCS_WORK_DIR}


travisFoldStart "docs publication checks" "no-xtrace"

if [[ ${TRAVIS} == true ]]; then
  logInfo "Publishing docs to GH pages";
  logInfo "============================================="

  # Don't even try if not running against the official repo
  # We don't want docs publish to run outside of our own little world
  if [[ ${TRAVIS_REPO_SLUG} != ${EXPECTED_REPO_SLUG} ]]; then
    logInfo "Skipping release because this is not the main repository.";
    exit 0;
  fi

  # Ensuring that this is the execution for Node x
  # Without this check, we would publish a release for each node version we test under! :)
  if [[ ${TRAVIS_NODE_VERSION} != ${EXPECTED_NODE_VERSION} ]]; then
    logInfo "Skipping release because this is not the expected version of node: ${TRAVIS_NODE_VERSION}"
    exit 0;
  fi

  logInfo "Verifying if this build has been triggered for a tag" 
  # Making sure the variables exist..
  if [[ -z ${TRAVIS_TAG+x} ]]; then
    TRAVIS_TAG=""
  fi

  if [[ -z ${TRAVIS_PULL_REQUEST+x} ]]; then
    TRAVIS_PULL_REQUEST=""
  fi

  if [[ ${TRAVIS_PULL_REQUEST} != "false" ]]; then
    logInfo "Not publishing because this is a build triggered for a pull request" 1
    exit 0;
  fi

  if [[ ${TRAVIS_EVENT_TYPE} == "cron" ]]; then
    logInfo "Not publishing because this is a build triggered for a nightly build" 1
    exit 0;
  fi

  if [[ ${TRAVIS_TAG} == "" ]]; then
    logInfo "Not publishing because this is not a build triggered for a tag" 1
    exit 0;
  else
    logInfo "OK, this build has been triggered for a tag"
  fi

  # Those keys are needed to decrypt the ${SSH_KEY_ENCRYPTED} file, which contains the SSH private key
  # that we'll use to push to GitHub pages!
  logInfo "Verifying that the necessary decryption keys are available"
  if [[ -z ${encrypted_4290e9054abd_iv+x} ]]; then
    encrypted_4290e9054abd_iv=""
  fi
  if [[ -z ${encrypted_4290e9054abd_key+x} ]]; then
    encrypted_4290e9054abd_key=""
  fi

  if [[ ${encrypted_4290e9054abd_iv} == "" ]]; then
    logInfo "Not publishing because the SSH key decryption IV is not available as environment variable" 1
    exit 0;
  else
    logTrace "SSH key decryption IV is available" 2
    ENCRYPTED_IV=${encrypted_4290e9054abd_iv}
  fi

  if [[ ${encrypted_4290e9054abd_key} == "" ]]; then
    logInfo "Not publishing because the SSH key decryption key is not available as environment variable" 1
    exit 0;
  else
    logTrace "SSH key decryption key is available" 2
    ENCRYPTED_KEY=${encrypted_4290e9054abd_key}
  fi

  # If any of the previous commands in the `script` section of .travis.yaml failed, then abort.
  # The variable is not set in early stages of the build, so we default to 0 there.
  # https://docs.travis-ci.com/user/environment-variables/
  if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
    logInfo "Skipping docs publication because a previous script in the Travis build has failed" 1
    exit 0;
  fi
else
  logInfo "Not publishing because we are not in Travis. Currently that is the only supported option!"
  exit 0
fi

travisFoldEnd "docs publication checks"


travisFoldStart "docs generation" "no-xtrace"

logInfo "Generating API docs"
npm run docs:all
logTrace "API docs generated successfully" 1

travisFoldEnd "docs generation" "no-xtrace"



travisFoldStart "docs publication" "no-xtrace"

logInfo "Publishing API docs"

logTrace "Determining target folders for api docs" 1

DOCS_VERSION=${TRAVIS_TAG}
SHOWCASE_PACKAGE_VERSION=$(node -p "require('./package.json').version")
#alternative (faster but less safe): SHOWCASE_PACKAGE_VERSION=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json) 

if [[ ${ENFORCE_SHOWCASE_VERSION_CHECK} == true ]]; then
    logTrace "Checking for version consistency between the tag and the showcase" 1
    if [[ ${DOCS_VERSION} != ${SHOWCASE_PACKAGE_VERSION} ]]; then
      logInfo "Cannot publish the documentation because the showcase version does not match the tagged version (tag name). Please update the showcase!"
      exit -1;
    fi
fi

logTrace "Version for which we are producing docs: ${DOCS_VERSION}"

if [[ ${TRAVIS} == true ]]; then
    logTrace "Configuring Git for Travis"
    git config user.name ${COMMIT_AUTHOR_USERNAME}
    git config user.email ${COMMIT_AUTHOR_EMAIL}
fi

logTrace "Cloning stark's github pages branch to ${DOCS_WORK_DIR}"

if [[ ${DRY_RUN} == false ]]; then
    logTrace "Decrypting the SSH private key"
    openssl aes-256-cbc -K ${ENCRYPTED_KEY} -iv ${ENCRYPTED_IV} -in ./${SSH_KEY_ENCRYPTED} -out ./${SSH_KEY_CLEARTEXT_FILE} -d
    chmod 600 ./${SSH_KEY_CLEARTEXT_FILE}
    logTrace "Decrypted the SSH private key"

    # to test the connection with GitHub using the decrypted key 
    # logTrace "Hi github.com!"
    # ssh -T git@github.com -i ./${SSH_KEY_CLEARTEXT_FILE}

    # we use our decrypted private SSH key
    logTrace "Setting SSH config"
    mv -f ./${SSH_KEY_CLEARTEXT_FILE} ~/.ssh
    mv -f ./ssh-config ~/.ssh/config
    logTrace "SSH config set"

    # these alternatives did not work
    # alias git="GIT_SSH_COMMAND='ssh -i ./${SSH_KEY_CLEARTEXT_FILE}' git"
    # git config core.sshCommand "ssh -i ./${SSH_KEY_CLEARTEXT_FILE}"

    # possible alternative:
    #eval `ssh-agent -s`
    #ssh-add ./${SSH_KEY_CLEARTEXT_FILE}
fi

git clone --quiet --depth=1 --branch=${TARGET_BRANCH} ${TARGET_REPO} ${DOCS_WORK_DIR}

logTrace "Copying the API docs"
API_DOCS_TARGET_DIR_STARK_CORE=${DOCS_WORK_DIR}/${API_DOCS_DIR_NAME}/${STARK_CORE}/${DOCS_VERSION}
API_DOCS_TARGET_DIR_STARK_CORE_LATEST=${DOCS_WORK_DIR}/${API_DOCS_DIR_NAME}/${STARK_CORE}/${LATEST_DIR_NAME}

API_DOCS_TARGET_DIR_STARK_UI=${DOCS_WORK_DIR}/${API_DOCS_DIR_NAME}/${STARK_UI}/${DOCS_VERSION}
API_DOCS_TARGET_DIR_STARK_UI_LATEST=${DOCS_WORK_DIR}/${API_DOCS_DIR_NAME}/${STARK_UI}/${LATEST_DIR_NAME}

SHOWCASE_TARGET_DIR=${DOCS_WORK_DIR}/${SHOWCASE}/${DOCS_VERSION}
SHOWCASE_TARGET_DIR_LATEST=${DOCS_WORK_DIR}/${SHOWCASE}/${LATEST_DIR_NAME}

syncOptions=(--archive --delete --ignore-errors --quiet --include="**/**") # we overwrite docs if they're present already for this version

logTrace "Copying ${STARK_CORE} API docs"
syncFiles ${API_DOCS_SOURCE_DIR}/${STARK_CORE} ${API_DOCS_TARGET_DIR_STARK_CORE} "${syncOptions[@]}"
syncFiles ${API_DOCS_SOURCE_DIR}/${STARK_CORE} ${API_DOCS_TARGET_DIR_STARK_CORE_LATEST} "${syncOptions[@]}"

logTrace "Copying ${STARK_UI} API docs"
syncFiles ${API_DOCS_SOURCE_DIR}/${STARK_UI} ${API_DOCS_TARGET_DIR_STARK_UI} "${syncOptions[@]}"
syncFiles ${API_DOCS_SOURCE_DIR}/${STARK_UI} ${API_DOCS_TARGET_DIR_STARK_UI_LATEST} "${syncOptions[@]}"

logTrace "Copying ${SHOWCASE}"

NODE_REPLACE_URLS="node ${PROJECT_ROOT_DIR}/${SHOWCASE}/ghpages-adapt-bundle-urls.js"

$NODE_REPLACE_URLS "${LATEST_DIR_NAME}"
syncFiles ${SHOWCASE_SOURCE_DIR} ${SHOWCASE_TARGET_DIR_LATEST} "${syncOptions[@]}"
$NODE_REPLACE_URLS "${DOCS_VERSION}" "${LATEST_DIR_NAME}"
syncFiles ${SHOWCASE_SOURCE_DIR} ${SHOWCASE_TARGET_DIR} "${syncOptions[@]}"

unset syncOptions

logInfo "Pushing the docs to GitHub pages"

cd ${DOCS_WORK_DIR}
git add -A &> /dev/null # way too long
git commit --quiet -m "Publishing docs for version: ${DOCS_VERSION}"
git push --quiet --force
cd - > /dev/null

# TODO: if a GITHUB_API_KEY was passed, then we should use it
#if [[ ${GITHUB_API_KEY} != "" ]]; then
#    logTrace "Using the provided GITHUB API KEY to push" 1
#    exit 0;
#fi

logInfo "Documentation published successfully!"

travisFoldEnd "docs publication"

# Print return arrows as a log separator
travisFoldReturnArrows
