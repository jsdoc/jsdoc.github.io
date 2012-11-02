exports.handlers = {
    beforeParse: function(e) {
        var extraDoc = ["",
            "/**",
            "Here's a description of this function",
            "@name superFunc",
            "@memberof ui.mywidget",
            "@function",
            "*/", ""];
        e.source += extraDoc.join("\n");
    }
}
