## Performance Tuning  

**Live Demo** : [Performance-Tuning](https://performance-tuning-3450d.firebaseapp.com)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.6.

### Tools and Technologies

- Technology: HTML, Angular-Material, SCSS, Angular-9, i18n, Drag & Drop, Progressive Web Application.
- Database : Angular Firebase.

### This Projects Covers

- Angular Material Data Tables
- Components Loading
- Lazy-Loading
- Progressive Web App (PWA)
- Server Side Rendering (SSR)
- ChangeDetectionStrategy.OnPush
- TrackBy

### Adding Service-Worker (PWA) in Angular 
```bash
ng add @angular/pwa
```

### Adding Server-Side Rendering (SSR) in Angular 
```bash
ng add @nguniversal/express-engine
```

### Deploying an Angular App to Firebase Hosting

1. Build your Angular app
```bash
ng build --prod
```
2. Install the Firebase command line tools
```bash
npm install -g firebase-tools
```
3. Login using the Firebase CLI & initialize your project
```bash
firebase login
```
4. Initialize the project using this command:
```bash
firebase init
```
5. Deploy to Firebase Hosting
```bash
firebase deploy
```
### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-To-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
