import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'

function About() {
  const a = useContext(NoteContext)

  useEffect(()=>{
    a.changedata()
  }, [])

  return (
    <>
      <h1>Hi, I'm Learning from {a.sample.name} and the yt channel is {a.sample.channel}</h1>
    </>)
}

export default About