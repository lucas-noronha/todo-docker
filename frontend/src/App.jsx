import { useState, useEffect } from 'react'

import './App.css'
import Textbox from './components/Textbox'
import Header from './components/Header'
import Card from './components/Card'
import ApiService from './services/api'
function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }
    , []);

  const fetchTasks = async () => {
    try {
      const response = await ApiService.get();
      console.log("Tarefas recebidas:", response);
      if (response)
        setTasks(response);


    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const newTask = { title, description };
      await ApiService.post(newTask);
      setTitle("");
      setDescription("");
      fetchTasks(); // Recarrega as tarefas após a criação
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const handleDelete = (id) => async () => {
    console.log("Deletando tarefa com ID:", id);
    try {
      await ApiService.delete(id);
      fetchTasks(); // Recarrega as tarefas após a exclusão
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  }

  const handleDone = (id) => async () => {
    console.log("Marcando tarefa como concluída com ID:", id);
    try {
      await ApiService.put(id);
      fetchTasks(); // Recarrega as tarefas após a atualização
    } catch (error) {
      console.error("Erro ao marcar tarefa como concluída:", error);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <Header />

        <Textbox placeholder="Título da tarefa" value={title} onChange={setTitle} />
        <Textbox placeholder="Descrição da tarefa" value={description} onChange={setDescription} />

        <button className="submit-btn" onClick={handleSubmit}>Cadastrar</button>

        <div className="cards">
          {tasks.map((task, index) => (
            <Card
              key={`${task.id ?? task.title}-${index}`}
              id={task.id}
              title={task.title}
              description={task.task}
              funcDone={() => handleDone(task.id)}
              funcDelete={() => handleDelete(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default App
