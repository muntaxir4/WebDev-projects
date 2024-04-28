import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

interface Note {
  title : string,
  content : string
}

function App() {
  const [myNotes , changeNotes] = useState<Note[]>([])
  useEffect(()=>{
    const savedNotes = localStorage.getItem('myNotes')
    if(savedNotes){
      changeNotes(JSON.parse(savedNotes))
    }
  },[])

  function addNote(newNote : Note) {
    changeNotes((prevNotes: Note[]) => {
      const newNotes=[...prevNotes, newNote]
      console.log(newNotes)
      localStorage.setItem('myNotes',JSON.stringify(newNotes))
      return newNotes;
    });
  }
  function delNote(id : string) {
    changeNotes((prevNotes: Note[]) => {
      const newNotes = prevNotes.filter((_, index) => index.toString() !== id);
      console.log(newNotes)
      localStorage.setItem('myNotes',JSON.stringify(newNotes))
      return newNotes;
    });
  }
  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      <div className="row d-flex justify-content-center">
        {myNotes.map((item, index) => {
          return (
            <Note
              key={index}
              id={index.toString()}
              title={item.title}
              content={item.content}
              delNote={delNote}
            />
          );
        })}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
