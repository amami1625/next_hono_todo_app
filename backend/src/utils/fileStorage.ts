import fs from 'fs/promises'
import path from 'path'
import type { Todo } from '../types/todo'

const todosFilePath = path.join(process.cwd(), 'data', 'todos.json')

/**
 * JSONファイルからTodoを読み込む
 */
export async function readTodos(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(todosFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // ファイルが存在しない場合は空配列を返す
    return []
  }
}

/**
 * JSONファイルにTodoを書き込む
 */
export async function writeTodos(todos: Todo[]): Promise<void> {
  await fs.mkdir(path.dirname(todosFilePath), { recursive: true })
  await fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2))
}

