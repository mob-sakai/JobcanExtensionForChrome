// 拡張機能から追加する画面部品のスタイルを適用
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = "text/css";
link.href = chrome.extension.getURL('styles/ext-style.css');
document.head.appendChild(link);
