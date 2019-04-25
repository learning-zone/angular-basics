Package.describe({
  name: 'socially-browser',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.use(['angular2-compilers', 'barbatus:angular2-runtime'], 'client');

  api.mainModule('socially-browser.ts', 'web.browser');
  api.addFiles('auth/login.html', 'web.browser');
});

Package.onTest(function(api) {
});
