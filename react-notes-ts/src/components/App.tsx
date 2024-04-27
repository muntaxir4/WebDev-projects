import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

interface Note {
  title : string,
  content : string
}

function App() {
  const [myNotes , changeNotes] = useState<Note[]>([]);
  function addNote(newNote : Note) {
    changeNotes((prevNotes: Note[]) => {
      return [...prevNotes, newNote];
    });
  }
  function delNote(id : string) {
    changeNotes((prevNotes: Note[]) => {
      const newNotes = prevNotes.filter((_, index) => index.toString() !== id);
      return newNotes;
    });
  }
  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
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
      <Footer />
    </div>
  );
}

export default App;
