import { useState } from "react";

interface Note {
  title: string;
  content: string;
}

function CreateArea({ addNote }: { addNote: ({}: Note) => void }) {
  const [title, changeTitle] = useState("");
  const [content, changeContent] = useState("");
  function handleTitle(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    changeTitle(newValue);
  }
  function handleContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = event.target.value;
    changeContent(newValue);
  }
  function saveNote(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    addNote({ title, content });
    changeTitle("");
    changeContent("");
  }
  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleTitle}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={3}
          value={content}
          onChange={handleContent}
        />
        <button type="submit" onClick={saveNote}>
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
