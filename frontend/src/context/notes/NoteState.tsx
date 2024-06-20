import React, { useState, FC } from "react";

import {
  AddNoteParams,
  EditNoteParams,
  Note,
  NoteContext,
} from "./NoteContext";

interface NoteStateProps {
  children: React.ReactNode;
  showAlert: (type: string, message: string) => void;
}

export const NoteState: FC<NoteStateProps> = ({ children, showAlert }) => {

  const host: string = "http://localhost:8080/api";

  const [tag, setTag] = useState<string>("ALL");
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const getAllNotes = async () => {

    let endpoint: string = "";

    if (tag === "ALL") endpoint = "/notes/getAllNotes";
    else endpoint = `/notes/getNotesWithTag/${tag}`;

    const res = await fetch(`${host}${endpoint}`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token") || "",
        "Content-Type": "application/json",
      },
    });

    const noteData = await res.json();

    if (noteData.success) setNotes(noteData.notes);
  };



  const getTags = async () => {

    const res = await fetch(`${host}/notes/getTags`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token") || "",
        "Content-Type": "application/json ",
      },
    });

    const tagData = await res.json();

    if (tagData.success) setTags(tagData.tags);
  };



  const addNote = async (note: AddNoteParams): Promise<boolean> => {

    const { title, tag, description } = note;

    const res = await fetch(`${host}/notes/addNote`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("token") || "",
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const noteData = await res.json();

    if (noteData.success === false) {
      showAlert("danger", noteData.error[0]);
      return false;
    }

    setNotes([...notes, noteData.note]);
    getTags();
    showAlert("success", "Added Note");
    return true;
  };



  const editNote = async (note: EditNoteParams): Promise<boolean> => {

    const { etitle, etag, edescription, id } = note;

    const res = await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token") || "",
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({
        title: etitle,
        description: edescription,
        tag: etag,
      }),
    });

    const noteData = await res.json();

    if (noteData.success === false) {
      showAlert("danger", noteData.error[0]);
      return false;
    }

    setNotes(notes.map((n) => (n._id === id ? noteData.note : n)));
    getTags();
    showAlert("success", "Updated Note");
    return true;
  };


  
  const deleteNote = async (id: string): Promise<boolean> => {

    const newnotes = notes.filter((n) => n._id !== id);
    setNotes(newnotes);

    const res = await fetch(`${host}/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token") || "",
        "Content-Type": "application/json ",
      },
    });

    const noteData = await res.json();

    if (noteData.success === false) {
      showAlert("danger", noteData.error[0]);
      return false;
    }

    setNotes(notes.filter((n) => n._id !== id));
    getTags();
    showAlert("success", "Deleted Note");
    return true;
  };

  return (
    <NoteContext.Provider
      value={{
        tag,
        notes,
        tags,
        setTag,
        setNotes,
        getTags,
        addNote,
        deleteNote,
        editNote,
        getAllNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
