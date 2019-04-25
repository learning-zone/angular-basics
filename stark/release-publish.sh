#!/usr/bin/env bash

# TODO
#===================
# provide a clean way to define/check the "current" version of node (i.e., the one we should execute the publish under/for)
## ideally we should read it from .nvmrc
# provide support for publishing only a subset of the packages (same --packages logic as in build.sh)
# provide support for publishing locally in addition to travis

set -u -e -o pipefail

VERBOSE=false
TRACE=false
DRY_RUN=false

# We read from a file because the list is also shared with build.sh
# Not using readarray because it does not handle \r\n
OLD_IFS=$IFS # save old IFS value
IFS=$'\r\n' GLOBIGNORE='*' command eval 'ALL_PACKAGES=($(cat ./modules.txt))'
IFS=$OLD_IFS # restore IFS

EXPECTED_REPO_SLUG="NationalBankBelgium/stark"
EXPECTED_NODE_VERSION="8"

#----------------------------------------------
# Uncomment block below to test locally
#----------------------------------------------
#LOGS_DIR=./.tmp/stark/logs
#mkdir -p ${LOGS_DIR}
#touch ${LOGS_DIR}/build-perf.log
#NPM_TOKEN="dummy"
#TRAVIS=true
#TRAVIS_REPO_SLUG="NationalBankBelgium/stark"
#TRAVIS_NODE_VERSION="8"

# For normal builds:
#TRAVIS_EVENT_TYPE="pull_request"
#TRAVIS_TAG="fooBar"

# For nightly builds:
#TRAVIS_EVENT_TYPE="cron"
#----------------------------------------------

NIGHTLY_BUILD=false

readonly currentDir=$(cd $(dirname $0); pwd)

source ${currentDir}/scripts/ci/_travis-fold.sh
source ${currentDir}/util-functions.sh

cd ${currentDir}

logInfo "============================================="
logInfo "Stark release publish @ npm"

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
    --nightly)
      logInfo "============================================="
      logInfo "Nightly build!"
      NIGHTLY_BUILD=true
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

travisFoldStart "publish checks" "no-xtrace"

if [[ ${TRAVIS} == true ]]; then
  logInfo "Publishing to npm";
  logInfo "============================================="
  
  # Don't even try if not running against the official repo
  # We don't want release to run outside of our own little world
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
  # Making sure the variable does exist.. 
  if [[ -z ${TRAVIS_TAG+x} ]]; then
    TRAVIS_TAG=""
  fi
  
  if [[ ${TRAVIS_PULL_REQUEST} != "false" ]]; then
    logInfo "Not publishing because this is a build triggered for a pull request" 1
    exit 0;
  elif [[ ${TRAVIS_EVENT_TYPE} == "cron" ]]; then
    logInfo "Nightly build initiated by Travis cron job" 1
    NIGHTLY_BUILD=true
  elif [[ ${TRAVIS_TAG} == "" ]]; then
    logInfo "Not publishing because this is not a build triggered for a tag" 1
    exit 0;
  else
    logInfo "This build has been triggered for a tag" 
  fi
  
  logInfo "Verifying that the NPM_TOKEN is available"
  if [[ -z ${NPM_TOKEN+x} ]]; then
    NPM_TOKEN=""
  fi

  if [[ ${NPM_TOKEN} == "" ]]; then
    logInfo "Not publishing because the NPM_TOKEN environment variable is is not defined correctly" 1
    exit 0;
  fi
  
  # If any of the previous commands in the `script` section of .travis.yaml failed, then abort.
  # The variable is not set in early stages of the build, so we default to 0 there.
  # https://docs.travis-ci.com/user/environment-variables/
  if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
    logInfo "Skipping release because a previous script in the Travis build has failed";
    exit 0;
  fi
fi

travisFoldEnd "publish checks"

travisFoldStart "publish" "no-xtrace"
logInfo "Publishing all packages"

for PACKAGE in ${ALL_PACKAGES[@]}
do
  travisFoldStart "publishing: ${PACKAGE}" "no-xtrace"
    PACKAGE_FOLDER=${ROOT_PACKAGES_DIR}/${PACKAGE}
    logTrace "Package path: ${PACKAGE_FOLDER}" 2
    cd ${PACKAGE_FOLDER}
    TGZ_FILES=`find . -maxdepth 1 -type f | egrep -e ".tgz"`;
    for file in ${TGZ_FILES}; do
      logInfo "Publishing TGZ file: ${TGZ_FILES}" 2
      if [[ ${DRY_RUN} == false ]]; then
        if [[ ${NIGHTLY_BUILD} == false ]]; then
          logTrace "Publishing the release (with tag latest)" 2
          npm publish ${file} --access public
        else
          logTrace "Check if nightly build is not already published."
          LATEST_NPM_VERSION=`npm view @nationalbankbelgium/${PACKAGE} dist-tags.next`
          FILENAME_LATEST_NPM_PACKAGE="./nationalbankbelgium-${PACKAGE}-${LATEST_NPM_VERSION}.tgz"
        
          if [[ ${file} != ${FILENAME_LATEST_NPM_PACKAGE} ]]; then
            logTrace "Publishing the nightly release (with tag next)" 2
            npm publish ${file} --access public --tag next
          else
            logTrace "Package cannot be published because it is already published." 2
          fi
        fi
      else
        logTrace "DRY RUN, skipping npm publish!" 2
      fi
      logInfo "Package published!" 2
    done
    cd - > /dev/null; # go back to the previous folder without any output  
  travisFoldEnd "publishing: ${PACKAGE}"
done

travisFoldEnd "publish"

# Print return arrows as a log separator
travisFoldReturnArrows
