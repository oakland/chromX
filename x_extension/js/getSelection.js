// <https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text>
// @author Tim Down <https://stackoverflow.com/users/96100/tim-down>
function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

function isIoc(text) {
	return regex.IP.test(text) || regex.Domain.test(text) || regex.SHA256.test(text)
}

document.onmouseup = function() {
  var text = getSelectionText();

  if (!isIoc(text)) {
		return;
	} else {
		// 请求 VB3 的接口，获取情报并展示

		var preUrl = 'https://x.threatbook.cn/query/';
		// var preUrl = 'https://x.threatbook.cn/vb4/7e2935f1ac5e47fd8ae79305f36200c8/user/getNickName';
		var url = preUrl + text;
		var req = {};
		$.get(url, req, function(res) {
			console.log(res);
		});
  }
};