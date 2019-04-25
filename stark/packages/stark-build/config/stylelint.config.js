module.exports = {
	extends: "stylelint-config-prettier",
	defaultSeverity: "error",
	rules: {
		"color-hex-length": [
			"short",
			{
				message: "Use short hex codes when possible to avoid unnecessary code."
			}
		],
		"color-named": [
			"never",
			{
				message: "No named colors are allowed because of consistency. Always use hex or rgba."
			}
		],
		"font-family-name-quotes": [
			"always-where-required",
			{
				message: "Quotes are required around font-family names when they are not valid CSS identifiers."
			}
		],
		"font-family-no-duplicate-names": [
			true,
			{
				message: "Avoid duplicate information."
			}
		],
		"font-family-no-missing-generic-family-keyword": [
			true,
			{
				message: "Always put at least one generic font family."
			}
		],
		"function-name-case": [
			"lower",
			{
				message: "Function names should be in lowercase following the CSS specification."
			}
		],
		"length-zero-no-unit": [
			true,
			{
				message: "Zero value should never have a unit to avoid unnecessary code."
			}
		],
		"unit-no-unknown": true,
		"value-keyword-case": [
			"lower",
			{
				message: "Keyword values should always be lowercase for consistency. Lower case is more readable."
			}
		],
		"value-no-vendor-prefix": [
			true,
			{
				message: "Don't use vendor prefixes: they are added when necessary by PostCSS."
			}
		],
		"property-no-unknown": true,
		"property-no-vendor-prefix": [
			true,
			{
				message: "Don't use vendor prefixes: they are added when necessary by PostCSS."
			}
		],
		"keyframe-declaration-no-important": [
			true,
			{
				message: "!important should only be used as a last resort and never in keyframe animations."
			}
		],
		"declaration-block-no-duplicate-properties": [
			true,
			{
				message: "All properties should only be defined once."
			}
		],
		"selector-attribute-operator-space-after": [
			"never",
			{
				message: "Never put spaces inside selector attributes to avoid unnecessary whitespace."
			}
		],
		"selector-attribute-operator-space-before": [
			"never",
			{
				message: "Never put spaces inside selector attributes to avoid unnecessary whitespace."
			}
		],
		"selector-max-id": [
			0,
			{
				message:
					"Never use #id as a selector: it is difficult to ensure ids are unique and because of their weight styles are difficult to override."
			}
		],
		"selector-pseudo-class-no-unknown": true,
		"selector-pseudo-element-colon-notation": [
			"double",
			{
				message: "Double colons (::) should be used instead of a single colon to distinguish pseudo-elements from pseudo-classes."
			}
		],
		"selector-pseudo-element-no-unknown": true,
		"selector-type-case": [
			"lower",
			{
				message: "Always use lowercase for tag name selectors for consistency and to improve readability."
			}
		],
		"media-feature-name-no-unknown": true,
		"media-feature-range-operator-space-after": [
			"never",
			{
				message: "Never put spaces inside media feature parentheses to avoid unnecessary whitespace."
			}
		],
		"media-feature-range-operator-space-before": [
			"never",
			{
				message: "Never put spaces inside media feature parentheses to avoid unnecessary whitespace."
			}
		],
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: ["each", "else", "for", "function", "if", "include", "mixin", "return"] /* SCSS-specific @-directives */
			}
		],
		"no-duplicate-at-import-rules": [
			true,
			{
				message: "Avoid duplicate @import rule within the same stylesheet."
			}
		],
		"no-invalid-double-slash-comments": [
			true,
			{
				message: "In CSS, double slashes do not indicate a single line comment. Use /*  */ instead."
			}
		],
		"no-unknown-animations": [
			true,
			{
				message: 'Check your code. The animation name "${animationName}" is not defined.'
			}
		]
	}

	/*These rules are handled by Prettier
  "function-comma-space-after": [
    "always",
    {
    "message": "Always put a space after commas in functions to be consistent and improve readability."
    }
  ],
  "function-comma-space-before": [
    "never",
    {
    "message": "Never put spaces before a comma to be consistent and improve readability."
    }
  ],
  "function-max-empty-lines": [
    0,
    {
    "message": "Avoid empty lines in functions to improve readability."
    }
  ],
  "string-quotes": [
	"double",
	{
		message: "Always use double quotes for consistency."
	}
  ],
  "value-list-comma-newline-before": [
    "never-multi-line",
    {
    "message": "In value lists, there should never be a space or a newline between a comma and a previous value."
    }
  ],
  "value-list-comma-space-after": [
    "always-single-line",
    {
    "message": "In single line value lists, there should always be a space after each comma for better readability."
    }
  ],
  "value-list-comma-space-before": [
    "never",
    {
    "message": "In value lists, there should never be a space or a newline between a comma and a previous value."
    }
  ],
  "value-list-max-empty-lines": [
    0,
    {
    "message": "Value lists should never contain empty lines to make them better visible as a group."
    }
  ],
  "declaration-bang-space-after": [
    "never",
    {
    "message": "!important should never contain spaces."
    }
  ],
  "declaration-bang-space-before": [
    "always",
    {
    "message": "!important should always be preceded by a space to improve readability."
    }
  ],
  "declaration-colon-space-after": [
    "always",
    {
    "message": "Always add a space after a declaration colon to improve readability."
    }
  ],
  "declaration-colon-space-before": [
    "never",
    {
    "message": "Never put a space between a declaration and the colon to avoid too much spaces."
    }
  ],
  "declaration-block-semicolon-newline-after": [
    "always",
    {
    "message": "Each property should be declared on a separate line to improve readability."
    }
  ],
  "declaration-block-semicolon-newline-before": [
    "never-multi-line",
    {
    "message": "Never put a newline before a semicolon to avoid unnecessary whitespace."
    }
  ],
  "declaration-block-semicolon-space-after": "always-single-line",
  "declaration-block-semicolon-space-before": [
    "never",
    {
    "message": "Never put a space before a semicolon to avoid unnecessary whitespace."
    }
  ],
  "declaration-block-trailing-semicolon": [
    "always",
    {
    "message": "The last declaration of a block should also include a semicolon to reduce errors when adding rules."
    }
  ],
  "block-closing-brace-empty-line-before": [
    "never",
    {
    "message": "Never put a newline before a block closing bracket to avoid unnecessary whitespace."
    }
  ],
  "block-closing-brace-newline-after": [
    "always",
    {
    "message": "Declaration blocks should always start on a new line to maximize readability."
    }
  ],
  "block-closing-brace-newline-before": [
    "always-multi-line",
    {
    "message": "Always put a block closing bracket on a separate line for better readability."
    }
  ],
  "block-opening-brace-newline-after": [
    "always-multi-line",
    {
    "message": "Always put a newline after a block opening bracket for better readability."
    }
  ],
  "block-opening-brace-space-before": [
    "always",
    {
    "message": "Always put a space before a block opening bracket for better readability."
    }
  ],
  "selector-attribute-brackets-space-inside": [
    "never",
    {
    "message": "Never put spaces inside selector attributes to avoid unnecessary whitespace."
    }
  ],
  "selector-attribute-quotes": [
    "always",
    {
    "message": "Always put selector attribute values in quotes to be consistent and improve readability."
    }
  ],
  "selector-combinator-space-after": [
    "always",
    {
    "message": "Always put spaces around selector combinators to improve readability."
    }
  ],
  "selector-combinator-space-before": [
    "always",
    {
    "message": "Always put spaces around selector combinators to improve readability."
    }
  ],
  "selector-descendant-combinator-no-non-space": [
    true,
    {
    "message": "Don't put  tabs, newlines, nor multiple spaces between selector descendants to improve readability."
    }
  ],
  "selector-list-comma-newline-after": [
    "always",
    {
    "message": "Each selector has to be put on a separate line to improve readability."
    }
  ],
  "selector-list-comma-newline-before": [
    "never-multi-line",
    {
    "message": "Never put a newline or white space before a selector comma to avoid unnecessary whitespace."
    }
  ],
  "selector-list-comma-space-before": [
    "never",
    {
    "message": "Never put a newline or white space before a selector comma to avoid unnecessary whitespace."
    }
  ],
  "media-feature-colon-space-after": [
    "always",
    {
    "message": "Always put a space after a media feature colon to improve readability."
    }
  ],
  "media-feature-colon-space-before": [
    "never",
    {
    "message": "Never put a space before a media feature colon to avoid unnecessary whitespace."
    }
  ],
  "media-feature-parentheses-space-inside": [
    "never",
    {
    "message": "Never put spaces inside media feature parentheses to avoid unnecessary whitespace."
    }
  ],
  "at-rule-empty-line-before": [
	"always",
	{
		ignore: ["after-comment", "blockless-after-same-name-blockless"],
		ignoreAtRules: ["import"],
		message: "Always put an empty line before each @ rule, except after a comment or for @import."
	}
  ],
  "at-rule-name-space-after": [
    "always",
    {
    "message": "Always put a space after @ rule names for consistency and to improve readability."
    }
  ],
  "at-rule-semicolon-newline-after": [
    "always",
    {
    "message": "Always put a newline after the ending @ rule semicolon to improve readability."
    }
  ],
  "at-rule-semicolon-space-before": [
    "never",
    {
    "message": "Never put a newline after the ending @ rule semicolon to avoid unnecessary whitespace."
    }
  ],
  "number-leading-zero": [
    "never",
    {
    "message": "Should not contain leading zeros to avoid unnecessary code."
    }
  ],
  "color-hex-case": [
    "lower",
    {
    "message": "Lowercase letters are easier to distinguish from numbers."
    }
  ],
  "number-no-trailing-zeros": [
    true,
    {
    "message": "Should not contain trailing zeros to avoid unnecessary code."
    }
  ],
  "unit-case": [
    "lower",
    {
    "message": "Units should always be lowercase for consistency. Lower case is more readable."
    }
  ],
  "property-case": [
    "lower",
    {
    "message": "Properties should always be lowercase for consistency. Lower case is more readable."
    }
  ],
  "selector-pseudo-class-case": [
    "lower",
    {
    "message": "Always use lowercase for pseudo-class selectors for consistency and to improve readability."
    }
  ],
  "selector-pseudo-element-case": [
    "lower",
    {
    "message": "Always use lowercase for pseudo-element selectors for consistency and to improve readability."
    }
  ],
  "selector-max-empty-lines": [
    0,
    {
    "message": "Never put empty lines in selector blocks to improve readability and to avoid unnecessary whitespace."
    }
  ],
  "media-feature-name-case": [
    "lower",
    {
    "message": "Always use lowercase for media feature names for consistency and to improve readability."
    }
  ],
  "at-rule-name-case": [
    "lower",
    {
    "message": "Always use lowercase for @ rule names for consistency and to improve readability."
    }
  ],
  "no-extra-semicolons": [
    true,
    {
    "message": "No extra semicolons: they don't make sense."
    }
  ]
  */
};
