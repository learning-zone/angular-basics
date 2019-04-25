<a name="10.0.0-beta.0"></a>
# [10.0.0-beta.0](https://github.com/nationalbankbelgium/stark/compare/10.0.0-alpha.5...10.0.0-beta.0) (2018-09-27)


### Bug Fixes

* **stark-core:** fix failing XSRF service test ([c3d2589](https://github.com/nationalbankbelgium/stark/commit/c3d2589))


### Features

* **all:** add session pages ([4d13687](https://github.com/nationalbankbelgium/stark/commit/4d13687)), closes [#407](https://github.com/nationalbankbelgium/stark/issues/407) [#408](https://github.com/nationalbankbelgium/stark/issues/408) [#409](https://github.com/nationalbankbelgium/stark/issues/409) [#410](https://github.com/nationalbankbelgium/stark/issues/410)
* **showcase:** improve showcase and move styles from showcase to stark-ui _base ([be80748](https://github.com/nationalbankbelgium/stark/commit/be80748))
* **stark-core:** implement Stark XSRF module ([e82ed0d](https://github.com/nationalbankbelgium/stark/commit/e82ed0d)), closes [#115](https://github.com/nationalbankbelgium/stark/issues/115)
* **stark-ui:** cards standardization ([87da0ef](https://github.com/nationalbankbelgium/stark/commit/87da0ef)), closes [#646](https://github.com/nationalbankbelgium/stark/issues/646)
* **stark-ui:** color settings ([fcd12d5](https://github.com/nationalbankbelgium/stark/commit/fcd12d5)), closes [#662](https://github.com/nationalbankbelgium/stark/issues/662)
* **stark-ui:** implement collapsible feature ([44669a1](https://github.com/nationalbankbelgium/stark/commit/44669a1)), closes [#595](https://github.com/nationalbankbelgium/stark/issues/595)
* **stark-ui:** implement Pagination component. Integrate pagination in Table component ([96ae7b2](https://github.com/nationalbankbelgium/stark/commit/96ae7b2)), closes [#539](https://github.com/nationalbankbelgium/stark/issues/539) [#514](https://github.com/nationalbankbelgium/stark/issues/514)
* **stark-ui:** implement toast notification feature ([98390c2](https://github.com/nationalbankbelgium/stark/commit/98390c2))
* **stark-ui:** implements footer component ([2fca5c8](https://github.com/nationalbankbelgium/stark/commit/2fca5c8))
* **stark-ui:** language-selector: implement component/module ([38cbd68](https://github.com/nationalbankbelgium/stark/commit/38cbd68)), closes [#564](https://github.com/nationalbankbelgium/stark/issues/564)
* **stark-ui:** typography + Spaces ([8a5675d](https://github.com/nationalbankbelgium/stark/commit/8a5675d)), closes [#475](https://github.com/nationalbankbelgium/stark/issues/475) [#671](https://github.com/nationalbankbelgium/stark/issues/671)
* **starter:** update Starter to keep in sync with Showcase ([b0ffd95](https://github.com/nationalbankbelgium/stark/commit/b0ffd95))



<a name="10.0.0-alpha.5"></a>
# [10.0.0-alpha.5](https://github.com/nationalbankbelgium/stark/compare/10.0.0-alpha.4...10.0.0-alpha.5) (2018-09-07)


### Bug Fixes

* **build:** add an argument for build prod when it is a Test CI. Adapt travis.yml to use it ([b954903](https://github.com/nationalbankbelgium/stark/commit/b954903)), closes [#572](https://github.com/nationalbankbelgium/stark/issues/572) [#566](https://github.com/nationalbankbelgium/stark/issues/566)
* **build-main:** fix version of greenkeeper-lockfile which is installed during travis build ([1970b71](https://github.com/nationalbankbelgium/stark/commit/1970b71))
* **build-main:** remove custom value for TRAVIS variable ([f00d63a](https://github.com/nationalbankbelgium/stark/commit/f00d63a)), closes [#605](https://github.com/nationalbankbelgium/stark/issues/605)
* **greenkeeper:** fix greenkeeper for updating package-lock ([000a4a5](https://github.com/nationalbankbelgium/stark/commit/000a4a5))
* **greenkeeper:** fix greenkeeper-lockfile ([865fee0](https://github.com/nationalbankbelgium/stark/commit/865fee0))
* **release:** add "package-lock.json" to the set of files to be updated by release-it ([ac7c85c](https://github.com/nationalbankbelgium/stark/commit/ac7c85c)), closes [#574](https://github.com/nationalbankbelgium/stark/issues/574)
* **release:** fix wrong pushRepo option in release-it according to the latest version ([5992603](https://github.com/nationalbankbelgium/stark/commit/5992603)), closes [#669](https://github.com/nationalbankbelgium/stark/issues/669)
* **stark-all:** change BrowserModule for CommonModule. Rearrange styles in showcase. Improve build script ([83cf5c9](https://github.com/nationalbankbelgium/stark/commit/83cf5c9))
* **stark-all:** upgrade lint-staged to 7.2.2 to fix weird validation warning ([62b0b4a](https://github.com/nationalbankbelgium/stark/commit/62b0b4a)), closes [#666](https://github.com/nationalbankbelgium/stark/issues/666)
* **stark-core:** added lodash dependency ([649ce6e](https://github.com/nationalbankbelgium/stark/commit/649ce6e)), closes [#630](https://github.com/nationalbankbelgium/stark/issues/630)
* **stark-demo:** adapt ExampleViewer to fetch example fiiles targeting the right url. Rename title input to prevent weird tooltip. ([491fd99](https://github.com/nationalbankbelgium/stark/commit/491fd99)), closes [#575](https://github.com/nationalbankbelgium/stark/issues/575) [#580](https://github.com/nationalbankbelgium/stark/issues/580)
* **stark-demo:** add AppLogo back in the header after being accidentally removed ([4a13249](https://github.com/nationalbankbelgium/stark/commit/4a13249))
* **stark-demo:** add missing files and regex to the showcase url auto-replace script ([3db3270](https://github.com/nationalbankbelgium/stark/commit/3db3270)), closes [#571](https://github.com/nationalbankbelgium/stark/issues/571)
* **stark-demo:** hTML highlighting and 'Try it yourself' ([f5114f7](https://github.com/nationalbankbelgium/stark/commit/f5114f7)), closes [#601](https://github.com/nationalbankbelgium/stark/issues/601)
* **stark-ui:** button - align icon vertically ([f9015fb](https://github.com/nationalbankbelgium/stark/commit/f9015fb)), closes [#619](https://github.com/nationalbankbelgium/stark/issues/619)
* **stark-ui:** modify CSS and add App-Logo to Showcase ([90e2e05](https://github.com/nationalbankbelgium/stark/commit/90e2e05)), closes [#583](https://github.com/nationalbankbelgium/stark/issues/583)
* **stark-ui:** removed TranslateService from breadcrumb component ([f40027f](https://github.com/nationalbankbelgium/stark/commit/f40027f))


### Features

* **stark-core:** use the browser language as the default language ([561d288](https://github.com/nationalbankbelgium/stark/commit/561d288)), closes [#578](https://github.com/nationalbankbelgium/stark/issues/578)
* **stark-demo:** add Slider component to the Showcase Demo ([0c75595](https://github.com/nationalbankbelgium/stark/commit/0c75595)), closes [#561](https://github.com/nationalbankbelgium/stark/issues/561)
* **stark-demo:** style header in the showcase ([1804ca3](https://github.com/nationalbankbelgium/stark/commit/1804ca3)), closes [#570](https://github.com/nationalbankbelgium/stark/issues/570)
* **stark-ui:** added white theme and full width for dropdown component ([c8c998e](https://github.com/nationalbankbelgium/stark/commit/c8c998e)), closes [#642](https://github.com/nationalbankbelgium/stark/issues/642) [#640](https://github.com/nationalbankbelgium/stark/issues/640)
* **stark-ui:** date Picker Component ([705358c](https://github.com/nationalbankbelgium/stark/commit/705358c)), closes [#542](https://github.com/nationalbankbelgium/stark/issues/542)
* **stark-ui:** implement date range picker ([ab06b73](https://github.com/nationalbankbelgium/stark/commit/ab06b73)), closes [#586](https://github.com/nationalbankbelgium/stark/issues/586)
* **stark-ui:** implement the logout domponent/module ([74c2bba](https://github.com/nationalbankbelgium/stark/commit/74c2bba)), closes [#588](https://github.com/nationalbankbelgium/stark/issues/588)
* **stark-ui:** implementation of breadcrumb component ([8f2f129](https://github.com/nationalbankbelgium/stark/commit/8f2f129)), closes [#591](https://github.com/nationalbankbelgium/stark/issues/591)
* **stark-ui:** implementation of stark dropdown component ([40adf24](https://github.com/nationalbankbelgium/stark/commit/40adf24)), closes [#447](https://github.com/nationalbankbelgium/stark/issues/447)
* **stark-ui:** implementation of the app sidebar ([09eeeea](https://github.com/nationalbankbelgium/stark/commit/09eeeea)), closes [#592](https://github.com/nationalbankbelgium/stark/issues/592)



<a name="10.0.0-alpha.4"></a>
# [10.0.0-alpha.4](https://github.com/nationalbankbelgium/stark/compare/10.0.0-alpha.3...10.0.0-alpha.4) (2018-07-30)


### Bug Fixes

* **build:** adding quotes arround the Prettier parameters to fix an issue on MacOS. ([ff1188b](https://github.com/nationalbankbelgium/stark/commit/ff1188b))
* **stark-core:** fix circular dependencies detected by Rollup ([0620d7b](https://github.com/nationalbankbelgium/stark/commit/0620d7b)), closes [#530](https://github.com/nationalbankbelgium/stark/issues/530)
* **stark-core:** refactor AbstractStarkMain to enable Angular prod mode before bootstraping the app ([bb319fa](https://github.com/nationalbankbelgium/stark/commit/bb319fa))
* **stark-demo:** add baseHref dynamically via Angular provider to fix Showcase when published in GitHub pages ([cfc8592](https://github.com/nationalbankbelgium/stark/commit/cfc8592)), closes [#466](https://github.com/nationalbankbelgium/stark/issues/466)
* **stark-demo:** adding StarkLoggingService to the ExampleViewer tests ([380a60d](https://github.com/nationalbankbelgium/stark/commit/380a60d)), closes [#484](https://github.com/nationalbankbelgium/stark/issues/484)
* **stark-demo:** fix baseHref in angular.json file ([2a36276](https://github.com/nationalbankbelgium/stark/commit/2a36276))
* **stark-demo:** fix pretty-print demo translations ([3999ff9](https://github.com/nationalbankbelgium/stark/commit/3999ff9))
* **stark-demo:** revert PR [#471](https://github.com/nationalbankbelgium/stark/issues/471). Adapt baseHref/deployUrl automatically via Node script to fix Showcase when published in GitHub pages ([f9dadfd](https://github.com/nationalbankbelgium/stark/commit/f9dadfd))
* **stark-ui:** fix unresolved dependencies detected by Rollup ([a1d9487](https://github.com/nationalbankbelgium/stark/commit/a1d9487)), closes [#532](https://github.com/nationalbankbelgium/stark/issues/532)
* **stark-ui:** include only "src" and "assets" folders in "lint-css" command on stark-ui and stark-core ([a1c3a4f](https://github.com/nationalbankbelgium/stark/commit/a1c3a4f))
* **stark-ui:** tooltip translation + table translation ([12dd3b3](https://github.com/nationalbankbelgium/stark/commit/12dd3b3)), closes [#502](https://github.com/nationalbankbelgium/stark/issues/502)


### Features

* **core:** integrated bootstrap ([97ca29e](https://github.com/nationalbankbelgium/stark/commit/97ca29e)), closes [#112](https://github.com/nationalbankbelgium/stark/issues/112) [#412](https://github.com/nationalbankbelgium/stark/issues/412)
* **stark-all:** enable npm ci for travis + add package-lock.json + force registry.npmjs.org as registry ([f47d610](https://github.com/nationalbankbelgium/stark/commit/f47d610)), closes [#43](https://github.com/nationalbankbelgium/stark/issues/43)
* **stark-build:** add support for environment variables at runtime (importing environment.ts file) and at compilation time (using webpack Define plugin) ([c29e36b](https://github.com/nationalbankbelgium/stark/commit/c29e36b)), closes [#50](https://github.com/nationalbankbelgium/stark/issues/50)
* **stark-build:** added html-element-webpack-plugin to handle head section in index.html ([ce089c8](https://github.com/nationalbankbelgium/stark/commit/ce089c8)), closes [#60](https://github.com/nationalbankbelgium/stark/issues/60)
* **stark-core:** add [@ngrx-store-devtools](https://github.com/ngrx-store-devtools) package. Integrate store dev tools in showcase and starter ([b9c9179](https://github.com/nationalbankbelgium/stark/commit/b9c9179)), closes [#81](https://github.com/nationalbankbelgium/stark/issues/81) [#117](https://github.com/nationalbankbelgium/stark/issues/117)
* **stark-core:** http-service: isolate NBB specifics ([e58afa7](https://github.com/nationalbankbelgium/stark/commit/e58afa7)), closes [#257](https://github.com/nationalbankbelgium/stark/issues/257)
* **stark-demo:** add pretty-print component to Showcase Demo ([93557cb](https://github.com/nationalbankbelgium/stark/commit/93557cb)), closes [#496](https://github.com/nationalbankbelgium/stark/issues/496)
* **stark-ui:** action Bar Component ([d1dd733](https://github.com/nationalbankbelgium/stark/commit/d1dd733)), closes [#481](https://github.com/nationalbankbelgium/stark/issues/481)
* **stark-ui:** add Prettier and use it for all the supported types of data ([5b06aef](https://github.com/nationalbankbelgium/stark/commit/5b06aef)), closes [#500](https://github.com/nationalbankbelgium/stark/issues/500)
* **stark-ui:** add stark-action-bar into stark-table ([d3a2c6d](https://github.com/nationalbankbelgium/stark/commit/d3a2c6d)), closes [#512](https://github.com/nationalbankbelgium/stark/issues/512)
* **stark-ui:** example Viewer + basic showcase layout ([ff675c8](https://github.com/nationalbankbelgium/stark/commit/ff675c8)), closes [#458](https://github.com/nationalbankbelgium/stark/issues/458) [#459](https://github.com/nationalbankbelgium/stark/issues/459)
* **stark-ui:** implement OnEnterKey directive. Create KeyboardDirectives module ([0696959](https://github.com/nationalbankbelgium/stark/commit/0696959)), closes [#538](https://github.com/nationalbankbelgium/stark/issues/538)
* **stark-ui:** implement RestrictInput directive and module ([b8bd5be](https://github.com/nationalbankbelgium/stark/commit/b8bd5be)), closes [#546](https://github.com/nationalbankbelgium/stark/issues/546) [#550](https://github.com/nationalbankbelgium/stark/issues/550)
* **stark-ui:** implement the Stark-Pretty-Print component ([22f84b6](https://github.com/nationalbankbelgium/stark/commit/22f84b6)), closes [#494](https://github.com/nationalbankbelgium/stark/issues/494) [#496](https://github.com/nationalbankbelgium/stark/issues/496)
* **stark-ui:** implement the Stark-Slider component ([fd6d03d](https://github.com/nationalbankbelgium/stark/commit/fd6d03d)), closes [#448](https://github.com/nationalbankbelgium/stark/issues/448)
* **stark-ui:** implementation of the button's theme ([c49b6ef](https://github.com/nationalbankbelgium/stark/commit/c49b6ef)), closes [#476](https://github.com/nationalbankbelgium/stark/issues/476)
* **stark-ui:** import old stark ui global theming ([9ac8dde](https://github.com/nationalbankbelgium/stark/commit/9ac8dde)), closes [#456](https://github.com/nationalbankbelgium/stark/issues/456) [#472](https://github.com/nationalbankbelgium/stark/issues/472)
* **stark-ui:** improve example viewer styling ([bad3746](https://github.com/nationalbankbelgium/stark/commit/bad3746)), closes [#515](https://github.com/nationalbankbelgium/stark/issues/515)
* **stark-ui:** initial implementation of Stark Table component (supporting nested data, sorting and filtering) ([80e86c3](https://github.com/nationalbankbelgium/stark/commit/80e86c3))


### Performance Improvements

* **build-main:** adapt "npm install" commands to prevent optional dependencies from being installed. Enable parallelization in webpack prod config. ([020a5f4](https://github.com/nationalbankbelgium/stark/commit/020a5f4))



<a name="10.0.0-alpha.3"></a>
# [10.0.0-alpha.3](https://github.com/nationalbankbelgium/stark/compare/10.0.0-alpha.2...10.0.0-alpha.3) (2018-06-26)


### Bug Fixes

* **build:** adapted the perl command to specify the backup file extension. This was necessary for some perl versions ([ec4afc6](https://github.com/nationalbankbelgium/stark/commit/ec4afc6))
* **build:** fix issue in build-utils with environment. Environment file was not replaced as it should. ([d21a837](https://github.com/nationalbankbelgium/stark/commit/d21a837)), closes [#439](https://github.com/nationalbankbelgium/stark/issues/439)
* **build:** fix sourcemaps in PROD and in DEV ([c8c5696](https://github.com/nationalbankbelgium/stark/commit/c8c5696)), closes [#401](https://github.com/nationalbankbelgium/stark/issues/401)
* **build:** fixed webpack config and circular-dependency-plugin config. Closes [#397](https://github.com/nationalbankbelgium/stark/issues/397), [#315](https://github.com/nationalbankbelgium/stark/issues/315) ([ea9c264](https://github.com/nationalbankbelgium/stark/commit/ea9c264))
* **build-main:** add support for circular dependency warning. Fix rollup external dependencies ([ebd0fd1](https://github.com/nationalbankbelgium/stark/commit/ebd0fd1))
* **build-main:** move ng dependencies to ROOT of Stark. Fix issue in build process. Rename tsconfig ([c7fecdb](https://github.com/nationalbankbelgium/stark/commit/c7fecdb)), closes [#361](https://github.com/nationalbankbelgium/stark/issues/361) [#362](https://github.com/nationalbankbelgium/stark/issues/362)
* **release:** adapt release-it.json and commitlint scopes to fix "release" command failure ([0e05826](https://github.com/nationalbankbelgium/stark/commit/0e05826))
* **stark-all:** add npx for the remaining script calling global rimraf package ([3ce0dac](https://github.com/nationalbankbelgium/stark/commit/3ce0dac))
* **stark-all:** fix nightly build release on Travis ([2c2445c](https://github.com/nationalbankbelgium/stark/commit/2c2445c)), closes [#357](https://github.com/nationalbankbelgium/stark/issues/357)
* **stark-all:** fix some imports and remove obsolete fixme's. Format code with Prettier. Fix stark-ui linting. ([daf258b](https://github.com/nationalbankbelgium/stark/commit/daf258b))
* **stark-all:** packages: building the stark-core and stark-ui packages with the ncg script fails ([139e47b](https://github.com/nationalbankbelgium/stark/commit/139e47b)), closes [#441](https://github.com/nationalbankbelgium/stark/issues/441)
* **stark-build:** include postcss loader+plugins to the Webpack css and scss files processing ([ffd60e7](https://github.com/nationalbankbelgium/stark/commit/ffd60e7))
* **stark-build) fix(stark-starter:** fix webpack monitor issues with reports folder and HMR ([78c799f](https://github.com/nationalbankbelgium/stark/commit/78c799f))
* **stark-core:** add missing barrel for common folder. Fix stark-core translations utils imports. ([febb69b](https://github.com/nationalbankbelgium/stark/commit/febb69b))
* **stark-starter:** fix blocking issue for reports folder ([1b7d492](https://github.com/nationalbankbelgium/stark/commit/1b7d492)), closes [#356](https://github.com/nationalbankbelgium/stark/issues/356)
* **stark-ui) fix(stark-testing:** add stark-ui package to the npm install:all script. Simplify customization of default Karma config. ([4f77730](https://github.com/nationalbankbelgium/stark/commit/4f77730))


### Features

* **build:** add support for custom baseHref and deployUrl in angular-cli.json file with BaseHrefWebpackPlugin ([cf941bd](https://github.com/nationalbankbelgium/stark/commit/cf941bd)), closes [#148](https://github.com/nationalbankbelgium/stark/issues/148)
* **build:** add support for publishing api docs and showcase using Travis. Closes [#282](https://github.com/nationalbankbelgium/stark/issues/282) ([f38ff86](https://github.com/nationalbankbelgium/stark/commit/f38ff86))
* **build:** add webpackMonitor ([ee46bef](https://github.com/nationalbankbelgium/stark/commit/ee46bef)), closes [#322](https://github.com/nationalbankbelgium/stark/issues/322)
* **build:** added changelog generation. Closes [#335](https://github.com/nationalbankbelgium/stark/issues/335) ([e06ba53](https://github.com/nationalbankbelgium/stark/commit/e06ba53))
* **core:** validate the AppConfig in every service where it is injected ([dd41aa5](https://github.com/nationalbankbelgium/stark/commit/dd41aa5)), closes [#382](https://github.com/nationalbankbelgium/stark/issues/382)
* **docs:** added API docs generation to packages and starter. Closes [#127](https://github.com/nationalbankbelgium/stark/issues/127) ([50c610f](https://github.com/nationalbankbelgium/stark/commit/50c610f))
* **docs:** added TSlint rules and adapted documentation for the project ([14cb90f](https://github.com/nationalbankbelgium/stark/commit/14cb90f)), closes [#424](https://github.com/nationalbankbelgium/stark/issues/424) [#389](https://github.com/nationalbankbelgium/stark/issues/389)
* **docs:** improved API docs generation with watch mode and coverage checks ([60701c8](https://github.com/nationalbankbelgium/stark/commit/60701c8))
* **showcase:** added showcase, cleaned up start and got rid of old testing cfg. Closes [#395](https://github.com/nationalbankbelgium/stark/issues/395) [#353](https://github.com/nationalbankbelgium/stark/issues/353). Contributes to [#130](https://github.com/nationalbankbelgium/stark/issues/130) and [#63](https://github.com/nationalbankbelgium/stark/issues/63) ([abeefe7](https://github.com/nationalbankbelgium/stark/commit/abeefe7))
* **stark-all:** add commitizen + commitlint with scripts, config & dependencies ([1cb59c2](https://github.com/nationalbankbelgium/stark/commit/1cb59c2)), closes [#290](https://github.com/nationalbankbelgium/stark/issues/290)
* **stark-all:** enable resourcesInlining once we have Angular 6 for inlining template in components ([9b33ccd](https://github.com/nationalbankbelgium/stark/commit/9b33ccd)), closes [#376](https://github.com/nationalbankbelgium/stark/issues/376)
* **stark-all:** integrate SonarTS to current TSLint checks. Refactor code to fix TSLint violations. ([8627ab4](https://github.com/nationalbankbelgium/stark/commit/8627ab4)), closes [#331](https://github.com/nationalbankbelgium/stark/issues/331)
* **stark-all:** move dev dependencies from packages to ROOT of project + Fix source-map-loader issue ([98d2bc0](https://github.com/nationalbankbelgium/stark/commit/98d2bc0)), closes [#371](https://github.com/nationalbankbelgium/stark/issues/371)
* **stark-all:** update to Angular 6, Rxjs 6, Webpack 4, TypeScript 2.7.2 ([862d10a](https://github.com/nationalbankbelgium/stark/commit/862d10a)), closes [#359](https://github.com/nationalbankbelgium/stark/issues/359) [#258](https://github.com/nationalbankbelgium/stark/issues/258) [#19](https://github.com/nationalbankbelgium/stark/issues/19)
* **stark-demo:** cleanup of Stark Showcase application ([c0a0163](https://github.com/nationalbankbelgium/stark/commit/c0a0163)), closes [#422](https://github.com/nationalbankbelgium/stark/issues/422)
* **stark-starter:** add NgIdleKeepAlive module in app module ([305989b](https://github.com/nationalbankbelgium/stark/commit/305989b)), closes [#261](https://github.com/nationalbankbelgium/stark/issues/261)
* **stark-ui:** implement SvgViewBox directive to enable resizing of Angular Material's mat-icon directive ([b4dc8ec](https://github.com/nationalbankbelgium/stark/commit/b4dc8ec)), closes [#455](https://github.com/nationalbankbelgium/stark/issues/455)
* **translation:** add functionality to enable the use of translations in Stark modules ([fbdfc25](https://github.com/nationalbankbelgium/stark/commit/fbdfc25))
* **ui:** add material theming ([9b03c06](https://github.com/nationalbankbelgium/stark/commit/9b03c06))
* **ui:** create stark-ui package. Implement AppLogo module in Stark. ([ffaeacd](https://github.com/nationalbankbelgium/stark/commit/ffaeacd)), closes [#101](https://github.com/nationalbankbelgium/stark/issues/101)
* **ui:** integrate [@mdi](https://github.com/mdi)/angular-material icons ([1e30ab7](https://github.com/nationalbankbelgium/stark/commit/1e30ab7)), closes [#123](https://github.com/nationalbankbelgium/stark/issues/123)



<a name="10.0.0-alpha.2"></a>
# [10.0.0-alpha.2](https://github.com/nationalbankbelgium/stark/compare/80d09ce...10.0.0-alpha.2) (2018-04-25)


### Bug Fixes

* **build:** Disable i18n rule for Codelyzer ([50a203d](https://github.com/nationalbankbelgium/stark/commit/50a203d))
* **build:** Fix Import bracket rule for prettier and tslint ([41562db](https://github.com/nationalbankbelgium/stark/commit/41562db))
* **build:** fixed issue with prettier config name with webpack plugin and added new scripts at root ([51be4f6](https://github.com/nationalbankbelgium/stark/commit/51be4f6))
* **core:** fix for validation module related to requested changes ([09a388d](https://github.com/nationalbankbelgium/stark/commit/09a388d))
* **core:** fix ngc issues and clean-up code in stark-core. Integrate AppMetadata in Starter ([5299842](https://github.com/nationalbankbelgium/stark/commit/5299842))
* **http:** fix unit tests. Enhance http demo in Starter ([#268](https://github.com/nationalbankbelgium/stark/issues/268)) ([6d609b8](https://github.com/nationalbankbelgium/stark/commit/6d609b8)), closes [#68](https://github.com/nationalbankbelgium/stark/issues/68) [#68](https://github.com/nationalbankbelgium/stark/issues/68) [#84](https://github.com/nationalbankbelgium/stark/issues/84) [#93](https://github.com/nationalbankbelgium/stark/issues/93) [angular/zone.js#1015](https://github.com/angular/zone.js/issues/1015) [#96](https://github.com/nationalbankbelgium/stark/issues/96)
* **lazy-loading:** Remove PreloadAllModules preloading strategy from routing coneiguration to make lazy-loaded modules to be actually lazy loaded :) ([9634dac](https://github.com/nationalbankbelgium/stark/commit/9634dac))
* **lazy-loading:** Remove PreloadAllModules preloading strategy from routing coneiguration tz makz lazz-loaded modules to be actually lazy loaded :) ([80d09ce](https://github.com/nationalbankbelgium/stark/commit/80d09ce))
* **linting:** clean stark-build/tslint.json. Remove obsolete options for 'ban' rule ([86ed26c](https://github.com/nationalbankbelgium/stark/commit/86ed26c))
* **linting:** fix some TS linting issues ([8d5d6a8](https://github.com/nationalbankbelgium/stark/commit/8d5d6a8))
* **logging:** uncomment reducer implementation in logging.module.ts ([07a5f0e](https://github.com/nationalbankbelgium/stark/commit/07a5f0e))
* **ngrx-store:** use ngrx store feature selectors in Stark Core modules. Use store-freeze and store-logger meta-reducers in Starter ([916c435](https://github.com/nationalbankbelgium/stark/commit/916c435))
* **rollup:** add ibantools to external dependencies ([9606ecc](https://github.com/nationalbankbelgium/stark/commit/9606ecc))
* Use latest rxjs forward-compat to solve ErrorObservable issues ([28c7ceb](https://github.com/nationalbankbelgium/stark/commit/28c7ceb))


### Features

* **build:** added .gitattributes. Closes [#144](https://github.com/nationalbankbelgium/stark/issues/144). ([b4c3ef2](https://github.com/nationalbankbelgium/stark/commit/b4c3ef2))
* **build:** added release and publish support. Closes [#54](https://github.com/nationalbankbelgium/stark/issues/54). Closes [#24](https://github.com/nationalbankbelgium/stark/issues/24). Closes [#27](https://github.com/nationalbankbelgium/stark/issues/27) ([101ceab](https://github.com/nationalbankbelgium/stark/commit/101ceab))
* **build:** added support for building a subset of the packages ([55ec4c1](https://github.com/nationalbankbelgium/stark/commit/55ec4c1))
* **coverage:** add support for code coverage with Coveralls ([72aefce](https://github.com/nationalbankbelgium/stark/commit/72aefce))
* **http:** correction for imports ([464566a](https://github.com/nationalbankbelgium/stark/commit/464566a))
* **http:** create StarkHttp module. Fixed imports. Implemented small demo in Starter [[#96](https://github.com/nationalbankbelgium/stark/issues/96)] ([201edb8](https://github.com/nationalbankbelgium/stark/commit/201edb8))
* **http:** implement Stark Http in stark-core (unit tests to be completed) [[#96](https://github.com/nationalbankbelgium/stark/issues/96)] ([719d92d](https://github.com/nationalbankbelgium/stark/commit/719d92d))
* **http:** implement Stark Http in stark-core (unit tests to be completed) [[#96](https://github.com/nationalbankbelgium/stark/issues/96)] ([579c59b](https://github.com/nationalbankbelgium/stark/commit/579c59b))
* **logging:** create StarkLogging module. Fixed imports ([f3684db](https://github.com/nationalbankbelgium/stark/commit/f3684db))
* **logging:** implement STARK_APP_CONFIG token and implement Stark logging in Starter ([ec09736](https://github.com/nationalbankbelgium/stark/commit/ec09736))
* **polyfills:** Update polyfills.browser.ts with the relevant polyfills needed only for IE11 and some special features from Angular. Add needed npm dependencies for those polyfils ([2b6a160](https://github.com/nationalbankbelgium/stark/commit/2b6a160))
* **routing:** adapt CSP style-src directive to allow inline styles from UI Router visualizer ([8a1a8fa](https://github.com/nationalbankbelgium/stark/commit/8a1a8fa))
* **routing:** add UI Router visualizer. Adapt CSP img-src directive to allow png images from UI Router visualizer ([3bc995b](https://github.com/nationalbankbelgium/stark/commit/3bc995b))
* **routing:** replace Angular Router by UI Router ([24b70d4](https://github.com/nationalbankbelgium/stark/commit/24b70d4))
* **session:** add actions, entities, reducers and services for session module ([2dad18c](https://github.com/nationalbankbelgium/stark/commit/2dad18c))
* **session:** Correction relative to PR requested changes for session module ([4290029](https://github.com/nationalbankbelgium/stark/commit/4290029))
* **stark-testing:** create separate stark-testing package and use it in all stark packages and starter ([#267](https://github.com/nationalbankbelgium/stark/issues/267)) ([204dc35](https://github.com/nationalbankbelgium/stark/commit/204dc35)), closes [#68](https://github.com/nationalbankbelgium/stark/issues/68) [#68](https://github.com/nationalbankbelgium/stark/issues/68) [#84](https://github.com/nationalbankbelgium/stark/issues/84) [#93](https://github.com/nationalbankbelgium/stark/issues/93) [angular/zone.js#1015](https://github.com/angular/zone.js/issues/1015)
* **user:** add entities for user module ([38c48fe](https://github.com/nationalbankbelgium/stark/commit/38c48fe))



