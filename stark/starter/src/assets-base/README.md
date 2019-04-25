This folder should contain all static assets that will be copied to the root of the application.

Note that all the contents of this folder will be copied to the ROOT of the target folder.
For example, "robots.txt" will be copied to "dist/robots.txt"

This is done in dev and in production, hence in all cases when you refer to files present in "assets-base", don't include "assets-base" in your paths.
