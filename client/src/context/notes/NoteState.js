import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const noteData = [
        {
            "_id": "666aa6acb8d19a74cf6b5cba",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "Day 13",
            "description": "This the thirteenth day of learning React",
            "tag": "react",
            "date": "2024-06-13T07:58:36.992Z",
            "__v": 0
        },
        {
            "_id": "666aa6f7b8d19a74cf6b5cbc",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "India vs USA",
            "description": "India won the match",
            "tag": "cricket",
            "date": "2024-06-13T07:59:51.131Z",
            "__v": 0
        },
        {
            "_id": "666aa6acb8d19a74cf6b5cba",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "Day 13",
            "description": "This the thirteenth day of learning React",
            "tag": "react",
            "date": "2024-06-13T07:58:36.992Z",
            "__v": 0
        },
        {
            "_id": "666aa6f7b8d19a74cf6b5cbc",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "India vs USA",
            "description": "India won the match",
            "tag": "cricket",
            "date": "2024-06-13T07:59:51.131Z",
            "__v": 0
        },
        {
            "_id": "666aa6acb8d19a74cf6b5cba",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "Day 13",
            "description": "This the thirteenth day of learning React",
            "tag": "react",
            "date": "2024-06-13T07:58:36.992Z",
            "__v": 0
        },
        {
            "_id": "666aa6f7b8d19a74cf6b5cbc",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "India vs USA",
            "description": "India won the match",
            "tag": "cricket",
            "date": "2024-06-13T07:59:51.131Z",
            "__v": 0
        },
        {
            "_id": "666aa6acb8d19a74cf6b5cba",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "Day 13",
            "description": "This the thirteenth day of learning React",
            "tag": "react",
            "date": "2024-06-13T07:58:36.992Z",
            "__v": 0
        },
        {
            "_id": "666aa6f7b8d19a74cf6b5cbc",
            "user": "666aa648b8d19a74cf6b5cb8",
            "title": "India vs USA",
            "description": "India won the match",
            "tag": "cricket",
            "date": "2024-06-13T07:59:51.131Z",
            "__v": 0
        }
    ]
    const [notes,setNotes] = useState(noteData)
    return (
        <NoteContext.Provider value={{notes:notes,setNotes:setNotes}}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState