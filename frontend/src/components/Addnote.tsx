import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useRef,
  useState,
} from "react";
import { NoteContext } from "../context/notes/NoteContext";

interface InputNote {
  title: string;
  description: string;
  tag: string;
}

const initNote: InputNote = {
  title: "",
  description: "",
  tag: "",
};

const Addnote: FC = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("Use context under Provider children");
  }
  const { addNote } = context;

  const addRef = useRef<HTMLButtonElement | null>(null);
  const [note, setNote] = useState<InputNote>(initNote);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await addNote(note);
    if (res) {
      setNote(initNote);
      if (addRef.current) addRef.current.click();
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="d-flex justify-content-start flex-row align-items-center mt-2">
        <h1 className="my-3 text-align-center me-3">Add </h1>

        <>
          <button
            type="button"
            className="btn btn-dark m-3"
            data-bs-toggle="modal"
            data-bs-target="#addModal"
            ref={addRef}
          >
            <i className="fa-solid fa-square-plus fa-lg" />
          </button>
          <div
            className="modal fade"
            id="addModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add Note
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        onChange={onChange}
                        value={note.title}
                        minLength={5}
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
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
                        name="tag"
                        onChange={onChange}
                        value={note.tag}
                        autoComplete="off"
                      />
                    </div>
                    <button type="submit" className="btn btn-dark ">
                      <i className="fa-solid fa-square-plus fa-lg" />
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
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Addnote;
