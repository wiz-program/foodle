# Foodle（たべものWordle）

ひらがな4文字の「食べもの」を当てるWordle風ゲームです🍙

---

## 🎮 遊び方

- 4文字のひらがなを入力して、実行ボタン or Enterキーを押します。
- 文字の判定結果に応じてマスの色が変わります：
  - 🟩 緑：文字も場所も正解
  - 🟨 黄：文字は正しいけど場所が違う
  - ⬜ 灰：その文字は含まれていない
- 最大5回以内に正解を目指します！

---

## 📋 機能一覧

- ルール説明と語群一覧をモーダルで表示
- キーボードUIあり（ひらがなをクリック入力可能）
- スマホにも対応したレスポンシブデザイン
- 語群一覧とルール説明は非同期fetchで読み込み
- キーボード入力時に自動でスペースを除去

---

## 📁 ファイル構成

├── index.html ├── style.css ├── index.js ├── foods.js ├── kana.js ├── rule-modal.html ├── foods-modal.html

---

## 📄 使用技術

- HTML / CSS / JavaScript
- モダンなDOM操作
- レスポンシブ対応（メディアクエリ）
- モーダルの非同期読み込み（fetch API）

---

## 🚀 公開ページ

[こちらからプレイできます！](https://wiz-program.github.io/foodle/)

---

## 📝 備考

このアプリは学習目的で作成されました。