import { createContext } from "react";

export interface Note {
  _id: string;
  title: string;
  description: string;
  tag: string;
}

export interface AddNoteParams {
  title: string;
  description: string;
  tag: string;
}

export interface EditNoteParams {
  id: string;
  etitle: string;
  edescription: string;
  etag: string;
}

interface NoteContextType {
  tag: string;
  notes: Note[];
  tags: string[];
  setTag: (tag: string) => void;
  setNotes: (notes: Note[]) => void;
  getTags: () => Promise<void>;
  addNote: (note: AddNoteParams) => Promise<boolean>;
  deleteNote: (id: string) => Promise<boolean>;
  editNote: (note: EditNoteParams) => Promise<boolean>;
  getAllNotes: () => Promise<void>;
}

export const NoteContext = createContext<NoteContextType | null>(null);
