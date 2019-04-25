module.exports = {
	extends: ["@commitlint/config-conventional"],

	//See here for the rules definition : https://github.com/marionebl/commitlint/blob/master/docs/reference-rules.md
	rules: {
		"header-max-length": [1, "always", 100],
		"scope-enum": [
			2,
			"always",
			[
				"accessibility",
				"build",
				"build-main",
				"developer-guide",
				"docs",
				"qa",
				"release",
				"stark-all",
				"stark-build",
				"stark-core",
				"stark-demo",
				"stark-rbac",
				"stark-starter",
				"stark-testing",
				"stark-ui"
			]
		],
		"scope-case": [2, "always", "lowerCase"]
	}
};
