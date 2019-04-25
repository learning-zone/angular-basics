#!/usr/bin/env bash

#######################################
# Verifies a directory isn't in the ignored list
# Arguments:
#   param1 - Path to check
# Returns:
#   Boolean
#######################################
isIgnoredDirectory() {
  #logTrace "${FUNCNAME[0]}: Checking for ${1}" 1
  name=$(basename ${1})
  if [[ -f "${1}" || "${name}" == "src" || "${name}" == "test" || "${name}" == "integrationtest" || "${name}" == "reports" || "${name}" == "coverage" || "${name}" == "assets" || "${name}" == "node_modules" ]]; then
    #logTrace "No" 1
    return 0
  else
    #logTrace "Yes" 1
    return 1
  fi
}

#######################################
# Recursively runs rollup on any entry point that has a "rollup.config.js" file
# Arguments:
#   param1 - Base source folder containing rollup.config.js
# Returns:
#   None
#######################################
runRollup() {
  logTrace "${FUNCNAME[0]}" 1
  logDebug "Preparing to execute rollup" 1
  local ROLLUP_CONFIG_PATH=${1}/rollup.config.js
  
  if [[ -f $ROLLUP_CONFIG_PATH ]]; then
  	logTrace "${FUNCNAME[0]}: Rollup configuration file found at $ROLLUP_CONFIG_PATH" 2
    cd ${1}
    logTrace "${FUNCNAME[0]}: Rollup command: $ROLLUP -c $ROLLUP_CONFIG_PATH" 2
    local ROLLUP_RESULTS=`$ROLLUP -c $ROLLUP_CONFIG_PATH 2>&1`
    
    if [[ $ROLLUP_RESULTS =~ ^.*\[\!\].* ]]; then
      logInfo "${FUNCNAME[0]}: Error happened during rollup execution. Rollup execution output: $ROLLUP_RESULTS"
      exit 1
    elif [[ $ROLLUP_RESULTS =~ ^.*\(\!\).* ]]; then
      local DISPLAYED_TRACE=false
      if [[ $ROLLUP_RESULTS =~ .*\(\!\)\ Unresolved\ dependencies.* ]]; then
        DISPLAYED_TRACE=true
        logInfo "${FUNCNAME[0]}: Rollup - (!) Unresolved dependencies detected." 2
      fi
      if [[ $ROLLUP_RESULTS =~ .*\(\!\)\ Missing\ global\ variable\ name.* ]]; then
        DISPLAYED_TRACE=true
        logInfo "${FUNCNAME[0]}: Rollup - (!) Missing global variable name detected." 2
      fi
      if [[ $ROLLUP_RESULTS =~ .*\(\!\)\ Circular\ dependency.* ]]; then
        DISPLAYED_TRACE=true
        logInfo "${FUNCNAME[0]}: Rollup - (!) Circular dependency detected." 2
      fi
      if ! $DISPLAYED_TRACE ; then
        logInfo "${FUNCNAME[0]}: Warning appeared during rollup execution. Rollup execution output: $ROLLUP_RESULTS"
      fi
    fi
    cd - > /dev/null

	logTrace "${FUNCNAME[0]}: Rollup execution output: $ROLLUP_RESULTS" 2
	logTrace "${FUNCNAME[0]}: Rollup completed" 2
	
    # Recurse for sub directories
    for DIR in ${1}/* ; do
      isIgnoredDirectory ${DIR} && continue
      logTrace "${FUNCNAME[0]}: Running rollup recursively" 2
      runRollup ${DIR}
      logTrace "${FUNCNAME[0]}: Recursive rollup completed" 2
    done
  fi
}

#######################################
# Check if array contains an element
# Arguments:
#   param1 - Element to check
#   param2 - Array to look for element in
# Returns:
#   None
#######################################
containsElement () {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

#######################################
# Rollup index files recursively, ignoring blacklisted directories
# Arguments:
#   param1 - Base source folder
#   param2 - Destination directory
#   param3 - Package name
#   param4 - Rollup default config location
#   param5 - Is sub directory (optional)

# Returns:
#   None
#######################################
rollupIndex() {
  logTrace "${FUNCNAME[0]}" 1
  logDebug "Rolling up index files recursively" 1
  logTrace "Base source folder: $1. Destination directory: $2. Package name: $3. Is sub dir? ${5:-NO}" 1
  # Iterate over the files in this directory, rolling up each into ${2} directory
  in_file="${1}/${3}.js"
  if [ ${5:-} ]; then
    out_file="$(dropLast ${2})/${3}.js"
  else
    out_file="${2}/${3}.js"
  fi
  local ROLLUP_CONFIG_PATH=$4
  
  # TODO pass LICENSE_BANNER as a param to the function
  BANNER_TEXT=`cat ${LICENSE_BANNER}`
  if [[ -f ${in_file} ]]; then
    logTrace "Executing rollup with $ROLLUP -c ${ROLLUP_CONFIG_PATH} -i ${in_file} -o ${out_file} --banner \"$BANNER_TEXT\" 2>&1" 2
    
    # If this execution of rollup ends up with warnings like "(!) Unresolved dependencies..."
    # Then adapt rollup.config.common-data.js in order to include the missing globals!
    # Note that this execution of rollup MUST NOT include globals/external libs like rxjs, angular, ...
    # For this usage scenario, the client app is supposed to import those dependencies on their own (e.g., script tag above on the page)
    local ROLLUP_RESULTS=`$ROLLUP -c ${ROLLUP_CONFIG_PATH} -i ${in_file} -o ${out_file} --banner "$BANNER_TEXT" 2>&1`
    
    if [[ $ROLLUP_RESULTS =~ ^.*\[\!\].* ]]; then
      logInfo "${FUNCNAME[0]}: Error happened during rollup execution. Rollup execution output: $ROLLUP_RESULTS"
      exit 1
    elif [[ $ROLLUP_RESULTS =~ ^.*\(\!\).* ]]; then
      local DISPLAYED_TRACE=false
      if [[ $ROLLUP_RESULTS =~ .*\(\!\)\ Unresolved\ dependencies.* ]]; then
        DISPLAYED_TRACE=true
        logInfo "${FUNCNAME[0]}: Rollup - (!) Unresolved dependencies detected." 2
      fi
      if [[ $ROLLUP_RESULTS =~ .*\(\!\)\ Missing\ global\ variable\ name.* ]]; then
        DISPLAYED_TRACE=true
        logInfo "${FUNCNAME[0]}: Rollup - (!) Missing global variable name detected." 2
      fi
      if [[ $ROLLUP_RESULTS =~ .*\(\!\)\ Circular\ dependency.* ]]; then
        DISPLAYED_TRACE=true
        logInfo "${FUNCNAME[0]}: Rollup - (!) Circular dependency detected." 2
      fi
      if ! $DISPLAYED_TRACE ; then
        logInfo "${FUNCNAME[0]}: Warning appeared during rollup execution. Rollup execution output: $ROLLUP_RESULTS"
      fi
    fi

    logTrace "${FUNCNAME[0]}: Rollup execution output (do not mind the unresolved dependencies!): $ROLLUP_RESULTS" 2
  fi

  # Recurse for sub directories
  for DIR in ${1}/*; do
    local sub_package=$(basename "${DIR}")
    isIgnoredDirectory ${DIR} && continue
    local regex=".+/(.+)/${sub_package}.js"
    if [[ "${DIR}/${sub_package}.js" =~ $regex ]]; then
      rollupIndex ${DIR} ${2}/${BASH_REMATCH[1]} ${sub_package} ${ROLLUP_CONFIG_PATH} true
    fi
  done
}

#######################################
# Adds banners to all files in a directory
# Arguments:
#   param1 - Directory to add license banners to
# Returns:
#   None
#######################################
addBanners() {
  logTrace "${FUNCNAME[0]}" 1
  logDebug "Adding banners to all files in $1" 1 
  for file in ${1}/*; do
    if [[ -f ${file} && "${file##*.}" != "map" ]]; then
      # TODO pass LICENSE_BANNER as a param
      logTrace "Adding banner to : ${file}"
      cat ${LICENSE_BANNER} > ${file}.tmp
      cat ${file} >> ${file}.tmp
      mv ${file}.tmp ${file}
    fi
  done
}

#######################################
# Minifies files in a directory
# Arguments:
#   param1 - Path to uglify
#   param2 - Directory to minify
# Returns:
#   None
#######################################
minify() {
  logTrace "Executing function: ${FUNCNAME[0]}" 1
  logDebug "Minifying JS files in: $2" 1
  
  local UGLIFY_PATH="$1"
  
  # Iterate over the files in this directory, rolling up each into ${2} directory
  regex="(.+).js"
  files=(${2}/*)
  logTrace "Identified files to minify: [$files]" 2
  for file in "${files[@]}"; do
    logTrace "Minifying $file" 2
    base_file=$( basename "${file}" )
    if [[ "${base_file}" =~ $regex && "${base_file##*.}" != "map" ]]; then
      local out_file=$(dirname "${file}")/${BASH_REMATCH[1]}.min.js
      logTrace "Running Uglify"
      local UGLIFY_RESULTS=$(${UGLIFY_PATH} ${file} -c --comments --output ${out_file} --source-map "includeSources=true content=\"${file}.map\" filename=\"${out_file}.map\"" ${file} 2>&1)
      logTrace "Uglify completed. Execution output: $UGLIFY_RESULTS" 2
    fi
  done
}

#######################################
# Recursively compile package
# Arguments:
#   param1 - Source directory
#   param2 - Out dir
#   param3 - Package Name
#   param4 - Tsc Packages
# Returns:
#   None
#######################################
compilePackage() {
  logTrace "Executing function: ${FUNCNAME[0]}" 1
  logDebug "Compiling package [$3] located in: $1" 1

  if containsElement "${3}" "${4:-}"; then
    logTrace "[$3]: Compiling: $TSC -p $1/tsconfig-build.json" 2
    $TSC -p ${1}/tsconfig-build.json
  else
    logTrace "[$3]: Compiling: $NGC -p $1/tsconfig-build.json" 2
    local package_name=$(basename "${2}")
    $NGC -p ${1}/tsconfig-build.json
    logTrace "[$3]: Create ${package_name}.d.ts re-export file for tsickle" 2
    
    # this is not a typo!
N="
"

    # Generate the package's d.ts file at the root of dist/packages (e.g., dist/packages/stark-core.d.ts)
    echo "$(cat ${LICENSE_BANNER}) ${N} export * from './${package_name}/${package_name}'" > ${2}/../${package_name}.d.ts
    echo "{\"__symbolic\":\"module\",\"version\":3,\"metadata\":{},\"exports\":[{\"from\":\"./${package_name}/${package_name}\"}],\"flatModuleIndexRedirect\":true}" > ${2}/../${package_name}.metadata.json
  fi

  logTrace "Building sub-packages" 2
  for DIR in ${1}/* ; do
    [ -d "${DIR}" ] || continue
    BASE_DIR=$(basename "${DIR}")
    # Skip over directories that are not nested entry points
    [[ -e ${DIR}/tsconfig-build.json && "${BASE_DIR}" != "integrationtest" ]] || continue
    compilePackage ${DIR} ${2}/${BASE_DIR} ${3} ${4:-}
  done
}

#######################################
# Recursively compile package
# Arguments:
#   param1 - Source directory
#   param2 - Out dir
#   param3 - Package Name
#   param4 - Tsc Packages
# Returns:
#   None
#######################################
compilePackageES5() {
  logTrace "Executing function: ${FUNCNAME[0]}" 1
  logDebug "Compiling package located in : $1 to ES5" 1 

  if containsElement "${3}" "${4:-}"; then
    logTrace "${FUNCNAME[0]}: [${3}]: Compiling: ${TSC} -p ${1}/tsconfig-build.json --target es5 -d false --outDir ${2} --importHelpers true --sourceMap" 2
    local package_name=$(basename "${2}")
    $TSC -p ${1}/tsconfig-build.json --target es5 -d false --outDir ${2} --importHelpers true --sourceMap
  else
    logTrace "${FUNCNAME[0]}: [${3}]: Compiling: ${NGC} -p ${1}/tsconfig-build.json --target es5 -d false --outDir ${2} --importHelpers true --sourceMap" 2
    local package_name=$(basename "${2}")
    $NGC -p ${1}/tsconfig-build.json --target es5 -d false --outDir ${2} --importHelpers true --sourceMap
  fi

  logTrace "Building sub-packages" 2
  for DIR in ${1}/* ; do
    [ -d "${DIR}" ] || continue
    BASE_DIR=$(basename "${DIR}")
    # Skip over directories that are not nested entry points
    [[ -e ${DIR}/tsconfig-build.json && "${BASE_DIR}" != "integrationtest" ]] || continue
    compilePackageES5 ${DIR} ${2} ${3}
  done
}

#######################################
# Adds a package.json in directories where needed (secondary entry point typings).
# This is read by NGC to be able to find the flat module index.
# Arguments:
#   param1 - Source directory of typings files
# Returns:
#   None
#######################################
addNgcPackageJson() {
  logTrace "Executing function: ${FUNCNAME[0]}" 1
  logDebug "Adding a package.json where needed for NGC" 1
  for DIR in ${1}/* ; do
    [ -d "${DIR}" ] || continue
    # Confirm there is an ${PACKAGE}.d.ts and ${PACKAGE}.metadata.json file. If so, create
    # the package.json and recurse.
    if [[ -f ${DIR}/${PACKAGE}.d.ts && -f ${DIR}/${PACKAGE}.metadata.json ]]; then
      echo '{"typings": "${PACKAGE}.d.ts"}' > ${DIR}/package.json
      addNgcPackageJson ${DIR}
    fi
  done
}

#######################################
# Update version references
# Arguments:
#   param1 - version
#   param2 - directory in which version references should be updated
# Returns:
#   None
#######################################
updateVersionReferences() {
  logTrace "Executing function: ${FUNCNAME[0]}" 1
  local NPM_DIR="$2"
  (
    cd ${NPM_DIR}
    
    local PATTERN="0\.0\.0\-PLACEHOLDER\-VERSION"
    perl -p -i.bak -e "s/$PATTERN/$1/g" ./package.json
  )
}

#######################################
# Update package name references
# Arguments:
#   param1 - package name
#   param2 - directory in which version references should be updated
# Returns:
#   None
#######################################
updatePackageNameReferences() {
  logTrace "Executing function: ${FUNCNAME[0]}" 1
  local NPM_DIR="$2"
  (
    cd ${NPM_DIR}
    
    local PATTERN="PLACEHOLDER\-PACKAGE\-NAME"
    perl -p -i.bak -e "s/$PATTERN/$1/g" ./package.json
  )
}

#######################################
# Generate NPM ignore file based on the .gitignore at the root
# Arguments:
#   param1 - directory in which the .gitignore file is located
#   param2 - directory in which to place the generated .npmignore file
# Returns:
#   None
#######################################
generateNpmIgnore() {
  logTrace "Executing function: ${FUNCNAME[0]}" 1
  local PROJECT_ROOT_DIR="$1"
  local NPM_DIR="$2"
  (
    cp $PROJECT_ROOT_DIR/.gitignore $NPM_DIR/.npmignore
  )
}

#######################################
# Generate NPM package (tar.gz) file using npm pack
# Arguments:
#   param1 - directory where npm pack should be executed
# Returns:
#   None
#######################################
generateNpmPackage() {
  logTrace "Executing function: ${FUNCNAME[0]}" 1
  local NPM_DIR="$1"
  (
    cd $NPM_DIR > /dev/null
    npm pack ./ > /dev/null
  )
}

#######################################
# Update a package.json file's dependencies version for the given stark package
# Arguments:
#   param1 - name of the stark package
#   param2 - version of stark to set
#   param3 - path to the package.json file to adapt
#   param4 - sub level of the package to adapt
# Returns:
#   None
#######################################
adaptNpmPackageDependencies() {
  logTrace "Executing function: ${FUNCNAME[0]}" 1
  
  local PACKAGE="$1"
  local VERSION="$2"
  local PACKAGE_JSON_FILE="$3"
  local SUB_LEVEL=$(($4))
  
  local PATH_PARENT=""
  
  index=1
  while [[ $index -le $SUB_LEVEL ]]
  do 
    PATH_PARENT="..\/$PATH_PARENT"
    index=$index+1
  done
  
  local TGZ_PATH="file:${PATH_PARENT}dist\/packages-dist\/$PACKAGE\/nationalbankbelgium-$PACKAGE-$VERSION.tgz"
  logTrace "TGZ path: $TGZ_PATH"
  
  local PATTERN="\"\@nationalbankbelgium\/$PACKAGE\"\s*\:\s*\".*\""
  local REPLACEMENT="\\\"\@nationalbankbelgium\/$PACKAGE\\\": \\\"$TGZ_PATH\\\""
  
  # Packages will have dependencies between them. They will so have "devDependencies" and "peerDependencies" with different values.
  # We should only replace the value of the devDependency for make it work.

  perl -p -i.bak -e "s/$PATTERN/$REPLACEMENT/" $PACKAGE_JSON_FILE
}

#######################################
# Update a package-lock.json file's dependencies version for the given stark package
# Arguments:
#   param1 - name of the stark package
#   param2 - version of stark to set
#   param3 - path to the package-lock.json file to adapt
#   param4 - sub level of the package to adapt
# Returns:
#   None
#######################################
adaptNpmPackageLockDependencies() {
logTrace "Executing function: ${FUNCNAME[0]}" 1
  
  local PACKAGE="$1"
  local VERSION="$2"
  local PACKAGE_JSON_FILE="$3"
  local SUB_LEVEL=$(($4))
  
  local PATH_PARENT=""
  
  index=1
  while [[ $index -le $SUB_LEVEL ]]
  do 
    PATH_PARENT="..\/$PATH_PARENT"
    index=$index+1
  done
  
  local TGZ_REALPATH="dist/packages-dist/$PACKAGE/nationalbankbelgium-$PACKAGE-$VERSION.tgz"
  local TGZ_PATH="file:${PATH_PARENT}dist\/packages-dist\/$PACKAGE\/nationalbankbelgium-$PACKAGE-$VERSION.tgz"
  logTrace "TGZ path: $TGZ_PATH"
  
  SHA="$(openssl dgst -sha512 -binary ./$TGZ_REALPATH  | openssl enc -A -base64)"
  ESCAPED_SHA=${SHA//\//\\/}
  
  logTrace "SHA-512: $SHA"
  logTrace "SHA-512 escaped: $ESCAPED_SHA"
  
  local PATTERN="\\\"\@nationalbankbelgium\/$PACKAGE\\\": \\{(\s*)\\\"version\\\": \\\"(\S*)\\\",(\s*)\\\"integrity\\\": \\\"sha512-(.*)\\\","
  local REPLACEMENT='"\@nationalbankbelgium\/'$PACKAGE'": {$1"version": "'$TGZ_PATH'",$3"integrity": "sha512-'$ESCAPED_SHA'",'
  
  logTrace "PATTERN: $PATTERN"
  logTrace "REPLACEMENT: $REPLACEMENT"
  logTrace "Package JSON file: $PACKAGE_JSON_FILE"
  
  # Packages will have dependencies between them. They will so have "devDependencies" and "peerDependencies" with different values.
  # We should only replace the value of the devDependency for make it work.
  
  perl -p -i.bak -0 -e "s/$PATTERN/$REPLACEMENT/m" $PACKAGE_JSON_FILE
}

#######################################
# Drops the last entry of a path. Similar to normalizing a path such as
# /parent/child/.. to /parent.
# Arguments:
#   param1 - Directory on which to drop the last item
# Returns:
#   None
#######################################
dropLast() {
  local last_item=$(basename ${1})
  local regex=local regex="(.+)/${last_item}"
  if [[ "${1}" =~ $regex ]]; then
    echo "${BASH_REMATCH[1]}"
  else
    echo "${1}"
  fi
}
