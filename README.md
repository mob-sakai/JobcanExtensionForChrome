![image](https://user-images.githubusercontent.com/12690315/29801085-b4dae8d2-8ca8-11e7-9b23-64b757a77b08.png)

# ジョブカンが使いやすくなるChrome拡張機能 by 市原さん

## どう変わるの？

#### :umbrella: 当月以外の工数入力が面倒くさい！
* :umbrella: 当月以外の工数を入力する場合（例えば、８月分の工数を９月に入力する場合）、工数を編集するたびに９月の画面に飛ばされてしまいます。
    * :sunny: ジョブカンで「工数管理 - 工数入力」を選択した際に、最後に指定した年月の画面リダイレクトしてくれます。 


#### :umbrella: 工数入力/修正するべき行がわかりにくい！
* :umbrella: 工数入力画面は「入力がない行」「労働時間と工数にずれがある行」を強調色で表示しますが、土日や休暇取得日といった、入力する必要のない行は考慮していません
* :umbrella: 上記強調色が淡く、ディスプレイによっては視認性が悪いです。
    * :sunny: 工数入力画面を開くと、土日以外の工数が未入力となっているレコードが強調されます。
    * :sunny: 強調色をハッキリと表示します。  
![image](https://user-images.githubusercontent.com/12690315/30041874-69807ac0-9228-11e7-86ff-908b32e3a0a4.png)

#### :umbrella: 工数入力の時間入力が面倒！
* :umbrella: 工数入力画面 -> 編集ボタンを押す -> かんたん入力を押す -> 入力テンプレートを選択する -> 工数を入力する -> 保存ボタンを押す ...
    * :sunny: 編集ボタンを押すと、前回選択したかんたん入力テンプレートが自動で選択されます。(事前にかんたん入力の設定をおねがいします)
    * :sunny: 「100%割当」ボタンを押すと、そのプロジェクトに実労働時間が100%割り振られます。
    * :construction: 【近日実装】複数プロジェクトがある場合、「残り工数割当」ボタンを押すと、そのプロジェクトに余った実労働時間が割り振られます。  
![image](https://user-images.githubusercontent.com/12690315/27819322-a5b8e76e-60d4-11e7-99a7-01536c1f427b.png)

#### :umbrella: 残業申請が面倒！
* :umbrella: 出勤簿画面で「何日に」「何時から何時まで」残業したかを確認してから残業申請画面で申請を入力します。残業時間を入力するために、複数のタブを開いたり、メモしたり、正確に覚える必要があります。
    * :sunny: 出勤簿画面を開くと、残業申請が必要なレコードが強調され、 「残業申請」ボタンが表示されます。
    * :sunny: 「残業申請」ボタンを押すと、残業申請画面へ移動し、残業日時(月/日/時/分)が自動で入力されます。  
![image](https://user-images.githubusercontent.com/12690315/27819269-6a80f4c0-60d4-11e7-9f0f-23ed4a9d65be.png)
 


<br><br><br><br>
## インストール

### Macの場合
* [JobcanExtension.crx](https://github.com/mob-sakai/JobcanExtensionForChrome/raw/master/JobcanExtension.crx) をダウンロードします。
* Chromeで「その他の機能 -> 拡張機能」を開くか、 [chrome://extensions/](chrome://extensions/) に移動します。
* ダウンロードした [JobcanExtension.crx](https://github.com/mob-sakai/JobcanExtensionForChrome/raw/master/JobcanExtension.crx) をドラッグ＆ドロップします。  
![image](https://user-images.githubusercontent.com/12690315/27819235-3e4602ce-60d4-11e7-8b5c-4e45671a6382.png)
* 「拡張機能を追加」を押します  
![install_q](https://user-images.githubusercontent.com/12690315/27818907-d06a6bce-60d2-11e7-80bb-916cb7df497d.png)

　  
### Windowsの場合
* [JobcanExtension.zip](https://github.com/mob-sakai/JobcanExtensionForChrome/archive/master.zip) をダウンロードし、展開します。
* Chromeで「その他の機能 -> 拡張機能」を開くか、 [chrome://extensions/](chrome://extensions/) に移動します。
* 「デベロッパーモード」にチェックを入れ、「パッケージ化されていない拡張機能を読み込む...」をクリックします。  
![image](https://user-images.githubusercontent.com/12690315/27848696-1307d908-6182-11e7-8284-dad85cac29b2.png)

* さきほど展開したフォルダ内のJobcanExtensionフォルダを選択し、「OK」をクリックします。  
![image](https://user-images.githubusercontent.com/12690315/27849983-52f54c26-618c-11e7-9d5c-251adc885dc5.png)

　  
### 注意事項 (※Windowsのみ)
* Chromeを起動するたびに次のようなポップアップが表示されます。  
「キャンセル」をクリックしてください。  
![image](https://user-images.githubusercontent.com/12690315/27848644-a2deebda-6181-11e7-9644-987efbe74653.png)

　  
<br><br><br><br>
### 更新
* 【Mac】  
JobcanExtensionは自動的に更新がインストールされます。特に操作は不要です。
* 【Windows】  
上記インストール方法で最新版のプラグインをインストールしてください


<br><br><br><br>
## アンインストール
* Chromeで「その他の機能 -> 拡張機能」を開くか、 [chrome://extensions/](chrome://extensions/) に移動します。
* ゴミ箱アイコンをクリックして、JobcanExtensionを削除します。

![image](https://user-images.githubusercontent.com/12690315/27847557-361de936-6179-11e7-95ea-fbbc988942a3.png)


<br><br><br><br>
## 備考
* ご利用は自己責任でお願いします
