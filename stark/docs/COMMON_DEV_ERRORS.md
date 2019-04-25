# Common Dev Errors

During the development we are often in front of some errors and sometimes we do not know how to resolve them and what kind of solution we can implement.
That's why referenced those common errors here for sharing our solutions.

> Table of contents

-   [NGC](#ngcErrors)
    -   [TypeError: Cannot read property 'module' of undefined](#ngcErrorModuleUndefined)
    -   [TypeError: Cannot read property 'kind' of undefined](#ngcErrorKindUndefined)
-   [Rollup](#rollupErrors)

    -   [(!) Unresolved dependencies detected](#rollupErrorUnresolvedDeps)

## <a id="ngcErrors"></a>NGC errors

#### <a id="ngcErrorModuleUndefined"></a>TypeError: Cannot read property 'module' of undefined

In the cases we already saw, it was linked to an unexisting export in TypeScript.

```typescript
export * from "invalid path";
```

```bash
> ngc

: TypeError: Cannot read property 'module' of undefined
    at MetadataBundler.convertSymbol (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\@angular\compiler-cli\src\metadata\bundler.js:264:57)
    at createReference (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\@angular\compiler-cli\src\metadata\bundler.js:390:23)
    at MetadataBundler.convertReference (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\@angular\compiler-cli\src\metadata\bundler.js:438:24)
    at MetadataBundler.convertExpression (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\@angular\compiler-cli\src\metadata\bundler.js:367:33)
    at MetadataBundler.convertValue (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\@angular\compiler-cli\src\metadata\bundler.js:348:25)
    at D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\@angular\compiler-cli\src\metadata\bundler.js:351:58
    at Array.map (<anonymous>)
    at MetadataBundler.convertValue (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\@angular\compiler-cli\src\metadata\bundler.js:351:26)
    at MetadataBundler.convertExpressionNode (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\@angular\compiler-cli\src\metadata\bundler.js:469:32)
    at MetadataBundler.convertExpression (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\@angular\compiler-cli\src\metadata\bundler.js:369:33)

npm ERR! code ELIFECYCLE
npm ERR! errno 2
npm ERR! @nationalbankbelgium/stark-core@0.0.0-PLACEHOLDER-VERSION ngc: `ngc`
npm ERR! Exit status 2
```

#### <a id="ngcErrorKindUndefined"></a>TypeError: Cannot read property 'kind' of undefined

In the cases we already saw, it was linked to the class-validator decorator 'ValidateIf'.

Our mistake was we declared a function inside the decorate which triggered an error in NGC.

```typescript
// The following code is not working
export class StarkApplicationConfigImpl implements StarkApplicationConfig {
	@ValidateIf((appConfig: StarkApplicationConfig) => appConfig.loggingFlushDisabled !== true)
	@IsDefined()
	@IsString()
	@autoserialize
	public loggingFlushApplicationId?: string;
}

// The following code is working
export class StarkApplicationConfigImpl implements StarkApplicationConfig {
	@ValidateIf(StarkApplicationConfigImpl.validateIfLoggingFlushEnabled)
	@IsDefined()
	@IsString()
	@autoserialize
	public loggingFlushApplicationId?: string;

	// ...

	public static validateIfLoggingFlushEnabled(instance: StarkApplicationConfig): boolean {
		return instance.loggingFlushDisabled !== true;
	}
}
```

```bash
> ngc

: TypeError: Cannot read property 'kind' of undefined
    at nodeCanBeDecorated (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:8376:36)
    at nodeIsDecorated (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:8396:16)
    at Object.nodeOrChildIsDecorated (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:8400:16)
    at isDecoratedClassElement (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:53700:23)
    at isInstanceDecoratedClassElement (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:53691:20)
    at Object.filter (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:1687:31)
    at getDecoratedClassElements (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:53673:23)
    at generateClassElementDecorationExpressions (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:53847:27)
    at addClassElementDecorationStatements (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:53836:44)
    at visitClassDeclaration (D:\DEV\GIT\NBB\stark\packages\stark-core\node_modules\typescript\lib\typescript.js:53162:13)

npm ERR! code ELIFECYCLE
npm ERR! errno 2
npm ERR! @nationalbankbelgium/stark-core@0.0.0-PLACEHOLDER-VERSION ngc: `ngc`
npm ERR! Exit status 2
```

## <a id="rollupErrors"></a>Rollup errors

#### <a id="rollupErrorUnresolvedDeps"></a>(!) Unresolved dependencies detected

Can be solved by modifying rollup.config.common-data.js file in stark/packages.
You can simply add the missing dependencies as following:

```js
// This configuration file contains common values we can reuse in the different rollup configuration files (at least parts of)
// ...

const globals = {
	// ...
	"rxjs/observable/timer": "rxjs.observable.timer",
	"rxjs/observable/throw": "rxjs.observable.throw"
	// ...
};
```

Please ignore tslib unresolved dependency.

```bash
(!) Unresolved dependencies
https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency
tslib (imported by dist\packages\stark-core\src\configuration\entities\language\language.entity.js, dist\packages\stark-core\src\configuration\entities\metadata\application-metadata.entity.js, dist\packages\stark-core\src\configuration\entities\application\app-config.entity.js, dist\packages\stark-core\src\http\entities\backend\backend.entity.js, dist\packages\stark-core\src\http\builder\http-abstract-fetch-resource-request-builder.js, dist\packages\stark-core\src\http\builder\http-request-builder.js, dist\packages\stark-core\src\http\entities\error\http-error.entity.js, dist\packages\stark-core\src\http\entities\error\http-error-base.entity.js, dist\packages\stark-core\src\http\entities\error\http-error-detail.entity.js, dist\packages\stark-core\src\http\entities\metadata\collection-metadata.entity.js, dist\packages\stark-core\src\http\entities\metadata\metadata-sort-item.entity.js, dist\packages\stark-core\src\http\entities\metadata\metadata-pagination.entity.js, dist\packages\stark-core\src\http\entities\metadata\single-item-metadata.entity.js, dist\packages\stark-core\src\http\serializer\http-discriminator-serializer.js, dist\packages\stark-core\src\logging\entities\logging.entity.js, dist\packages\stark-core\src\logging\entities\log-message.entity.js, dist\packages\stark-core\src\logging\reducers\logging.reducer.js)
rxjs/observable/timer (imported by dist\packages\stark-core\src\http\services\http.service.js)
rxjs/observable/throw (imported by dist\packages\stark-core\src\http\services\http.service.js)
```
