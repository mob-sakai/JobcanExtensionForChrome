var actionDefine = {
  actionList: [
    {
      keyRegExp: "^https://ssl.jobcan.jp/employee/man-hour-manage$",
      exec: function(details) {
        if (!details.requestBody || !details.requestBody.formData) {
          var storageData = getStorageData();
          return {
            redirectUrl: "https://ssl.jobcan.jp/employee/man-hour-manage?year={0}&month={1}"
              .format(storageData[Constants.STORAGE_KEY.TARGET_YEAR], storageData[Constants.STORAGE_KEY.TARGET_MONTH])
          };
        }
        if (details.requestBody && details.requestBody.formData) {
          var data = {};
          data[Constants.STORAGE_KEY.TARGET_YEAR] = details.requestBody.formData["year"][0];
          data[Constants.STORAGE_KEY.TARGET_MONTH] = details.requestBody.formData["month"][0];
          chrome.storage.local.set(data, () => {});
        }
        return null;
      }
    }
  ],
  getAction: function(url) {
    for(var i = 0; i < this.actionList.length; i++) {
      if (new RegExp(this.actionList[i].keyRegExp).test(url))
        return this.actionList[i];
    }
    return null;
  }
};

chrome.webRequest.onBeforeRequest.addListener(
  details => {
    var action = actionDefine.getAction(details.url);
    if (action) {
      var result = action.exec(details);
      if (result) return result;
    }
  },
  {urls: ["https://ssl.jobcan.jp/*"]},
  ['blocking', 'requestBody']
);
