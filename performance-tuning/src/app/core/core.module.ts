import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AnalyticsProvider, AnalyticsRun, AnalyticsService } from 'analytics';
import { I18nModule } from 'i18n';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';

import { APP_NAME, CoreConfig } from './core.config';

export function analyticsFactory(analyticsProvider: AnalyticsProvider, analytics: AnalyticsRun) {
  return () => {
    analyticsProvider.setAppId(APP_NAME);
    analytics.run();
  };
}

// dynamically load `JSON` translation data as chunks
export class TranslateDynamicLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(
      import(
        /* webpackChunkName: 'i18n-json-[index]' */
        `../../assets/i18n/${lang}.json`
      )
    );
  }
}

// Here, we're providing a run block which calls factory functions that will execute concurrently
// at the very end of the bootstrapping process, right before the root component is instantiated
@NgModule({
  imports: [
    I18nModule.forRoot({
      localeDetectionStrategy: 'browser',
      localeFallback: 'en-US',
      localeIncludeExp: 'ar|fr|en'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateDynamicLoader
      }
    })
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the Root Module only'
      );
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AnalyticsService,
        AnalyticsProvider,
        AnalyticsRun,
        CoreConfig,
        {
          provide: APP_INITIALIZER, useFactory: analyticsFactory,
          deps: [AnalyticsProvider, AnalyticsRun], multi: true
        }
      ]
    };
  }
}
