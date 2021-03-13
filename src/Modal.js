import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import './Modal.css'
import db from './firebase';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import firebase from 'firebase'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',        
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Modal1(props) {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [input, setInput] = useState(" ");
    const [inTitle, setInTitle] = useState(" ");
    
    // const [input, setInput] = useState(props.todo.todoText);
    // const [inTitle, setInTitle] = useState(props.todo.todoTitle);

    const handleOpen = () => {

        setOpen(true);
    };

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id)
            .set(
                {
                    todoText: input,
                    todoTitle: inTitle,
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true }
            )
        console.log("updated");

        setOpen(false);


    };


    return (
        <div>
            {/* <Button> */}

            < Fab id="edit" onClick={handleOpen} color="secondary" aria-label="edit">
                <EditIcon />
            </Fab>
            {/* </Button> */}
            <Modal 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={updateTodo}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2><InputLabel >✅write Title</InputLabel>
                        <Input value={inTitle} onChange={(event) => setInTitle(event.target.value)} /></h2>
                    <textarea value={input} onChange={(event) => setInput(event.target.value)} class="textarea">

                    </textarea>

                    <Button id="save" onClick={updateTodo}

                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

