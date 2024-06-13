import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../../context/notes/NoteContext';
import Noteitem from "../Notes/Noteitem"
import Addnote from '../Addnote';

function Notes() {
    const context = useContext(noteContext)
    const [note, setNote] = useState({
        etitle: "",
        edescription: "",
        etag: ""
    })
    const { notes, getAllNotes, editNote } = context
    useEffect(() => {
        getAllNotes()

    }, [notes])

    const ref = useRef(null)
    const updateNote = (curNote) => {

        setNote({ etitle: curNote.title, etag: curNote.tag, edescription: curNote.description, id: curNote._id })

        ref.current.click()
    }

    const handleSubmit = () => {
        console.log(note)
        editNote(note)
        ref.current.click()

    }
    const onChange = (e) => {
        console.log(note)
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
            <>
                <button
                    type="button"
                    ref={ref}

                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    Modal
                </button>
                <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    Edit Note
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <form>

                                        <div className="mb-3">
                                            <label htmlFor="etitle" className="form-label">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="etitle"
                                                name='etitle'
                                                onChange={onChange}
                                                value={note.etitle}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edescription" className="form-label">
                                                Description
                                            </label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="edescription"
                                                name='edescription'
                                                onChange={onChange}
                                                value={note.edescription}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="etag" className="form-label">
                                                Tag
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="etag"
                                                name='etag'
                                                onChange={onChange}
                                                value={note.etag}
                                            />
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            <Addnote />
            <div className=" row my-3">
                <h1>Your Notes</h1>
                {notes.map((i) => {
                    return <Noteitem key={i._id} note={i} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes