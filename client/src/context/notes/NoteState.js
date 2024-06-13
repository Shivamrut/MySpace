import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const obj = {
        "name": "Harry",
        "channel": "CWH"
    }
    const [sample, setSample] = useState(obj)
    const changedata = () => {
        setTimeout(() => {
            setSample({
                "name": "Naveen Reddy",
                "channel": "Telusko"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{ sample,changedata }}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState