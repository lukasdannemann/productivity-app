import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const TodoContext = createContext(null);

const uid = () => Date.now();

export default function TodoProvider ({ children }) {
  const {currentUser} = useContext(UserContext)

  const [todos, setTodos] = useState(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser')) ||
    JSON.parse(localStorage.getItem('currentUser'))

    if(storedUser){
      const allTodos = JSON.parse(localStorage.getItem('todos')) || {};
      return allTodos[storedUser.id] || [];
    }
    return []
  });

  const [showForm, setShowForm] = useState(false);

  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
        if(currentUser){
            const allTodos = JSON.parse(localStorage.getItem('todos')) || {}
            const currentUserTodos = allTodos[currentUser.id] || []
            setTodos(currentUserTodos)
        }else{
            setTodos([])
        }
    }, [currentUser])

  useEffect(() => {
        if (currentUser && todos.length >= 0){

            const allTodos = JSON.parse(localStorage.getItem('todos')) || {}

            allTodos[currentUser.id] = todos
            localStorage.setItem('todos', JSON.stringify(allTodos))
        }
    }, [todos, currentUser])

  const addTodo = (todoData) => {
    const title = (todoData.title ?? "").trim();
    if (!title) return;

    const newTodo = {
      id: uid(),
      userId: currentUser.id,
      title,
      description: (todoData.description ?? "").trim(),
      category: todoData.category ?? "Övrigt",
      deadline: todoData.deadline ?? "",
      timeEstimateMinutes: Number(todoData.timeEstimateMinutes) || 0,
      isDone: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setShowForm(false);
  };

  const toggleDone = (id) => {
    setTodos((prev) =>
    prev.map((t) => (t.id === id ? {...t, isDone: !t.isDone} : t))
   )
  }

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
  }

    // uppdatera valfria fält (titel, beskrivning, kategori, deadline, estimate, isDone)
    const updateTodo = (id, patch) => {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
        );
        setEditingTodo(null);
        setShowForm(false);
      };
    
      const startEdit = (todo) => {
        setEditingTodo(todo);
        setShowForm(true);
      };
    
      const cancelForm = () => {
        setEditingTodo(null);
        setShowForm(false);
      };


  return (
    <TodoContext.Provider value={{ 
        todos, 
        addTodo, 
        toggleDone,
        deleteTodo,
        updateTodo,
        showForm, 
        setShowForm, 
        editingTodo,
        startEdit,
        cancelForm,
    }}>
      {children}
    </TodoContext.Provider>
  );
};

// custom hook för att använda TodoContext
export const useTodos = () => {
    const todoContext = useContext(TodoContext);
    if (!todoContext) throw new Error("useTodos must be used within TodoProvider");
    return todoContext;
  };
  


