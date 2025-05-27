"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import AddOrEditTask, {
  IFormData,
  IToDoData,
} from './add-edit-task';

export default function Todos() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoItemBeingEdited, setTodoItemBeingEdited] = useState<IToDoData>();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
    } else {
      fetchTodos();
    }
  }, [session, status]);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const makeApiCall = async (
    { title, description, status }: IFormData,
    url: string,
    method: string,
  ) => {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, status }),
    });

    if (res.ok) {
      alert(todoItemBeingEdited ? 'TODO updated successfully': 'TODO created successfully');
      fetchTodos();
      closeModal();
    } else {
      const error = await res.json();
      alert(error.message);
    }
  };

  const handleSubmit = async ({ title, description, status }: IFormData) => {
    const url = todoItemBeingEdited ? `/api/todos/${todoItemBeingEdited._id}` : '/api/todos/';
    const method = todoItemBeingEdited ? 'PUT' : 'POST';

    await makeApiCall({ title, description, status }, url, method);
  };

  const addOrEditTask = (isNewTask = false, todo?: IToDoData) => {
    if (!isNewTask) {
      setTodoItemBeingEdited(todo);
    }

    setIsModalOpen(true);
  }

  const deleteTask = async (todo: IToDoData) => {
    const url = `/api/todos/${todo._id}`;

   const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert('Task deleted successfully');
      fetchTodos();
      closeModal();
    } else {
      const error = await res.json();
      alert(error.message);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setTodoItemBeingEdited(undefined);
  }

  return (
    <div className="m-20">
      <button onClick={() => addOrEditTask(true)} className="bg-gray-600 text-white p-2 rounded mb-4">
        Add Task
      </button>

      {/* TODO Table */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: IToDoData) => (
            <tr key={todo._id}>
              <td className="border border-gray-300 p-2 text-center">{todo.title}</td>
              <td className="border border-gray-300 p-2 text-center">{todo.description}</td>
              <td className="border border-gray-300 p-2 text-center">{todo.status}</td>
              <td className="border border-gray-300 p-2 text-center">
                <button onClick={() => addOrEditTask(false, todo)} className="bg-gray-600 text-white p-2 rounded mb-4 min-w-1/4">Edit</button>
                <button onClick={() => deleteTask(todo)} className="bg-red-500 text-white p-2 rounded mb-4 ml-10 min-w-1/4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AddOrEditTask
          todoItemBeingEdited={todoItemBeingEdited}
          onSubmit={ handleSubmit }
          onCancel={ closeModal }
        />
      )}
    </div>
  );
}
