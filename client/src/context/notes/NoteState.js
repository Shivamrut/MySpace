import { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import AuthContext from "../auth/AuthContext";

const NoteState = (props) => {
    const {showAlert} = props
    
    let noteData = []
    const host = "http://localhost:8080/api"
    const [notes, setNotes] = useState(noteData)

    const getAllNotes = async () => {
        const res = await fetch(`${host}/notes/getAllNotes`, {
            method: "GET",
            headers: {

                "token":localStorage.getItem("token"),
                "Content-Type": "application/json "
            },
            // body:JSON.stringify({})
        })
        noteData = await res.json()
        if(noteData.success) setNotes(noteData.notes)
    }


    const addNote = async (note) => {
        const { title, tag, description } = note
        

        const res = await fetch(`${host}/notes/addNote`, {
            method: "POST",
            headers: {

                "token":localStorage.getItem("token"),
                "Content-Type": "application/json "
            },
            body: JSON.stringify({ title, description, tag })
        })
        noteData = await res.json()
        console.log(noteData)
        if (noteData.success === false) {
            showAlert("danger",noteData.error[0])
            return false;
            
        }
        setNotes([...notes, noteData])
        
        showAlert("success","Added Note")
        return true;
    }
    const editNote = async (note) => {
        const { etitle, etag, edescription,id } = note
        console.log("Edit Note")
        const res = await fetch(`${host}/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {

                "token":localStorage.getItem("token"),
                "Content-Type": "application/json "
            },
            body: JSON.stringify({ title : etitle, description:edescription, tag:etag })
        })
        noteData = await res.json()
        console.log(noteData)
        if (noteData.success === false) {
            showAlert("danger",noteData.error[0])
            return false ;
        }
        showAlert("success","Updated Note")
        return true;
    }
    const deleteNote = async (id) => {
        let newnotes = notes
        newnotes = newnotes.filter((n) => n._id !== id)
        setNotes(newnotes)
        const res = await fetch(`${host}/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {

                "token":localStorage.getItem("token"),
                "Content-Type": "application/json "
            },
        })
        noteData = await res.json()
        console.log(noteData)
        if (noteData.success === false) {
            showAlert("danger",noteData.error[0])
            return false
        }
        showAlert("success","Deleted Note")
        return true

    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState