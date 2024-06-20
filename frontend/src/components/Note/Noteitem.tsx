import React, { FC, useContext } from "react";
import { Note, NoteContext } from "../../context/notes/NoteContext";

interface NoteItemProps {
  note: Note;
  updateNote: (note: Note) => void;
  viewNote: (note: Note) => void;
}

const Noteitem: FC<NoteItemProps> = ({ note, updateNote, viewNote }) => {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("Use context under Provider children");
  }

  const { deleteNote } = context;
  const onDeleteClick = () => {
    deleteNote(note._id);
  };

  return (
    <>
      <div className="col-md-3 my-3 d-flex flex-wrap">
        <div
          className="card"
          style={{
            width: "18rem",
          }}
        >
          <div className="card-body">
            <h5 className="card-title">
              {note.title.length > 24
                ? note.title.slice(0, 24) + ".."
                : note.title}
            </h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {note.tag}
            </h6>
            <p className="card-text">
              {note.description.length > 90
                ? note.description.slice(0, 90) + ".."
                : note.description}
            </p>
          </div>
          <div className="container my-3">
            <i
              className="fa-sharp fa-solid fa-trash mx-2 "
              onClick={onDeleteClick}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => updateNote(note)}
            ></i>
            <i
              className="fa-sharp fa-regular fa-folder-open mx-2"
              onClick={() => viewNote(note)}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
