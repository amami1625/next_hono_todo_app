import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import fs from 'fs/promises'
import path from 'path'

const app = new Hono()

// CORS設定
app.use('/*', cors())

type Todo = {
  id: number
  title: string
  completed: boolean
}

const todosFilePath = path.join(process.cwd(), 'data', 'todos.json')

// JSON ファイルから Todo を読み込む
async function readTodos(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(todosFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // ファイルが存在しない場合は空配列を返す
    return []
  }
}

// JSON ファイルに Todo を書き込む
async function writeTodos(todos: Todo[]): Promise<void> {
  await fs.mkdir(path.dirname(todosFilePath), { recursive: true })
  await fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2))
}

// GET /todos - 全ての Todo を取得
app.get('/todos', async (c) => {
  const todos = await readTodos()
  return c.json(todos)
})

// POST /todos - 新しい Todo を追加
app.post('/todos', async (c) => {
  const { title } = await c.req.json()
  const todos = await readTodos()

  const newTodo: Todo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    title,
    completed: false
  }

  todos.push(newTodo)
  await writeTodos(todos)

  return c.json(newTodo, 201)
})

// PUT /todos/:id - Todo を更新
app.put('/todos/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const { title, completed } = await c.req.json()
  const todos = await readTodos()

  const index = todos.findIndex(t => t.id === id)
  if (index === -1) {
    return c.json({ error: 'Todo not found' }, 404)
  }

  if (title !== undefined) todos[index].title = title
  if (completed !== undefined) todos[index].completed = completed

  await writeTodos(todos)

  return c.json(todos[index])
})

// DELETE /todos/:id - Todo を削除
app.delete('/todos/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const todos = await readTodos()

  const index = todos.findIndex(t => t.id === id)
  if (index === -1) {
    return c.json({ error: 'Todo not found' }, 404)
  }

  todos.splice(index, 1)
  await writeTodos(todos)

  return c.json({ message: 'Todo deleted' })
})

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
