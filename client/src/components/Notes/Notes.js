import React, { useContext } from 'react'
import noteContext from '../../context/notes/NoteContext';
import Noteitem from "../Notes/Noteitem"
import Addnote from '../Addnote';

function Notes() {
    const context = useContext(noteContext)
    const {notes} =  context
    return (
        <>
            <Addnote/>
            <div className=" row my-3">
                <h1>Your Notes</h1>
                {notes.map((i) => {
                    return <Noteitem key={i._id} note={i}/>
                })}
            </div>
        </>
    )
}

export default Notes