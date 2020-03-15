## Angular Performance Tuning  

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

### Service Workers (PWA) in Angular 

Angular's service worker is designed to optimize the end user experience of using an application over a slow or unreliable network connection, while also minimizing the risks of serving outdated content.

The Angular service worker's behavior follows that design goal:

* Caching an application is like installing a native application. The application is cached as one unit, and all files update together.
* A running application continues to run with the same version of all files. It does not suddenly start receiving cached files from a newer version, which are likely incompatible.
* When users refresh the application, they see the latest fully cached version. New tabs load the latest cached code.
* Updates happen in the background, relatively quickly after changes are published. The previous version of the application is served until an update is installed and ready.
* The service worker conserves bandwidth when possible. Resources are only downloaded if they've changed.

To support these behaviors, the Angular service worker loads a manifest file from the server. The manifest describes the resources to cache and includes hashes of every file's contents. When an update to the application is deployed, the contents of the manifest change, informing the service worker that a new version of the application should be downloaded and cached. This manifest is generated from a CLI-generated configuration file called `ngsw-config.json`.

Installing the Angular service worker is as simple as including an NgModule. In addition to registering the Angular service worker with the browser, this also makes a few services available for injection which interact with the service worker and can be used to control it. For example, an application can ask to be notified when a new update becomes available, or an application can ask the service worker to check the server for available updates.
```bash
ng add @angular/pwa
```

### Server-Side Rendering (SSR) in Angular 

Server Side Rendering helps us convert parts of our extremely dynamic web applications into static web applications in which we create and render the content of the requested route on the server side. This static page acts as a placeholder while the rest of application (CSS, JS etc.) are downloaded and bootstrapped in the background. In Angular applications, Server Side Rendering can be enabled using Angular Universal.

```bash
ng add @nguniversal/express-engine
```

### Deploying an Angular App to Firebase Hosting

**1. Build** 

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
```bash
ng build --prod
```
**2. Install the Firebase command line tools**
```bash
npm install -g firebase-tools
```
**3. Login using the Firebase CLI & initialize your project**
```bash
firebase login
```
**4. Initialize the project using this command**
```bash
firebase init
```
**5. Deploy to Firebase Hosting**
```bash
firebase deploy
```

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-To-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
