# express-session-dynamodb-sandbox

セッションを DynamoDB Local に保存する。

## 準備

### DynamoDB Localの準備

[ここ](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)の「DynamoDB local v2.x のダウンロード」からzipをダウンロードし展開する。

展開したディレクトリで以下のコマンドを実行

```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

起動に少し時間がかかる模様...

データ登録時に`shared-local-instance.db` というファイルが出来上がる。

以下の内容のbatファイルを作成しておくといいかもしれない。

```
@echo off
cd /d %~dp0

java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

pause
```


### dymamodb-admin の準備

GUIで操作できるツールが使えると便利なので[dymamodb-admin](https://github.com/aaronshaf/dynamodb-admin) を利用する。

`dynamodb-admin` はグローバルにインストールしなくても使えるみたい(?)なので適当なフォルダを作成しそこで使う

以下のコマンドを入力しプロジェクトを作成
```
mkdir dynamodb-admin
cd dynamodb-admin
npm init
```

```
npm install -D dynamodb-admin
```

`package.json` の `scripts` を編集

```
  "scripts": {
    "start": "set DYNAMO_ENDPOINT=http://localhost:8000 && dynamodb-admin",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

`npm run start`で起動

#### テーブルの作成

[http://localhost:8001](http://localhost:8001) にアクセス


「Create Table」ボタンをクリックしテーブルを作る

| 項目名               | 値 |
| ------------------- | ------------- |
| Table Name          | myapp-session |
| Hash Attribute Name | id            |
| Hash Attribute Type | String         |

### 環境変数の準備

とりあえず `.env` ファイルを作ってこれで
値は多分なんでもいい気がする。

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=key
AWS_SECRET_ACCESS_KEY=key
```

