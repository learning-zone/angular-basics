#angular2-online-store

  This is a simple online store of computers implemented using Angular2 to demonstrate how the framework brings the development
to the absolutely new level and make the way we create apps more logical, professional, and straightforward. 
The back end part is done with Node.js stack.

<p align="center">
    <img style="display: block" src="http://levelup.lishman.com/images/angular2.png">
</p>

## Getting started:
  - Install Node.js(npm comes with it by default) - https://nodejs.org/en/
  - Install MongoDB - https://www.mongodb.org
  - Set up MongoDB connection
  - ` git clone https://github.com/IvanDobrovolsky/angular2-online-store.git `
  - ` npm install `
  - ` npm run server `
  - ` npm start `
  - Open a browser on port 4200(http://localhost:4200)
  - NOTE: Development server is running on port 4200, actual backend is running on port 7777;


## Technology/tools stack description:
  - HTML5
  - CSS3
  - Angular2
  - TypeScript
  - RxJS
  - SemanticUI
  - AngularCLI
  - Augury
  - Typings
  - System.js
  - Karma/Jasmine/Protractor
  - NPM
  - Node.js
  - Express.js
  - MongoDB


## The following Typescript/ES6/RxJS features and Web APIs were used:
- Classes
- Intefaces
- Generics
- Enums
- Decorators
- Observables
- Observable subjects
- RxJS operators: flatMap, map, combineAll
- HTML5 Notification API


## The following Angular2 features were used/implemented:
- Directives(ngIf, NgClass, NgFor, NgModel)
- ViewEncapsulation
- ChangeDetectionStrategy
- Observable data services
- Template-Driven forms
- Model-Drive forms(FormBuilder), Validators
- Router
- Pipes (async, json, currency, date)
- HTTP, Response, RequestMethod enum, Headers
- Inputs, Outputs
- Component lifecycle hooks (NgOnInit, NgOnDestroy, NgDoCheck, NgOnChanges)


###The project was refactored to obey Angular styleguide principles: https://angular.io/styleguide


---

## Node.js + Express.js + MongoDB RESTful API:

| Method        | Url                     | Result                              |
| ------------- |---------------          | ----------------------              | 
| GET           | /api/computers          | Retrieve all computers              |
| POST          | /api/computers          | Create new computer                 |
| POST          | /api/computers/filter   | Filter computers                    |
| GET           | /api/computers/:id      | Retrieve a computer by its id       |
| PUT           | /api/computers/:id      | Update an existing computer         |
| DELETE        | /api/computers/:id      | Delete an existing computer         |
| GET           | /api/brands             | Retrieve all computer brand names   |


### What next? Adding new features, refactoring and improving performance...
- Authentication
- Maximum test coverage
- Pagination
- Performance enhancement
- Animation
- Caching
- Server-side/Web-worker rendering
- Security
