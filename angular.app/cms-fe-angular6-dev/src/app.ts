import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import './assets/less/index.less';
import 'ng-zorro-antd/src/ng-zorro-antd.min.css';
// import 'quill/dist/quill.bubble.css';
// import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

// declare var module: any;
// if (module.hot) {
//     module.hot.accept();
// }

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule).catch((e) => console.error(e));
