import React from 'react'

function Noteitem(props) {
    const {note} = props
    console.log("NOTE",note)
    return (
        <>
        <div className="col-md-4 my-3">

            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                    <p className="card-text">
                        {note.description}
                    </p>
                    
                </div>
            </div>
        </div>

        </>
    )
}

export default Noteitem