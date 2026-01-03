# Todo アプリ (Next.js + Hono)

Next.jsとHonoを使ったシンプルなTodoアプリケーションです。JSONファイルでデータを管理します。

## 📁 プロジェクト構成

```
.
├── backend/          # Hono APIサーバー (ポート: 3001)
│   ├── src/
│   │   └── index.ts  # APIエンドポイント
│   └── data/
│       └── todos.json # Todoデータ
│
├── frontend/         # Next.jsフロントエンド (ポート: 3000)
│   └── app/
│       └── page.tsx  # メインページ
│
└── Makefile         # タスク自動化
```

## 🚀 クイックスタート

### 1. 依存関係のインストール

```bash
make install
```

### 2. アプリケーションの起動

```bash
make dev
```

これでBackendとFrontendが同時に起動します！

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 📝 利用可能なコマンド

```bash
make install   # 全ての依存関係をインストール
make dev       # BackendとFrontendを同時起動
make backend   # Backendのみ起動
make frontend  # Frontendのみ起動
make clean     # node_modulesとビルドファイルを削除
make help      # ヘルプを表示
```

## 🔧 手動起動する場合

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🎯 機能

- ✅ Todo の追加
- ✅ Todo の完了/未完了の切り替え
- ✅ Todo の削除
- ✅ 統計情報の表示（全件数、完了数、未完了数）
- ✅ JSONファイルでデータ永続化

## 🛠 技術スタック

### Backend
- **Hono** - 軽量で高速なWebフレームワーク
- **TypeScript** - 型安全な開発
- **Node.js** - ランタイム環境

### Frontend
- **Next.js 15** - Reactフレームワーク
- **React 19** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - スタイリング

## 📚 API エンドポイント

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| GET     | /todos       | 全Todoを取得 |
| POST    | /todos       | 新しいTodoを追加 |
| PUT     | /todos/:id   | Todoを更新 |
| DELETE  | /todos/:id   | Todoを削除 |

## 💾 データ構造

```json
{
  "id": 1,
  "title": "Todo タイトル",
  "completed": false
}
```

## 📄 ライセンス

MIT
