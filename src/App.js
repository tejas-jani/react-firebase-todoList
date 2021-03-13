import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
// import  { Button, FormControl ,InputLabel, Input } from  
import Todo from './Todo';
import db from './firebase'
import firebase from 'firebase';
function App() {
  //when the app load, we need to listen to the firebase and fetch new todos as they get added/ remove 
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [inTitle, setInTitle] = useState("");
   
  console.log(input);
  // when the app load we need listen the database and fetch new todo as they  get added/removed
  useEffect(() => {
    // this code here fires when the app.js   loads
    db.collection('todos').orderBy('timeStamp', "desc").onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()))
      setTodos(snapshot.docs.map(doc => ({ id: doc.id,todoTitle:doc.data().todoTitle, todoText: doc.data().todoText })))
      // setTodos(snapshot.docs.map(doc=> doc.data().text))

    })

  }, []);


  const addTodo = (event) => {
    //this wll fire off when we click button
    event.preventDefault();//will stope REFRESS
    console.log(input);
    // const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    // let autoId = ''
    // for (let i = 0; i < 20; i++) {
    //   autoId += chars.charAt(Math.floor(Math.random() * chars.length))
    // }
    setTodos([...todos, input]);
    db.collection("todos").add({
      todoText: input,
      todoTitle: inTitle,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput(""); //clear inputfild
    setInTitle(""); //clear inputfild
    // '...todos' means we first fill the existing aarry list and after add
    //new input value. beacause setTodos fun flush all the old value and then add new value.
  };

  return (
    <div className="App">
      <h1>Add Your TODO list📝!</h1>
      {/* <input value={input} onChange={ function(event){stInput(event.target.value);}} />   */}
      <form>
        <FormControl id="inputText">
          <InputLabel >✅write Title</InputLabel>

          <Input value={inTitle} onChange={(event) => setInTitle(event.target.value)} />
        </FormControl>
        <FormControl id="input">
          <InputLabel>✅write Todo</InputLabel>
          <Input value={input} onChange={(event) => setInput(event.target.value)} />
        </FormControl>
        {/* <button type="submit" onClick={addTodo}>Add Todo</button> */}
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>Add todo</Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
