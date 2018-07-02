function insertHtml(options) {
	this.options = options;
}
insertHtml.prototype.apply = function(compiler) {
	var content = this.options.content;
	compiler.plugin("compilation", function(compilation, options) {
		compilation.plugin(
			"html-webpack-plugin-before-html-processing",
			function(htmlPluginData, callback) {
				htmlPluginData.html = htmlPluginData.html.replace(
					"</body>",
					content + "</body>"
				);
			}
		);
	});
};
module.exports = insertHtml;
