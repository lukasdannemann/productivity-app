import { createContext, useContext, useState } from "react";

export const TodoContext = createContext(null);

const uid = () => Date.now();

export default function TodoProvider ({ children }) {
       const [todos, setTodos] = useState([]);
       const [editingTodo, setEditingTodo] = useState(null);
       const [showForm, setShowForm] = useState(false);

        //filter and sort
       const [filterStatus, setFilterStatus] = useState("all"); 
       const [sort, setSort] = useState("deadline"); 
       const [sortOrder, setSortOrder] = useState("asc"); 

       const categoriesArray = ["Other", "Health", "Household", "Work", "Leisure", "Study", "Errands"];
       const [selectedCategories, setSelectedCategories] = useState(categoriesArray);



        const compareDeadline = (a, b) => {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;   // a saknar deadline -> sist
        if (!b.deadline) return -1;  // b saknar deadline -> sist
        return new Date(a.deadline) - new Date(b.deadline);
        };
       
    const getFilteredTodos = () => {
        let list = [...todos];

        if (filterStatus === "done") list = list.filter((t) => t.isDone);
        if (filterStatus === "active") list = list.filter((t) => !t.isDone);
        
        list = list.filter((t) => selectedCategories.includes(t.category));


        list.sort((a, b) => {
            let result = 0;

            if (sort === "deadline") {
            result = compareDeadline(a, b);
        }
            if (sort === "time") {
                const aMin = a.timeEstimateMinutes || 0;
                const bMin = b.timeEstimateMinutes || 0;
                result = aMin - bMin;
        }
            if ( sort === "status") {
                const aStatus = a.isDone ? 1 : 0;
                const bStatus = b.isDone ? 1 : 0;
                result = aStatus - bStatus;
            }

            return sortOrder === "asc" ? result : -result;
        });
        return list;
       };
   

  const addTodo = (todoData) => {
    const title = (todoData.title ?? "").trim();
    if (!title) return;

    const newTodo = {
      id: uid(),
      title,
      description: (todoData.description ?? "").trim(),
      category: todoData.category ?? "Other",
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
      );
    };

      const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      }

    // uppdatera valfria fält (titel, beskrivning, kategori, deadline, estimate, isDone)
      const updateTodo = (id, patch) => {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
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

        filterStatus, 
        setFilterStatus,
        sort,
        setSort,
        sortOrder,
        setSortOrder,
        getFilteredTodos,

        selectedCategories, 
        setSelectedCategories,
        categoriesArray,
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
  


