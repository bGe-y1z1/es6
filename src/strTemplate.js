let name = '张三'; let age = '18';
let desc = '${name} 今年  ${age}  岁了';
function replace (desc) {
  return desc.replace(/\$\{([^}]+)\}/g, function (mathed, key, c, d) {
    console.log(mathed, key, c, d);
    // ${name} name 0 ${name} 今年  ${age}  岁了
    // ${age} age 12 ${name} 今年  ${age}  岁了
    // replace中 mathed 为匹配到的字符串，key为对应替换的字符串，c为替换的位置，d为整个要替换的字符串。
    return eval(key);
    // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。这里的eval会将原本的name和age改成成张三和18
  });
}
replace(desc)

// html 转化
var sender = '<script>alert("abc")</script>'; // 恶意代码
var message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;
console.log('恶意代码转化',message)
function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}