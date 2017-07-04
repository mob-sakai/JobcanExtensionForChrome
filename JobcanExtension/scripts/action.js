// Declaration of actions

// Work at "/employee/man-hour-manage"
var manHourManage = () => {
  // 土日を除く工数入力していないレコード背景の色を変更
  document.querySelectorAll('#search-result > table > tbody > tr').forEach(elem => {
    var secondColumn = elem.querySelector('td:nth-child(2)');
    var thirdColumn = elem.querySelector('td:nth-child(3)');
    if (secondColumn && !/00:00/.test(secondColumn.innerText)
      && thirdColumn && /.*入力がありません.*/.test(thirdColumn.innerText))
      elem.style.background = '#ffcccc';
  });

  var editMenu = document.getElementById('edit-menu');
  document.querySelectorAll('#search-result > table > tbody > tr > td:nth-child(4) > div').forEach(elem => {
    elem.addEventListener('click', e => {
      new Promise((resolve, reject) => {

        var checkEnabledDialog = () => {
          if (editMenu.style.display != 'none' && editMenu.style.opacity === '') {
            // ダイアログが表示されていれば解決
            resolve(true); // とりあえずtrue突っ込んどく
          } else {
            // 表示途中なら次フレーム要求
            requestAnimationFrame(checkEnabledDialog);
          }
        };
        checkEnabledDialog();
      }).then(val => {
        var easyInputSelect = document.querySelector('#select-template > select');
        easyInputSelect.value = 1;
        forceExecuteScript("changeTemplate();", "changeTemplate_script");

        var createFullAllocButton = () => {
          if (editMenu.style.display == 'none') return;

          document.querySelectorAll('#edit-menu-contents > table > tbody > tr.daily').forEach((editMenuRow, curIndex) => {
            var editMenu4thColumn = editMenuRow.querySelector('td:nth-child(4)');
            var editMenu5thColumn = editMenuRow.querySelector('td:nth-child(5)');
            var manHourInput = editMenu4thColumn.querySelector('input.man-hour-input.man-hour-input-time');
            var manHourHidden = editMenu4thColumn.querySelector('input[name^=hiddenMinutes]');
            var fullAllocButton = editMenu4thColumn.querySelector('div.ext_ui_button');

            editMenuRow.extIndex = curIndex;

            if (!manHourInput || !manHourHidden) return;
            if (fullAllocButton) return;

            // 100%割当ボタン生成、配置
            fullAllocButton = document.createElement('div');
            fullAllocButton.className = "ext_ui_button";
            fullAllocButton.style.display = "inline";
            fullAllocButton.innerText = "100%割当";
            fullAllocButton.addEventListener('click', () => {
              var workingTime = ~~document.getElementById('hiddenTime').value;
              var workingHour = Math.floor(workingTime / 60);
              var workingMinute = workingTime % 60;

              manHourInput.value = "{0}:{1}".format(workingHour, ("0" + workingMinute).slice(-2));
              manHourHidden.value = workingTime;
              document.querySelectorAll('#edit-menu-contents > table > tbody > tr.daily > td:nth-child(5)').forEach((_e, _i) => {
                if (_i === ~~editMenuRow.extIndex) return;
                var deleteButton = _e.querySelector('div.btn.btn-danger');
                if (deleteButton)
                  fireEvent(deleteButton, 'click');
              });
              forceExecuteScript('validateTime();', 'ext-validateTime');
            });
            editMenu4thColumn.appendChild(fullAllocButton);
          });
          requestAnimationFrame(createFullAllocButton);
        };
        createFullAllocButton();
      });
    });
  });
};

// Work at "/employee/attendance"
var attendance = () => {

  document.querySelectorAll('#search-result > table > tbody > tr').forEach(elem => {
    var now = new Date();
    var month = now.getMonth() + 1;
    var date = now.getDate();

    var firstColumn = elem.querySelector('td:nth-child(1)');
    if (firstColumn && /\d{2}\/\d{2}\(.+\)/.test(firstColumn.innerText)) {
      [month, date] = firstColumn.innerText.split('/');
      month = ~~month;
      date = ~~date.replace(/\(.+\)/, ``);
    } else {
      return;
    }

    var fifthColumn = elem.querySelector('td:nth-child(5)');
    if (fifthColumn && /\d{2}:\d{2}\n\(\d{2}:\d{2}\)/.test(fifthColumn.innerText)) {
      var [managedTime, realTime] = fifthColumn.innerText.split("\n");
      var [managedHour, managedMinute] = managedTime.split(':');
      managedHour = ~~managedHour;
      managedMinute = ~~managedMinute;

      var [realHour, realMinute] = realTime.replace(/\(|\)/g, '').split(':');
      realHour = ~~realHour;
      realMinute = ~~realMinute;

      if (realHour > managedHour || (realHour === managedHour && getQuarterHour(realMinute) > managedMinute)) {
        fifthColumn.innerText += '\n';
        var a = document.createElement('a');
        a.className = 'ext_ui_button';
        a.href = '/employee/over-work/new?month={0}&date={1}&hour={2}&minute={3}'.format(month, date, realHour, realMinute);
        a.innerText = "残業申請";
        fifthColumn.appendChild(a);
        elem.style.background = '#ffcccc';
      }
    }
  });
};


// Work at /employee/over-work/new
var overWorkNew = () => {
  var [url, queryString] = location.href.split('?');
  if (!queryString) return;

  var queryParams = queryString.split('&');
  var queries = {};
  for(let i = 0; i < queryParams.length; i++) {
    var param = queryParams[i].split('=');
    queries[param[0]] = ~~param[1];
  }
  console.log(queries);

  // document.getElementById('over_work_year'); // 使用しない
  document.getElementById('over_work_month').value = queries.month;
  document.getElementById('over_work_day').value = queries.date;
  document.getElementById('end_h').value = queries.hour;
  document.getElementById('end_m').value = getQuarterHour(queries.minute);

  // 理由記入用のテキストエリアにフォーカスを当てる
  document.querySelector('#wrap-management-page > div.contents-wrap-middle > form > table > tbody > tr:nth-child(3) > td > textarea').focus();
};
