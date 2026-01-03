import { Hono } from 'hono'
import type { Todo } from '../types/todo'
import { readTodos, writeTodos } from '../utils/fileStorage'
import { v4 as uuidv4 } from 'uuid'

const todos = new Hono()

/**
 * GET /todos - 全てのTodoを取得
 */
todos.get('/', async (c) => {
  const allTodos = await readTodos()
  return c.json(allTodos)
})

/**
 * POST /todos - 新しいTodoを追加
 */
todos.post('/', async (c) => {
  const { title } = await c.req.json()
  const allTodos = await readTodos()

  const newTodo: Todo = {
    id: uuidv4(),
    title,
    completed: false
  }

  allTodos.push(newTodo)
  await writeTodos(allTodos)

  return c.json(newTodo, 201)
})

/**
 * PUT /todos/:id - Todoを更新
 */
todos.put('/:id', async (c) => {
  const id = c.req.param('id')
  const { title, completed } = await c.req.json()
  const allTodos = await readTodos()

  const index = allTodos.findIndex(t => t.id === id)
  if (index === -1) {
    return c.json({ error: 'Todo not found' }, 404)
  }

  if (title !== undefined) allTodos[index].title = title
  if (completed !== undefined) allTodos[index].completed = completed

  await writeTodos(allTodos)

  return c.json(allTodos[index])
})

/**
 * DELETE /todos/:id - Todoを削除
 */
todos.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const allTodos = await readTodos()

  const index = allTodos.findIndex(t => t.id === id)
  if (index === -1) {
    return c.json({ error: 'Todo not found' }, 404)
  }

  allTodos.splice(index, 1)
  await writeTodos(allTodos)

  return c.json({ message: 'Todo deleted' })
})

export default todos
