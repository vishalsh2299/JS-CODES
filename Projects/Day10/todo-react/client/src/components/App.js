import React, { useEffect, useState } from "react";
import axios from "axios";
import Radium from "radium";
import "./App.css";

const api = axios.create({
  baseURL: `http://localhost:5000/`,
});

function App() {
  const [todos, setTodos] = useState([]);

  // ADD DATA
  const addTodo = (value) => {
    api.post("/", { name: value }).then((res) => {
      setTodos(res.data);
      //console.log(res.data);
    });
  };

  // TODO FORM
  const TodoForm = Radium(() => {
    let input;

    const style = {
      width: "100%",
      fontSize: "20px",
      padding: "1rem",
      boxShadow:
        "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)",
      border: "none",
      borderBottom: " 2px solid rgb(204, 154, 154)",
      ":focus": {
        outline: "none",
      },
    };

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo(input.value);
            input.value = "";
          }}
        >
          <input
            style={style}
            ref={(node) => {
              input = node;
            }}
          />
          <br />
        </form>
      </div>
    );
  });

  // UPDATING STATE
  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        if (res.status === 200) {
          console.log("Fetched Data", res.data);
          setTodos(res.data);
        } else {
          console.log("Failed to fetch data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // DELETE TODO
  const deleteTodo = (id) => {
    const rem = todos.filter((todo) => {
      if (todo._id !== id) return todo;
    });
    //console.log(id);
    api
      .post("/delete", { id: id })
      .then((res) => {
        if (res.status === 200) {
          setTodos(rem);
        } else {
          console.log("Failed to Delete Item");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleTodo = (id) => {
    // make strikethrough
    const todoChange = [...todos];
    todoChange.map((todo) => {
      if (todo._id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setTodos(todoChange);

    api
      .get(`/toggle?id=${id}`)
      .then((res) => {
        if (res.status === 200) {
          // console.log("Toggled");
        } else {
          console.log("Toggle failed at backend");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ALL TODOS
  const allTodo = () => {
    api
      .get("/")
      .then((res) => {
        if (res.status === 200) {
          setTodos(res.data);
        } else {
          console.log("Unable to fetch");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ACTIVE TODOS
  const activeTodo = () => {
    api
      .get("/active")
      .then((res) => {
        if (res.status === 200) {
          setTodos(res.data);
          console.log(res.data);
        } else {
          console.log("Unable to fetch");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // COMPLETED TODOS
  const completedTodo = () => {
    api
      .get("/complete")
      .then((res) => {
        if (res.status === 200) {
          setTodos(res.data);
          console.log(res.data);
        } else {
          console.log("Unable to fetch data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // CLEAR TODOS
  const clearCompletedTodo = () => {
    api
      .get("/clearcomplete")
      .then((res) => {
        if (res.status === 200) {
          setTodos(res.data);
        } else {
          console.log("Unable to clear");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1>todos</h1>
      <TodoForm />
      <div>
        <ul>
          {todos.map((todo) => (
            <li>
              <input
                type="checkbox"
                checked={todo.isCompleted ? "checked" : ""}
                onChange={() => toggleTodo(todo._id)}
              />

              <span> {todo.name}</span>
              <button onClick={() => deleteTodo(todo._id)}>&#10005;</button>
            </li>
          ))}
        </ul>
      </div>

      <footer className="footer">
        <ul className="list">
          <li onClick={allTodo}>All</li>
          <li onClick={activeTodo}>Active</li>
          <li onClick={completedTodo}>Completed</li>
          <li onClick={clearCompletedTodo}>Clear Completed</li>
          <li class="count" id="items-left">
            <strong>{todos.length}</strong>&nbsp; items left
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
