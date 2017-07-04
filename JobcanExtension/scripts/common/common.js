var _g = this; // グローバルスコープのthisキャッシュ
(function() {
  // loaing Storage data
  var storageData = {};
  // Setting default storageData values.
  var now = new Date();
  storageData[Constants.STORAGE_KEY.TARGET_YEAR] = now.getFullYear();
  storageData[Constants.STORAGE_KEY.TARGET_MONTH] = now.getMonth() + 1;

  var storageKeys = [];
  for(var storageKey in Constants.STORAGE_KEY) {
    if (Constants.STORAGE_KEY.hasOwnProperty(storageKey)) storageKeys.push(storageKey);
  }
  chrome.storage.local.get(storageKeys, data => {
    for (var key in data) {
      if (data.hasOwnProperty(key))
        storageData[key] = data[key];
    }
  });

  // storageData変更時のイベントハンドラ登録
  chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log(changes);
    if (namespace === 'local') {
      for(var key in changes) {
        if (changes[key].newValue) {
          storageData[key] = changes[key].newValue;
          console.log("Storage data Changed: [{0}] {1} -> {2}".format(key, changes[key].oldValue, changes[key].newValue));
        }
      }
    }
  });

  // storageDataを雑にDeepCopyして返す
  // ここのthisはグローバルスコープのthisなので注意
  _g.getStorageData = () => {
    // プリミティブ、String以外のプロパティを想定していない雑なDeepCopy
    var retObj = JSON.parse(JSON.stringify(storageData));
    return retObj;
  };

  _g.setStorageData = (key, value) => {
    if (storageData[key] === value) return;
    var data = {};
    data[key] = value;
    chrome.storage.local.set(data, console.log);
  };

  _g.getQuarterHour = minute => {
    return Math.floor(minute / 15) * 15;
  };

  /*
   * 任意のスクリプトをページ上で強制実行
   */
  _g.forceExecuteScript = (script, id) => {
    var scriptElem = document.getElementById(id);
    if (scriptElem) {
      document.head.removeChild(scriptElem);
    }
    scriptElem = document.createElement('script');
    scriptElem.id = id;
    scriptElem.innerText = script;
    document.head.appendChild(scriptElem);
  };

  /*
   * 要素に対して任意のイベントを発火させる
   */
  _g.fireEvent = (elem, event) => {
    var eventObj = document.createEvent("HTMLEvents");
    eventObj.initEvent(event, true, true);
    return elem.dispatchEvent(eventObj);
  };
})();

// Extend String
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{([0-9]|[1-9][0-9]+)\}/g, c => {
    return args[~~(c.replace(/\{|\}/g, ""))];
  });
};
