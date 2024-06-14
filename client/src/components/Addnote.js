import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'


function Addnote() {
    const context = useContext(noteContext)
    const { addNote } = context
    const initNote = {
        title: "",
        description: "",
        tag: ""
    }
    const [note, setNote] = useState(initNote)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await addNote(note)
        if(res)setNote(initNote)

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            {/* <h1 className='d-flex justify-content-center'>Add a Note</h1> */}
            <h1 >Add a Note</h1>
            {/* <div className="container d-flex justify-content-center my-3"> */}
            <div className="container">
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name='title'
                            onChange={onChange}
                            value={note.title}
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="description"
                            name='description'
                            onChange={onChange}
                            value={note.description}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name='tag'
                            onChange={onChange}
                            value={note.tag}
                        />
                    </div>

                    <button type='submit' className='btn btn-dark' ><i className="fa-solid fa-square-plus fa-lg" /></button>
                </form>

            </div>
        </>
    )
}

export default Addnote