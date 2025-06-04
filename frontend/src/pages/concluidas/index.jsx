// src/pages/concluidas/index.jsx
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import ApiService from "../../services/api";
import "../../App.css";

export default function Concluidas() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const response = await ApiService.getCompleted();
      setCompletedTasks(response);
    } catch (err) {
      console.error("Erro ao buscar tarefas concluídas:", err);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      await ApiService.delete(id);
      fetchCompletedTasks();
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <Header />

        <h2 style={{ margin: "1rem 0", color: "white" }}>Tarefas Concluídas</h2>

        <div className="cards">
          {completedTasks.length === 0 ? (
            <p style={{ color: "white" }}>Nenhuma tarefa concluída encontrada.</p>
          ) : (
            completedTasks.map((task, idx) => (
              <Card
                key={`${task.id ?? task.title}-${idx}`}
                id={task.id}
                title={task.title}
                description={task.task}
                funcDelete={() => handleDelete(task.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
