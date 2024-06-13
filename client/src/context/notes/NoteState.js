import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    let noteData = []
    const host = "http://localhost:8080/api"
    const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjY2YWE2NDhiOGQxOWE3NGNmNmI1Y2I4IiwiaWF0IjoxNzE4MjY1NDE3fQ.SBPajxEZzUEA2sUcOdx0p3i1OMmKIP4h7psc6tEgFX8"
    const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjY2OWFlMDI0MjUzZGUwYWI1YjcyNjE2IiwiaWF0IjoxNzE4MjAxODU5fQ.b5jYp3KIdM7MDVt5wncWZZPRoE99LCTIjcISy5IOxhs"
    const token = token2
    const [notes, setNotes] = useState(noteData)

    const getAllNotes = async () => {
        const res = await fetch(`${host}/notes/getAllNotes`, {
            method: "GET",
            headers: {

                "token":token,
                "Content-Type": "application/json "
            },
            // body:JSON.stringify({})
        })
        noteData = await res.json()
        setNotes(noteData.notes)
    }


    const addNote = async (note) => {
        const { title, tag, description } = note

        const res = await fetch(`${host}/notes/addNote`, {
            method: "POST",
            headers: {

                "token":token,
                "Content-Type": "application/json "
            },
            body: JSON.stringify({ title, description, tag })
        })
        noteData = await res.json()
        console.log(noteData)
        if (noteData.success === false) {
            return;
        }
        setNotes([...notes, noteData])

    }
    const editNote = async (note) => {
        const { etitle, etag, edescription,id } = note
        console.log("Edit Note")
        const res = await fetch(`${host}/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {

                "token":token,
                "Content-Type": "application/json "
            },
            body: JSON.stringify({ title : etitle, description:edescription, tag:etag })
        })
        noteData = await res.json()
        console.log(noteData)
        if (noteData.success === false) {
            return;
        }
    }
    const deleteNote = async (id) => {
        let newnotes = notes
        newnotes = newnotes.filter((n) => n._id !== id)
        setNotes(newnotes)
        const res = await fetch(`${host}/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {

                "token":token,
                "Content-Type": "application/json "
            },
        })
        noteData = await res.json()
        console.log(noteData)
        if (noteData.success === false) {
            return;
        }
        // setNotes([...notes, noteData])
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState