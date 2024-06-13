import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'


function Addnote() {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note,setNote] = useState({
        title:"",
        description : "",
        tag : ""
    })

    const handleSubmit = () => {
        console.log(note)
        addNote(note)

    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name] : e.target.value})
    }
    return (
        <>
            {/* <h1 className='d-flex justify-content-center'>Add a Note</h1> */}
            <h1 >Add a Note</h1>
            {/* <div className="container d-flex justify-content-center my-3"> */}
            <div className="container">
                <form>
                    
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
                        />
                    </div>
                    
                    {/* <div className="btn btn-dark" onClick={handleSubmit}> */}
                    <i className="fa-solid fa-square-plus fa-2xl" onClick={handleSubmit}/>
                    {/* </div> */}
                </form>

            </div>
        </>
    )
}

export default Addnote