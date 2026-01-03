"use client";

import { useTodos } from "./_utils/useTodos";

export default function Home() {
  const {
    todos,
    newTodoTitle,
    setNewTodoTitle,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    completedTodos,
    inCompletedTodos,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Todo アプリ
        </h1>

        {/* Todo追加フォーム */}
        <form onSubmit={addTodo} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="新しいTodoを入力..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              追加
            </button>
          </div>
        </form>

        {/* Todoリスト */}
        {!loading && (
          <>
            <div className="space-y-3">
              {todos.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Todoがありません。新しいTodoを追加してください！
                </p>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id, todo.completed)}
                      className="w-5 h-5 rounded border-gray-300 bg-white text-black focus:ring-blue-500 accent-blue-500"
                    />
                    <span
                      className={`flex-1 text-lg ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
                      削除
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* 統計情報 */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            全{todos.length}件 / 完了{completedTodos}件
            / 未完了{inCompletedTodos}件
          </p>
        </div>
      </div>
    </div>
  );
}
