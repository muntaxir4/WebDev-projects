
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
    // <div id={id} className="note">
    //   <h1>{title}</h1>
    //   <p>{content}</p>
    //   <button onClick={handleDelete}>DELETE</button>
    // </div>
    <div id={id} className="card col-sm-3 col-10 mx-2 my-2" style={{padding:"0px"}}>
      <h1 className="card-header">{title}</h1>
      <div className="card-body">
        <p className="card-text">{content}</p>
        <button className="btn btn-outline-danger" onClick={handleDelete}>DELETE</button>
      </div>
      
    </div>
  );
}

export default Note;
