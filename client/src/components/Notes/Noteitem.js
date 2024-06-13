import React, { useContext } from 'react'
import noteContext from '../../context/notes/NoteContext'


function Noteitem(props) {
    const context = useContext(noteContext)
    const { deleteNote, editNote} = context
    const { note, updateNote } = props
    const onDeleteClick = ()=>{
        deleteNote(note._id)
    }
    
    return (
        <>
            <div className="col-md-3 my-3 d-flex flex-wrap">
            {/* <div className="col-md-3 my-3 "> */}

                <div className="card" style={{
                    width: "18rem",
                    // display: 'grid',
                    // gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
                }}>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                        <p className="card-text">
                            {note.description}
                        </p>

                        <i className="fa-sharp fa-solid fa-trash mx-2 " onClick={onDeleteClick}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
                    </div>
                </div >
            </div>

        </>
    )
}

export default Noteitem