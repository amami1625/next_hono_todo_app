'use client'

import { useEffect, useState } from 'react'

type Todo = {
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [loading, setLoading] = useState(true)

  const API_URL = 'http://localhost:3001'

  // Todoを取得
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`)
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      setLoading(false)
    }
  }

  // Todoを追加
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) return

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodoTitle })
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setNewTodoTitle('')
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  // Todoの完了状態を切り替え
  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      })
      const updatedTodo = await response.json()
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  // Todoを削除
  const deleteTodo = async (id: number) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
      })
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">読み込み中...</p>
      </div>
    )
  }

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
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
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

        {/* 統計情報 */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            全{todos.length}件 / 完了{todos.filter(t => t.completed).length}件 /
            未完了{todos.filter(t => !t.completed).length}件
          </p>
        </div>
      </div>
    </div>
  )
}
