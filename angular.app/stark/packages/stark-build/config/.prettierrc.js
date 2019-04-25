module.exports = {
	printWidth: 140,
	tabWidth: 4,
	useTabs: true,
	trailingComma: "none",
	bracketSpacing: true,
	overrides: [
		{
			files: "*.{pcss,scss,css,json}",
			options: {
				tabWidth: 2,
				useTabs: false
			}
		},
		{
			files: ".travis.yml",
			options: {
				tabWidth: 2,
				useTabs: false
			}
		}
	]
};
