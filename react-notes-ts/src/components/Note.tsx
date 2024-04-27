
interface newNote{ 
    id : string, 
    title : string, 
    content: string, 
    delNote : (id :string) => void 
}

function Note({ id , title, content, delNote } : newNote) {
  function handleDelete() {
    console.log("deleting");
    delNote(id);
  }
  return (
    <div id={id} className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleDelete}>DELETE</button>
    </div>
  );
}

export default Note;
