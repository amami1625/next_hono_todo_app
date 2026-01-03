.PHONY: dev install clean help backend frontend

# デフォルトターゲット
help:
	@echo "利用可能なコマンド:"
	@echo "  make install  - 全ての依存関係をインストール"
	@echo "  make dev      - BackendとFrontendを同時起動"
	@echo "  make backend  - Backendのみ起動"
	@echo "  make frontend - Frontendのみ起動"
	@echo "  make clean    - node_modulesとビルドファイルを削除"

# 依存関係のインストール
install:
	@echo "📦 Backend の依存関係をインストール中..."
	cd backend && npm install
	@echo "📦 Frontend の依存関係をインストール中..."
	cd frontend && npm install
	@echo "✅ インストール完了！"

# BackendとFrontendを並行起動
dev:
	@echo "🚀 Backend と Frontend を起動中..."
	@echo "Backend: http://localhost:3001"
	@echo "Frontend: http://localhost:3000"
	@make -j2 backend frontend

# Backendのみ起動
backend:
	@echo "🔧 Backend を起動中..."
	cd backend && npm run dev

# Frontendのみ起動
frontend:
	@echo "🎨 Frontend を起動中..."
	cd frontend && npm run dev

# クリーンアップ
clean:
	@echo "🧹 クリーンアップ中..."
	rm -rf backend/node_modules backend/dist
	rm -rf frontend/node_modules frontend/.next
	@echo "✅ クリーンアップ完了！"
