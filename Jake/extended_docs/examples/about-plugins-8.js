exports.nodeVisitor = {
    visitNode: function(node, e, parser, currentSourceName) {
        if (node.type === Token.OBJECTLIT &amp;&amp; node.parent &amp;&amp; node.parent.type === Token.CALL &amp;&amp; isInWidgetFactory(node, 1)) {
            var widgetName = node.parent.arguments.get(0).toSource();
            e.id = 'astnode' + node.hashCode(); // the id of the object literal node
            e.comment = String(node.parent.jsDoc||'');
            e.lineno = node.parent.getLineno();
            e.filename = currentSourceName;
            e.astnode = node;
            e.code = {
                name: "" + widgetName.substring(1, widgetName.length() - 1),
                type: "class",
                node: node
            };
            e.event = "symbolFound";
            e.finishers = [parser.addDocletRef];

            addCommentTag(e, "param", "{Object=} options A set of configuration options");
        } 
        else if(isTriggerCall(node)) {
            var nameNode = node.arguments.get(0);
                eventName = String((nameNode.type == Token.STRING) ? nameNode.value : nameNode.toSource()),
                func = {},
                comment = "@event\n",
                eventKey = "";

            if (node.enclosingFunction) {
                func.id = 'astnode'+node.enclosingFunction.hashCode();
                func.doclet = parser.refs[func.id];
            }
            if(func.doclet) {
                func.doclet.addTag("fires", eventName);
                if (func.doclet.memberof) {
                    eventKey = func.doclet.memberof + "#event:" + eventName;
                    comment += "@name " + func.doclet.memberof + "#" + eventName;
                }
            }
            e.comment = comment;
            e.lineno = node.getLineno();
            e.filename = currentSourceName;
            e.event = "jsdocCommentFound";                
        }
    }
};
function isTriggerCall(node) {
    if(node.type != Token.CALL) { return false; }
    var target = node.getTarget(),
        left = target &amp;&amp; target.left &amp;&amp; String(target.left.toSource()),
        right = target &amp;&amp; target.right &amp;&amp; String(target.right.toSource());
    return (left === "this" &amp;&amp; right === "_trigger");
}

function isInWidgetFactory(node, depth) {
    var parent = node.parent,
        d = 0;
    while(parent &amp;&amp; (!depth || d &lt; depth)) {
        if (parent.type === Token.CALL) {
            var target = parent.getTarget(),
                left = target &amp;&amp; target.left &amp;&amp; String(target.left.toSource()),
                right = target &amp;&amp; target.right &amp;&amp; String(target.right.toSource());
            return ((left === "$" || left === "jQuery") &amp;&amp; right === "widget");
        } else {
            parent = parent.parent;
            d++;
        }
    }
    return false;
}
