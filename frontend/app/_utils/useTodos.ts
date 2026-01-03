import { useCallback, useEffect, useState } from "react";
import { Todo } from "../_types";


export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:3001";

  // Todoを取得
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Todoを追加
  const addTodo = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodoTitle }),
      });
      const newTodo = await response.json();
      setTodos(prev => [...prev, newTodo]);
      setNewTodoTitle("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }, [newTodoTitle]);

  // Todoの完了状態を切り替え
  const toggleTodo = useCallback(async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      const updatedTodo = await response.json();
      setTodos(prev => prev.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  }, []);

  // Todoを削除
  const deleteTodo = useCallback(async (id: string) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(prev => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }, []);

  // 完了済みのTodoの件数
  const completedTodos = todos.filter((t) => t.completed).length;

  // 未完了のTodoの件数
  const inCompletedTodos = todos.filter((t) => !t.completed).length;

  return  {
    todos,
    newTodoTitle,
    setNewTodoTitle,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    completedTodos,
    inCompletedTodos,
  }
  
}
