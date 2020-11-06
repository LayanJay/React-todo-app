import React, { useRef, useState } from "react";
import db from "../firebase";
import "./Todo.css";

function Todo(props) {
  const [input, setInput] = useState(props.todo.todo);
  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef();

  const deleteHandler = (e) => {
    db.collection("todos").doc(props.todo.id).delete();
  };

  const editHandler = (e) => {
    e.preventDefault();
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setIsClicked(false);
  };

  const focusHandler = () => {
    inputRef.current.focus();
    setIsClicked(true);
  };

  return (
    <div className="container">
      <div className="list-card">
        <div className="todo">{props.todo.todo}</div>
        <div className="btn-div">
          <button className="delete-btn" onClick={deleteHandler}>
            <img
              src="https://img.icons8.com/flat_round/64/000000/delete-sign.png"
              alt="delete"
            />
          </button>
          <button className="edit-btn" onClick={focusHandler}>
            <img
              src="https://img.icons8.com/color/48/000000/edit.png"
              alt="edit"
            />
          </button>
        </div>
        <div
          style={!isClicked ? { display: "none" } : { display: "block" }}
          className="modal"
        >
          <div className="modal-content">
            <form className="form-todo" noValidate autoComplete="off">
              <input
                type="text"
                ref={inputRef}
                className="edit-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="edit the todo..."
              />
              <button onClick={editHandler}>
                <img
                  src="https://img.icons8.com/color/48/000000/edit.png"
                  alt="edit"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
