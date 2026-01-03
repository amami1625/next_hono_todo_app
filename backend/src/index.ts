import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import todos from './routes/todos'

const app = new Hono()

// CORS設定
app.use('/*', cors())

// ルートの統合
app.route('/todos', todos)

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
