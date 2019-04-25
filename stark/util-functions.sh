#!/usr/bin/env bash

# Three-Fingered Claw technique :)
# Reference: https://stackoverflow.com/questions/1378274/in-a-bash-script-how-can-i-exit-the-entire-script-if-a-certain-condition-occurs
yell() { echo "$0: $*" >&2; }
die() { yell "$*"; exit 111; }
try() { "$@" || die "cannot $*"; }

#######################################
# Echo the passed message if verbose mode is enabled
# Arguments:
#   param1 - message to log if verbose mode is enabled
#   param2 - depth: spaces to add before the string
#######################################
logDebug() {
  if [[ ${VERBOSE} == true ]] || [[ ${TRACE} == true ]]; then
    logInfo "$@"
  fi
}

#######################################
# Echo the passed message if trace mode is enabled
# Arguments:
#   param1 - message to log if trace mode is enabled
#   param2 - depth: spaces to add before the string
#######################################
logTrace() {
  if [[ ${TRACE} == true ]]; then
    logInfo "$@"
  fi
}

#######################################
# Echo the passed message
# Arguments:
#   param1 - message to log if verbose mode is enabled
#   param2 - (optional) depth: spaces to add before the string (defaults to 0)
#######################################
#log() {
#  local message=${1:-NO MESSAGE TO LOG GIVEN TO log function (this is probably a mistake)}
#  local numSpaces=${2:-0}
#  printf "%${numSpaces}s$message\n"
#}
logInfo() {
  local message="${1:-NO MESSAGE TO LOG GIVEN TO log function (this is probably a mistake)}"
  local numSpaces="${2:-0}"
  printf -v spacing '%*s' "$numSpaces"
  printf "${spacing}%s\n" "$message"
}

#######################################
# Verifies a directory isn't in the ignored list
# Arguments:
#   param1 - Source folder
#   param2 - Destination folder
#   param3 - Options {Array}
#######################################
syncFiles() {
  logTrace "${FUNCNAME[0]}" 1
  logDebug "Syncing files from $1 to $2" 1
  cd $1; # we go to the folder to execute it with relative paths
  mkdir -p $2
  local REL_PATH_TO_DESTINATION=$(perl -e 'use File::Spec; print File::Spec->abs2rel(@ARGV) . "\n"' $2 $1)
  # local REL_PATH_TO_DESTINATION=$(realpath --relative-to="." "$2");
  shift 2; # those 2 parameters are not needed anymore
	
  logTrace "Syncing files using: rsync" 2
  if [[ ${TRACE} == true ]]; then
    rsync "${@}" ./ $REL_PATH_TO_DESTINATION/ -v
  else
    rsync "${@}" ./ $REL_PATH_TO_DESTINATION/
  fi
  cd - > /dev/null; # go back to the previous folder without any output
}
