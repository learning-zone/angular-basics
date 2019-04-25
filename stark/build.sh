#!/usr/bin/env bash

# TODO
#===================
# add banner to all relevant files
# remove config-stark exclude once gone
# make sure fonts and images are not touched by addBanners

set -u -e -o pipefail

readonly currentDir=$(cd $(dirname $0); pwd)

export NODE_PATH=${NODE_PATH:-}:${currentDir}/node_modules

source ${currentDir}/scripts/ci/_travis-fold.sh
source ${currentDir}/util-functions.sh
source ${currentDir}/build-functions.sh

cd ${currentDir}

# List of all packages, separated by a space
# Packages will be transpiled using NGC (unless if also part of NODE_PACKAGES like the build package)
PACKAGES=(stark-core stark-ui)

# Packages that should not be compiled by NGC but just with TSC
TSC_PACKAGES=()

# Packages that should not be compiled at all
NODE_PACKAGES=(stark-build stark-testing)

# We read from a file because the list is also shared with release-publish.sh
# Not using readarray because it does not handle \r\n
OLD_IFS=$IFS # save old IFS value
IFS=$'\r\n' GLOBIGNORE='*' command eval 'ALL_PACKAGES=($(cat ./modules.txt))'
IFS=$OLD_IFS # restore IFS

BUILD_ALL=true
BUNDLE=true
VERSION_PREFIX=$(node -p "require('./package.json').version")
COMPILE_SOURCE=true
TYPECHECK_ALL=true

TRAVIS=${TRAVIS:-}

VERBOSE=false
TRACE=false

for ARG in "$@"; do
  case "$ARG" in
    --quick-bundle=*)
      COMPILE_SOURCE=false
      TYPECHECK_ALL=false
      ;;
    --packages=*)
      # asked to build a subset of the packages
      BUILD_ALL=false
      
      # parse to identify the packages to build
      PACKAGES_STR=${ARG#--packages=}
      PACKAGES_STR="${PACKAGES_STR//,/ }" # replace , by ' '
      PACKAGES_STR="${PACKAGES_STR//;/ }" # replace ; by ' '
      PACKAGES_STR="${PACKAGES_STR// /_}" # replace all spaces by '_'
      PACKAGES_STR=`eval echo ${PACKAGES_STR} | sed -r 's/[_]+/_/g'` # replace all '_' by ''
      PACKAGES_STR=`eval echo ${PACKAGES_STR} | sed -r 's/_$//g'` # replace last '_' if still there
      # at this point PACKAGES_STR is (finally) clean :)
      # it only contains '_' as delimiter
      
      # Convert the string to an array
      PACKAGES_TO_BUILD=()

      OLD_IFS=$IFS # save old IFS value
      IFS='_ ' # use '_' as character to split
      read -r -a PACKAGES_TO_BUILD <<< ${PACKAGES_STR}
      IFS=$OLD_IFS # restore IFS
      
      unset PACKAGES_STR # not needed anymore
      #echo "Packages to build: ${PACKAGES_TO_BUILD[*]}"
      
      # Filtering package lists to only keep those that need to be built
      FILTERED_PACKAGES=()
      FILTERED_TSC_PACKAGES=()
      FILTERED_NODE_PACKAGES=()
      FILTERED_ALL_PACKAGES=()
      
      for target in "${PACKAGES_TO_BUILD[@]}"; do
        if containsElement "${target}" "${PACKAGES[@]}"; then
          FILTERED_PACKAGES+=(${target})
        fi
        if containsElement "${target}" "${TSC_PACKAGES[@]}"; then
          FILTERED_TSC_PACKAGES+=(${target})
        fi
        if containsElement "${target}" "${NODE_PACKAGES[@]}"; then
          FILTERED_NODE_PACKAGES+=(${target})
        fi
        if containsElement "${target}" "${ALL_PACKAGES[@]}"; then
          FILTERED_ALL_PACKAGES+=(${target})
        fi
      done
      PACKAGES=("${FILTERED_PACKAGES[@]}")
      TSC_PACKAGES=("${FILTERED_TSC_PACKAGES[@]}")
      NODE_PACKAGES=("${FILTERED_NODE_PACKAGES[@]}")
      ALL_PACKAGES=("${FILTERED_ALL_PACKAGES[@]}")
      
      # if ALL_PACKAGES is empty then the input was incorrect
      if [ ${#ALL_PACKAGES[@]} -eq 0 ]; then
        die "No matching packages. Can't build anything :("
      fi
      ;;
    --bundle=*)
      BUNDLE=( "${ARG#--bundle=}" )
      ;;
    --compile=*)
      COMPILE_SOURCE=${ARG#--compile=}
      ;;
    --typecheck=*)
      TYPECHECK_ALL=${ARG#--typecheck=}
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
    *)
      echo "Unknown option $ARG."
      exit 1
      ;;
  esac
done

PROJECT_ROOT_DIR=`pwd`
logTrace "PROJECT_ROOT_DIR: ${PROJECT_ROOT_DIR}" 1
ROOT_DIR=${PROJECT_ROOT_DIR}/packages
logTrace "ROOT_DIR: ${ROOT_DIR}" 1
ROOT_OUT_DIR=${PROJECT_ROOT_DIR}/dist/packages
logTrace "ROOT_OUT_DIR: ${ROOT_OUT_DIR}" 1

# Making sure the variable exists
if [[ -z ${TRAVIS_TAG+x} ]]; then
  TRAVIS_TAG=""
fi

if [[ ${TRAVIS_TAG} == "" ]]; then
  logTrace "Setting the version suffix to the latest commit hash" 1
  VERSION_SUFFIX="-$(git log --oneline -1 | awk '{print $1}')" # last commit id
else
  logTrace "Build executed for a tag. Not using a version suffix!" 1
  VERSION_SUFFIX="" # last commit id
fi

VERSION="${VERSION_PREFIX}${VERSION_SUFFIX}"

logInfo "============================================="
logInfo "Building Stark version ${VERSION}"
logInfo "============================================="

if [[ ${BUILD_ALL} == true ]]; then
  logInfo "> FULL build: ${ALL_PACKAGES[*]}"
else
  logInfo "> PARTIAL build: ${PACKAGES_TO_BUILD[*]}"
fi
logInfo "============================================="

TSC=`pwd`/node_modules/.bin/tsc
logTrace "TSC Path: $TSC"
NGC="node --max-old-space-size=3000 `pwd`/node_modules/@angular/compiler-cli/src/main"
UGLIFY=`pwd`/node_modules/.bin/uglifyjs
TSCONFIG=./tools/tsconfig.json
ROLLUP=`pwd`/node_modules/.bin/rollup

if [[ ${BUILD_ALL} == true && ${TYPECHECK_ALL} == true ]]; then
  travisFoldStart "clean dist" "no-xtrace"
    rm -rf ./dist/all/
    rm -rf ./dist/packages
  travisFoldEnd "clean dist"

  mkdir -p ./dist/all/

  TSCONFIG="packages/tsconfig.json"
  travisFoldStart "tsc -p ${TSCONFIG}" "no-xtrace"
    $TSC -p ${TSCONFIG}
  travisFoldEnd "tsc -p ${TSCONFIG}"
fi

if [[ ${BUILD_ALL} == true ]]; then
  rm -rf ./dist/packages
  if [[ ${BUNDLE} == true ]]; then
    rm -rf ./dist/packages-dist
  fi
  
  mkdir -p ./dist/packages-dist
fi

if [[ ${BUILD_ALL} == false ]]; then
  for PACKAGE in ${ALL_PACKAGES[@]}
  do
    travisFoldStart "clean dist for ${PACKAGE}" "no-xtrace"
    rm -rf ./dist/packages/$PACKAGE
    if [[ ${BUNDLE} == true ]]; then
      rm -rf ./dist/packages-dist/$PACKAGE
    fi
    
    if [[ ! -d "./dist/packages" ]]; then
      mkdir -p ./dist/packages
    fi
    
    if [[ ! -d "./dist/packages-dist" ]]; then
      mkdir -p ./dist/packages-dist
    fi
  done
  travisFoldEnd "clean dist for ${PACKAGE}"
fi

mkdir -p ${ROOT_OUT_DIR}

ROLLUP_DEFAULT_CONFIG_PATH=${ROOT_DIR}/rollup.config.js
logTrace "ROLLUP_DEFAULT_CONFIG_PATH: ${ROLLUP_DEFAULT_CONFIG_PATH}" 1

for PACKAGE in ${ALL_PACKAGES[@]}
do
  travisFoldStart "global build: ${PACKAGE}" "no-xtrace"
    SRC_DIR=${ROOT_DIR}/${PACKAGE}
    logTrace "SRC_DIR: $SRC_DIR" 1
    OUT_DIR=${ROOT_OUT_DIR}/${PACKAGE}
    logTrace "OUT_DIR: $OUT_DIR" 1
    NPM_DIR=${PROJECT_ROOT_DIR}/dist/packages-dist/${PACKAGE}
    logTrace "NPM_DIR: $NPM_DIR" 1
    
    LICENSE_BANNER=${ROOT_DIR}/license-banner.txt
  
    if containsElement "${PACKAGE}" "${PACKAGES[@]}"; then
      travisFoldStart "build package: ${PACKAGE}" "no-xtrace"
        OUT_DIR_ESM5=${ROOT_OUT_DIR}/${PACKAGE}/esm5
        logTrace "OUT_DIR_ESM5: $OUT_DIR_ESM5" 1
        ESM2015_DIR=${NPM_DIR}/esm2015
        logTrace "ESM2015_DIR: $ESM2015_DIR" 1
        FESM2015_DIR=${NPM_DIR}/fesm2015
        logTrace "FESM2015_DIR: $FESM2015_DIR" 1
        ESM5_DIR=${NPM_DIR}/esm5
        logTrace "ESM5_DIR: $ESM5_DIR" 1
        FESM5_DIR=${NPM_DIR}/fesm5
        logTrace "FESM5_DIR: $FESM5_DIR" 1
        BUNDLES_DIR=${NPM_DIR}/bundles
        logTrace "BUNDLES_DIR: $BUNDLES_DIR" 1

        if [[ ${COMPILE_SOURCE} == true ]]; then
          rm -rf ${OUT_DIR}
          rm -f ${ROOT_OUT_DIR}/${PACKAGE}.js
    
          logInfo "Compile package $PACKAGE"
          compilePackage ${SRC_DIR} ${OUT_DIR} ${PACKAGE} ${TSC_PACKAGES[@]+"${TSC_PACKAGES[@]}"}

          logInfo "Copy assets folders for package $PACKAGE"
          syncOptions=(-a --include="**/assets/" --exclude="*.js" --exclude="*.js.map" --exclude="*.ts" --include="*.json" --exclude="node_modules/" --exclude="coverage/" --exclude="reports/")
          syncFiles $SRC_DIR $OUT_DIR "${syncOptions[@]}"
          unset syncOptions
        fi
  
        if [[ ${BUNDLE} == true ]]; then
          logInfo "Bundle $PACKAGE ($SRC_DIR)"
    
          logDebug "Clean up ${NPM_DIR}" 1
          rm -rf ${NPM_DIR} && mkdir -p ${NPM_DIR}

          logInfo "Copy ${PACKAGE} typings from ${OUT_DIR} to ${NPM_DIR}"
          syncOptions=(-a --exclude="*.js" --exclude="*.js.map" --exclude="**/assets/" --exclude="node_modules/")
          syncFiles $OUT_DIR $NPM_DIR "${syncOptions[@]}"
          unset syncOptions
          
          logInfo "Copy ESM2015 for ${PACKAGE}"
          syncOptions=(-a --exclude="**/*.d.ts" --exclude="**/*.metadata.json" --exclude="**/assets/" --exclude="node_modules/")
          syncFiles $OUT_DIR $ESM2015_DIR "${syncOptions[@]}"
          unset syncOptions
       
          logDebug "Rollup $PACKAGE to ESM2015 folder" 1
          rollupIndex ${OUT_DIR} ${ESM2015_DIR} ${PACKAGE} ${ROLLUP_DEFAULT_CONFIG_PATH}
          logDebug "Rollup $PACKAGE to FESM2015 folder" 1
          rollupIndex ${OUT_DIR} ${FESM2015_DIR} ${PACKAGE} ${ROLLUP_DEFAULT_CONFIG_PATH}

          logDebug "Produce ESM5 version" 1
          compilePackageES5 ${SRC_DIR} ${OUT_DIR_ESM5} ${PACKAGE}
          syncOptions=(-a --exclude="**/*.d.ts" --exclude="**/*.metadata.json" --exclude="node_modules/")
          syncFiles $OUT_DIR_ESM5 $ESM5_DIR "${syncOptions[@]}"
          unset syncOptions
          rollupIndex ${OUT_DIR_ESM5} ${FESM5_DIR} ${PACKAGE} ${ROLLUP_DEFAULT_CONFIG_PATH}

          logDebug "Run rollup conversions on $PACKAGE" 1
          runRollup ${SRC_DIR}
          addBanners ${BUNDLES_DIR}
          minify ${UGLIFY} ${BUNDLES_DIR}
        fi
        
        logInfo "Copy $PACKAGE package.json to $NPM_DIR"
        # FIXME exclude node modules!
        travisFoldStart "copy package.json for: ${PACKAGE}" "no-xtrace"
        # TODO check if  --exclude="package-lock.json" is correctly working
        syncOptions=(-am --include="package.json" --exclude="package-lock.json" --exclude="coverage/" --exclude="node_modules/" --exclude="rollup.config.js" --exclude="*.ts" --exclude="*/*.ts" --include="*" --exclude="*")
        syncFiles $SRC_DIR $NPM_DIR "${syncOptions[@]}"
        unset syncOptions
        travisFoldEnd "copy package.json for: ${PACKAGE}"
      travisFoldEnd "build package: ${PACKAGE}"
    fi
    
    if containsElement "${PACKAGE}" "${NODE_PACKAGES[@]}"; then
      travisFoldStart "build node package: ${PACKAGE}" "no-xtrace"
      
      # contents only need to be copied to the destination folder
      logInfo "Copy ${PACKAGE} to ${OUT_DIR}"
      syncOptions=(-a --include="package-lock.json" --exclude="node_modules/" --exclude="config-stark/")
      syncFiles $SRC_DIR $OUT_DIR "${syncOptions[@]}"
      unset syncOptions
  
      logInfo "Copy $PACKAGE contents"
      syncFiles $OUT_DIR $NPM_DIR "-a"
  
      travisFoldEnd "build node package: ${PACKAGE}"
    fi
  
    travisFoldStart "general tasks: ${PACKAGE}" "no-xtrace"
      if [[ -d ${NPM_DIR} ]]; then
        logInfo "Copy $PACKAGE README.md file to $NPM_DIR"
        cp ${ROOT_DIR}/README.md ${NPM_DIR}/
      
        logInfo "Update version references in ${NPM_DIR}"
        updateVersionReferences $VERSION ${NPM_DIR}
    
        logInfo "Update module name references in ${NPM_DIR}"
        updatePackageNameReferences ${PACKAGE} ${NPM_DIR}
    
        logInfo "Generate .npmignore file"
        generateNpmIgnore ${PROJECT_ROOT_DIR} ${NPM_DIR}
        
        logInfo "Generate npm package (tgz file)"
        generateNpmPackage ${NPM_DIR}
        
        logInfo "Adapt showcase dependencies"
        adaptNpmPackageDependencies $PACKAGE $VERSION "./showcase/package.json" 1
        adaptNpmPackageLockDependencies $PACKAGE $VERSION "./showcase/package-lock.json" 1
        
        logInfo "Adapt starter dependencies"
        adaptNpmPackageDependencies $PACKAGE $VERSION "./starter/package.json" 1
        adaptNpmPackageLockDependencies $PACKAGE $VERSION "./starter/package-lock.json" 1

      fi
    travisFoldEnd "general tasks: ${PACKAGE}"
  
  travisFoldEnd "global build: ${PACKAGE}"
done

# Print return arrows as a log separator
travisFoldReturnArrows
