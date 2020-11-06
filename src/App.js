import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Todo from "./components/Todo";
import db from "./firebase";
import firebase from "firebase";
import "./App.css";

function App() {
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");

  //when the app loads we need to listen to the database and fetch the data.
  useEffect(() => {
    //reading data from the database
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodo(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //this will be fired when we clicked the button
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //keeping exsisting todos and spread the new todos locally.
    // setTodo([...todos, input]);
    setInput("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="app">
        <div className="greet">Have a Productive day!</div>
        <form className="form" noValidate autoComplete="off">
          <input
            className="input-todo"
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Add a Todo..."
          />
          <button
            className="button"
            disabled={!input}
            onClick={addTodo}
            type="submit"
          >
            Add Todo
          </button>
        </form>
        <div className="list">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
      <div className="footer">All Rights Reserved © | Designed by Layan</div>
    </>
  );
}

export default App;
