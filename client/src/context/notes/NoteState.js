import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const noteData = [
        {
            "_id": "666aa6acb8d19a74cf6asdb5cba",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "Day 13",
            "description": "This the thirteenth day of learning React",
            "tag": "react",
            "date": "2024-06-13T07:58:36.992Z",
            "__v": 0
        },
        {
            "_id": "666aa6f7b8d19a74cfsadf6b5cbc",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "India vs USA",
            "description": "India won the match",
            "tag": "cricket",
            "date": "2024-06-13T07:59:51.131Z",
            "__v": 0
        },
        {
            "_id": "666aa6acb8d19a74sdfcf6b5cba",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "Day 13",
            "description": "This the thirteenth day of asd asdf as asf sas gsf gdsg adsdgf dsfdgadf fdg dsgf sfdg asgf sfgg sdfg learning React",
            "tag": "react",
            "date": "2024-06-13T07:58:36.992Z",
            "__v": 0
        },
        {
            "_id": "666aa6f7b8d1asdg9a74cf6b5cbc",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "India vs USA",
            "description": "India won the match",
            "tag": "cricket",
            "date": "2024-06-13T07:59:51.131Z",
            "__v": 0
        },
        {
            "_id": "666aa6acb8d19gera74cf6b5cba",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "Day 13",
            "description": "This the thirteenth day of learning React",
            "tag": "react",
            "date": "2024-06-13T07:58:36.992Z",
            "__v": 0
        },
        {
            "_id": "666aa6f7b8d19a74cf6basdf5cbc",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "India vs USA",
            "description": "India won the match",
            "tag": "cricket",
            "date": "2024-06-13T07:59:51.131Z",
            "__v": 0
        },
        {
            "_id": "666aa6acb8d19a74cfwe6b5cba",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "Day 13",
            "description": "This the thirteenth day of learning React",
            "tag": "react",
            "date": "2024-06-13T07:58:36.992Z",
            "__v": 0
        },
        {
            "_id": "666aa6f7b8d19a74cfads6b5cbc",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "India vs USA",
            "description": "India won the match",
            "tag": "cricket",
            "date": "2024-06-13T07:59:51.131Z",
            "__v": 0
        }
    ]
    const [notes,setNotes] = useState(noteData)

    const addNote = (noteData)=>{
        const {title = "Some title",tag,description} = noteData
        const note = {
            "_id": "666aa6f7b8d19aadsf74cfads6b5cbc",
            "user": "666aa648fdsb8d19a74cf6b5cb8",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-06-13T07:59:51.131Z",
            "__v": 0
        }

        setNotes([...notes,note])

    }
    const editNote = (id)=>{

    }
    const deleteNote = (id)=>{
        let newnotes = notes
        newnotes = newnotes.filter((n)=>  n._id!==id)
        setNotes(newnotes)
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState