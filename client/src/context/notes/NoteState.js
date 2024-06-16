import {  useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const {showAlert} = props
    const [tag,setTag] = useState("ALL")
    
    let noteData = []
    const [notes, setNotes] = useState(noteData)

    let tagData = []
    const [tags, setTags] = useState(tagData)
    const host = "http://localhost:8080/api"

    const getAllNotes = async () => {
        let endpoint = ""
        if(tag==="ALL")endpoint = "/notes/getAllNotes"
        else endpoint=`/notes/getNotesWithTag/${tag}`
        const res = await fetch(`${host}${endpoint}`, {
            method: "GET",
            headers: {

                "token":localStorage.getItem("token"),
                "Content-Type": "application/json "
            },
            // body:JSON.stringify({})
        })
        noteData = await res.json()
        // console.log(noteData);
        if(noteData.success) setNotes(noteData.notes)
    }

    const getTags = async()=>{
        const res = await fetch(`${host}/notes/getTags`, {
            method: "GET",
            headers: {

                "token":localStorage.getItem("token"),
                "Content-Type": "application/json "
            },
            // body:JSON.stringify({})
        })
        tagData = await res.json()
        // console.log(tagData.tags);
        if(tagData.success) setTags(tagData.tags)
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
        // console.log(noteData);
        // getAllNotes()
        setNotes([...notes, noteData.note])
        
        getTags()
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
        setNotes(notes.map(n => n._id === id ? noteData.note : n));
        getTags()
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
        setNotes(notes.filter(n => n._id !== id)); 
        getTags()
        showAlert("success","Deleted Note")
        return true

    }
    return (
        <NoteContext.Provider value={{tag, notes,tags,setTag, setNotes,getTags, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState