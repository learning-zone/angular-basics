import { Component, ElementRef, Inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewEncapsulation } from "@angular/core";

/* tslint:disable:no-duplicate-imports no-import-side-effect */
import * as Prism from "prismjs";
import { LanguageDefinition } from "prismjs";
// prism loads these languages by default: "css", "clike", "javascript" and "markup" (which includes "xml", "html", "mathml", "svg")
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-sql.min.js";
import "prismjs/components/prism-json.min.js";
import "prismjs/components/prism-css-extras.min.js";
import "prismjs/components/prism-scss.min.js";
/* tslint:enable */

import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

/**
 * Name of the component
 */
const componentName: string = "stark-pretty-print";

/**
 * The prefix used in the PrismJs css classes
 */
const prismClassPrefix: string = "language-";

/**
 * A reference to the prettier library
 */
const prettier: any = require("prettier/standalone");

/**
 * A reference to the prettier plugins
 */
const prettierPlugins: any = [
	require("prettier/parser-babylon"),
	require("prettier/parser-postcss"),
	require("prettier/parser-typescript")
];

/**
 * A reference to the prettyData library
 */
const prettyData: any = require("pretty-data").pd;

/**
 * The code languages that are supported by the Stark-Pretty-Print component
 */
export type StarkPrettyPrintFormat = "css" | "scss" | "html" | "xml" | "json" | "sql" | "javascript" | "typescript";

/**
 * Component to format and highlight code like HTML, CSS, Typescript...
 * Can be used to display code examples
 *
 * To be able to highlight the pretty-printed code, a CSS file from the PrismJS library is needed.
 * The CSS file of your choice needs to be imported in your client application that uses stark-ui as follows:
 *
 * ```css
 * .@import "~prismjs/themes/prism-okaidia.css";
 * ```
 *
 * The different themes are shown on the PrismJS website
 *   - {@link https://prismjs.com/|PrismJS website}
 *   - {@link https://github.com/PrismJS/prism/tree/master/themes|PrismJS theme files}
 */
@Component({
	selector: "stark-pretty-print",
	templateUrl: "./pretty-print.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkPrettyPrintComponent extends AbstractStarkUiComponent implements OnChanges, OnInit {
	/**
	 * The text to be pretty printed
	 */
	@Input()
	public data: string;

	/**
	 * The format to be used to pretty print the data string
	 */
	@Input()
	public format: StarkPrettyPrintFormat;

	/**
	 * If true, also highlight the pretty printed string
	 */
	@Input()
	public enableHighlighting?: boolean;

	/**
	 * The final prettified string
	 */
	public prettyString: string;

	/**
	 * Whether the prettified string should be highlighted as well
	 */
	public highlightingEnabled: boolean;

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		protected renderer: Renderer2,
		protected elementRef: ElementRef
	) {
		super(renderer, elementRef);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": component initialized");
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnChanges(_onChangesObj: SimpleChanges): void {
		if (!this.data || !this.format) {
			this.prettyString = this.data;
			return;
		}

		this.format = <StarkPrettyPrintFormat>this.format.toLowerCase();
		this.highlightingEnabled = !!this.enableHighlighting;
		this.prettyString = "";

		if (this.data && this.data.length > 0) {
			let prismGrammar: LanguageDefinition = <any>"";
			let prismClass: string = "";

			try {
				switch (this.format) {
					case "xml":
					case "html":
						prismGrammar = Prism.languages.markup;
						prismClass = prismClassPrefix + "markup";
						this.prettyString = prettyData.xml(this.data);
						break;

					case "json":
						prismGrammar = Prism.languages.json;
						prismClass = prismClassPrefix + this.format;
						JSON.parse(this.data);
						this.prettyString = prettier.format(this.data, { parser: "json", plugins: prettierPlugins });
						break;

					case "css":
						prismGrammar = Prism.languages.css;
						prismClass = prismClassPrefix + this.format;
						this.prettyString = prettier.format(this.data, { parser: "css", plugins: prettierPlugins });
						break;

					case "scss":
						prismGrammar = Prism.languages.scss;
						prismClass = prismClassPrefix + this.format;
						this.prettyString = prettier.format(this.data, { parser: "scss", plugins: prettierPlugins });
						break;

					case "sql":
						prismGrammar = Prism.languages.sql;
						prismClass = prismClassPrefix + this.format;
						this.prettyString = prettyData.sql(this.data);
						break;

					case "javascript":
						prismGrammar = Prism.languages.javascript;
						prismClass = prismClassPrefix + this.format;
						this.prettyString = prettier.format(this.data, { parser: "babylon", plugins: prettierPlugins });
						break;

					case "typescript":
						prismGrammar = Prism.languages.typescript;
						prismClass = prismClassPrefix + this.format;
						this.prettyString = prettier.format(this.data, {
							parser: "typescript",
							plugins: prettierPlugins
						});
						break;

					default:
						this.logger.warn(componentName + ": Unknown format -> ", this.format);
						this.highlightingEnabled = false;
						this.prettyString = this.data;
						break;
				}
			} catch (e) {
				this.logger.warn(componentName + ": Invalid " + this.format + " data");
				// the data string might not be valid so it should be in a try-catch clause
				// in this case we just show the raw data
				this.prettyString = this.data;
				this.highlightingEnabled = false;
			}

			if (this.highlightingEnabled) {
				this.prettyString = Prism.highlight(this.prettyString, prismGrammar);
				this.prettyString =
					"<pre class='" + prismClass + "'><code class='" + prismClass + "'>" + this.prettyString + "</code></pre>";
			}
		}
	}
}
