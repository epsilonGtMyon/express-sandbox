# passport-sandbox

認証のライブラリ `passport.js` を使う

本体は `passport` で 認証の実装はStrategyが行っている。

ユーザー/パスワードで認証したい場合は `passport-local` を利用する。

また認証したユーザーの情報はセッションに保持するので `express-session` も利用する。
