import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import noteContext from '../../context/notes/NoteContext';
import Noteitem from "../Notes/Noteitem"
import Addnote from '../Addnote';

function Notes() {
    const navigate = useNavigate()
    const context = useContext(noteContext)
    const [note, setNote] = useState({
        etitle: "",
        edescription: "",
        etag: ""
    })
    const { notes , tag, getAllNotes, editNote,getTags } = context
    useEffect(() => {
        if (localStorage.getItem("token")){
            getAllNotes()
            getTags()
        }
        else navigate("/login")

    }, [])
    useEffect(() => {
        if (localStorage.getItem("token")){
            getAllNotes();
            getTags()
        }
    }, [tag]);

    const ref = useRef(null)
    const viewRef = useRef(null)
    const updateNote = (curNote) => {

        setNote({ etitle: curNote.title, etag: curNote.tag, edescription: curNote.description, id: curNote._id })

        ref.current.click()
    }

    const viewNote = (curNote) => {
        setNote({ etitle: curNote.title, etag: curNote.tag, edescription: curNote.description, id: curNote._id })

        viewRef.current.click()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(note)
        editNote(note)
        ref.current.click()

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='editModal'>
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
                                    <form onSubmit={handleSubmit}>

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
                                                minLength={5}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edescription" className="form-label">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control resize-vertical"
                                                id="edescription"
                                                name='edescription'
                                                onChange={onChange}
                                                value={note.edescription}
                                                minLength={5}
                                                required
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

                                        <button type="submit" className="btn btn-primary " >
                                            Update
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-secondary mx-3"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>


                                    </form>

                                </div>
                            </div>
                            <div className="modal-footer"></div>



                        </div>

                    </div>
                </div>
            </div>
            <div className="viewModal">
                <>
                    <button
                        type="button"
                        className="btn btn-primary d-none"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        ref={viewRef}
                    >
                        View
                    </button>
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title  text-body-secondary fs-4" id="exampleModalLabel">
                                        {note.etitle}
                                    </h1>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    {note.edescription}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </>

            </div>

            <Addnote />
            {/* <hr/> */}
            <div className=" row my-3">
            <h1>Your Notes</h1>
                {notes.length === 0 && <div className="container">No Notes to display</div>}
                {notes.map((i) => {
                    return <Noteitem key={i._id} note={i} updateNote={updateNote} viewNote={viewNote} />
                })}
            </div>
        </>
    )
}

export default Notes