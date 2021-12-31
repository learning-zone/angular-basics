# Angular Commands

|Sl.No.| Commands               | Description                       |
|------|------------------------|-----------------------------------|
| 01. |npm install -g @angular/cli |                                   |
| 02. |ng new project-name		    | Create an Angular project with Angular CLI |
| 03. |ng serve --open              |                                            |
| 04. |ng test						| Running unit tests |
| 05. |ng e2e 						| Running end-to-end tests with protractor framwork|
| 06. |ng generate					| Generate Angular components |
| 07. |ng lint						| prints out linting errors |
| 08. |ng build				        | The build artifacts will be stored in the dist/ directory. |
| 09. |ng build --prod				| This will build the project in the dist directory |
| 10. |ng build --dev				|                                                   |
| 11. |ng get/ng set			    | Set a value in the Angular CLI configuration |
| 12. |ng doc						| Opens a browser window with the keyword as search in Angular documentation. |
| 13. |ng eject					| ejects your app and output the proper webpack configuration and scripts |
| 14. |ng xi18n					| Extracts i18n messages from the templates. |
| 15. |ng test --watch=false --code-coverage		| Generate Code Coverage Reports |
| 16. |npm install firebase angularfire2 --save     |                  |
| 17. |npm install @angular/platform-browser-dynamic| bootstrap module |
| 18. |npm install angular-in-memory-web-api --save | Install In-memory-web-api |
| 19. |npm install @angular/elements | Angular elements                |
| 20. |npm install -g now			  | Opensource server               | 
| 21. |npm install -g tsun			  | REPL - TypeScript Upgraded Node |
| 22. |npm install moment --save-dev |                                 |
| 23. |npm run                       |                                 |
| 24. |npm run-script                |                                 |
| 25. |ng add @angular/material      |                                 |
| 26. |ng add @angular/cdk           |                                 |
| 27. |ng add @angular/animations    |                                 |
| 28. |npm install --save hammerjs   |                                 |

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Angular Generate Commands

|Sl.No.| Commands                               | 
|------|----------------------------------------|
|  01. |ng new [ app-name ] --routing           |
|  02. |ng generate component [ component-name ]|
|  03. |ng generate module [ module-name ]      |
|  04. |ng generate class [ class-name ]        |
|  05. |ng generate directive [ directive-name ]|
|  06. |ng generate interface [ interface-name ]|
|  07. |ng generate pipe [ pipe-name ]|
|  08. |ng generate serviceWorker [ serviceWorker-name ]|
|  09. |ng generate application [ application-name ]|
|  10. |ng generate enum [ enum-name ]|
|  11. |ng generate guard [ guard-name ]|
|  12. |ng generate service [ service-name ]|
|  13. |ng generate universal [ universal-name ]|
|  14. |ng generate appShell [ appShell-name ]|
|  15. |ng generate library [ library-name ]|
|  16. |ng generate component [ component-name ] --inline-template --inline-style --module app [ Generate initial test file ]|

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## WEBPACK Commands

|Sl.No.| Commands                     | Description                       |
|------|------------------------------|-----------------------------------|
|  01.  |npm init                      |                                   |
|  02.  |npm install -g webpack        |                                   |
|  03.  |npm install webpack --save-dev|                                   |
|  04.  |npm install jquery --save-dev |                                   |
|  05.  |npm install                   |                                   |
|  06.  |webpack main.js ./bundle.js   | Entry_point  compiled file_name   |
|  07.  |webpack                       |                                   |
|  08.  |webpack -w                    | watch                             |
|  09.  |npm install babel-loader babel-core --save-dev|                   |
|  10.  |npm install babel-preset-es2015 babel-preset-react --save-dev     |
|  11.  |npm install style-loader css-loader --save-dev    | Load css using webpack |
|  12.  |npm install sass-loader node-sass --save-dev      | running sass using webpack |
|  13.  |npm install url-loader file-loader --save-dev	  | Load images using webpack |
|  14.  |npm install webpack-dev-server --save-dev		  | Load project in server using webpack |

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## GIT Commands


|Sl.No.| Commands      | Description                                     |
|------|---------------|-------------------------------------------------|
| 01.  |git clone      |Clone a repository into a new directory         |
| 02.  |git config --bool core.bare false| To change bare repository to normal repository |
| 03.  |git reset      |Reset current HEAD to the specified state  |
| 04.  |git branch     |List, create, or delete branches          |
| 05.  |git checkout   |Switch branches or restore working tree files|	
| 06.  |git stash      |Save local changes |
| 07.  |git init       |Create an empty Git repository or reinitialize an existing one|
| 08.  |git add        |Add file contents to the index |
| 09.  |git mv         |Move or rename a file, a directory, or a symlink|
| 10.  |git rm         |Remove files from the working tree and from the index |
| 11.  |git bisect     |Use binary search to find the commit that introduced a bug|
| 12.  |git grep       |Print lines matching a pattern|
| 13.  |git log        |Show commit logs|
| 14.  |git show       |Show various types of objects|
| 15.  |git status     |Show the working tree status|
| 16.  |git commit     |Record changes to the repository |
| 17.  |git diff       |Show changes between commits, commit and working tree, etc|
| 18.  |git merge      |Join two or more development histories together|
| 19.  |git rebase     |Reapply commits on top of another base tip|
| 20.  |git tag        |Create, list, delete or verify a tag object signed with GPG|
| 21.  |git fetch      |Download objects and refs from another repository|
| 22.  |git pull       |Fetch from and integrate with another repository or a local branch|
| 23.  |git push       |Update remote refs along with associated objects|

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## TypeScript Commands

|Sl.No.| Commands                     | Description                       |
|------|------------------------------|-----------------------------------|
|  01. |npm install -g typescript     |                                   |
|  02. |npm install -g typescript-compiler|                               |
|  03. |tsc -v     			   		    | TypeScript Version              |
|  04. |tsc ./app.ts             		| Compile                         |
|  05. |tsc init 						| Initializes a typescript project and creates a tsconfig.json file |
|  06. |tsc -w 						    | Watch input files               | 
|  07. |tsc -d						    | Generates corresponding '.d.ts' file | 
|  08. |tsc --out              		    | Concatenate and emit output to single file |
|  09. |tsc --sourceMap        	        | Generates corresponding '.map' file |
|  10. |npm install systemjs            |                                     |

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>
