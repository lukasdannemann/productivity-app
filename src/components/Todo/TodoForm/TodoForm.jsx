import { useEffect, useState } from "react";
import { useTodos } from "../../../context/TodoContext";
import styles from "./TodoForm.module.css";

export default function TodoForm() {
  const { addTodo, editingTodo, updateTodo, cancelForm } = useTodos();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Övrigt");
  const [deadline, setDeadline] = useState("");
  const [timeEstimateMinutes, setTimeEstimateMinutes] = useState("");


  useEffect (() => {
    if (!editingTodo) return;
    setTitle(editingTodo.title ?? "");
    setDescription(editingTodo.description ?? "");
    setCategory(editingTodo.category ?? "Övrigt");
    setDeadline(editingTodo.deadline ?? "");
    setTimeEstimateMinutes(String(editingTodo.timeEstimateMinutes ?? ""));
}, [editingTodo]);

  const onSubmit = (e) => {
    e.preventDefault();
  
      if (editingTodo) {
        updateTodo(editingTodo.id, {
          title: title.trim(),
          description: description.trim(),
          category,
          deadline,
          timeEstimateMinutes: Number(timeEstimateMinutes) || 0,
        });
        return;
      }
  
      addTodo({ title, description, category, deadline, timeEstimateMinutes });

      setTitle("");
      setDescription("");
      setCategory("Övrigt");
      setDeadline("");
      setTimeEstimateMinutes("");
    };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h2 className={styles.formTitle}> {editingTodo ? "Edit todo" : "Add todo"}</h2>

     <label className={styles.label}>
      <input
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Set a new intention…"
      />
</label>
      
<label className={styles.label}>
        
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
        />
      </label>

      <label className={styles.label}>
        Category
        <select
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Övrigt">Other</option>
          <option value="Hälsa">Health</option>
          <option value="Hushåll">Household</option>
          <option value="Jobb">Work</option>
          <option value="Nöje">Leisure</option>
        </select>
      </label>

      <label className={styles.label}>
        Deadline
        <input
          className={styles.input}
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        Time estimate (minutes)
        <input
          className={styles.input}
          type="number"
          min="0"
          value={timeEstimateMinutes}
          onChange={(e) => setTimeEstimateMinutes(e.target.value)}
          placeholder="Ex: 30"
        />
      </label>

      <div className={styles.formButtons}>
        <button
          type="button"
          onClick={cancelForm}
          className={styles.cancelBtn}
        >
          Cancel
        </button>

        <button type="submit" className={styles.saveBtn}>
          Save
        </button>
      </div>
    </form>
  );
}
