import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Todo from "./components/Todo";
import { db, auth } from "./firebase";
import firebase from "firebase";
import "./App.css";

function App() {
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  //when the app loads we need to listen to the database and fetch the data.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        if (authUser.displayName) {
          setUsername(authUser.displayName);
        }
      } else {
        setUser(null);
      }
    });

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

    return () => {
      //cleanup process
      unsubscribe();
    };
  }, [user]);

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

  console.log(user);

  return (
    <>
      <Header user={user} />
      {user ? (
        <div className="app">
          <div className="greet">Have a Productive day {username}!</div>
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
      ) : (
        // create the user interface
        <div className="homepage">
          <div className="homepage__form">
            <div className="homepage__greet1">Have a good day!</div>
            <div className="homepage__greet2">It's time to have a plan.</div>
          </div>
        </div>
      )}

      <div className="footer">All Rights Reserved © | Designed by Layan</div>
    </>
  );
}

export default App;
