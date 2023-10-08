import {useState} from "react";
import "react-quill/dist/quill.snow.css";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary]  = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);


  async function createPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      credentials: "include",
      body: data,
    })

    if(response.ok) {
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to="/" />
  }
  return(
    <form onSubmit={createPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
      />

      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)}
        accept=".png"
      />

      <Editor value={content} onChange={setContent}/>

      <button style={{marginTop:"5px"}}>Create Post</button>
    </form>

  );
}