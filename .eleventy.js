module.exports = async function(eleventyConfig){
    const eleventyPluginVite = (await import("@11ty/eleventy-plugin-vite"))
    eleventyConfig.addPlugin(eleventyPluginVite.default, {
        tempFolderName: ".11ty-vite",
    });

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/css/");
    eleventyConfig.addPassthroughCopy("src/scripts/");
    eleventyConfig.addWatchTarget("src/css/");
    eleventyConfig.addWatchTarget("src/scripts/");
    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    };
}