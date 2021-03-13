import React from 'react';
import { ListItem, Card,CardContent,Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './Todo.css';
import Madel from './Modal'
import db from './firebase'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
function Todo(props) {
    const classes = useStyles();
    return (
        
        <Card id="todo" variant="outlined">
            <CardContent>

                <Typography id="textTodo"variant="h5" component="h2">
                {props.todo.todoTitle}
                </Typography>


                <Typography variant="body2" component="p">
                    {props.todo.todoText}
          </Typography>
            </CardContent>
       <div id="btn"> 
       <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        id="del" onClick={event=>db.collection('todos').doc(props.todo.id).delete()}
      >Delete</Button>
  <Madel todo={props.todo}/>
 </div>

        </Card>
        // <ListItem>{props.text}</ListItem>    
        // <li>{props.text}</li>      
    )
}

export default Todo;