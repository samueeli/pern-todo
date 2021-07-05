import { useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todoList, setTodoList] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const delTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });

      setTodoList(todoList.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:5000/todos');
      const jsonData = await res.json();
      setTodoList(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todoList);

  return (
    <>
      {' '}
      <table className="table mt-5 text-center">
        <tbody>
          {todoList.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <th>{todo.description}</th>
                <th>
                  <EditTodo todo={todo}/>
                </th>
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
