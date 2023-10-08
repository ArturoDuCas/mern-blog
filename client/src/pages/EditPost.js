import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";
import axios from "../axios"


export default function EditPost() {
  const {id} = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary]  = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get("/post/" + id);
        setTitle(response.data.title);
        setContent(response.data.content);
        setSummary(response.data.summary);
        } catch (e) {
        console.error(e);
      }
    };

    fetchPost();
  }, [])


  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if(files?.[0]) {
      data.set("file", files?.[0]);
    }

    try {
      const response = await axios.put("/post", data, {
        withCredentials: true,
      });

      if(response.status === 200) {
        setRedirect(true);
      }
    } catch(e) {
      console.error(e);
    }

  }


  if (redirect) {
    return <Navigate to={"/post/"+id} />
  }
  return (
    <form onSubmit={updatePost}>
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


      <button style={{marginTop:"5px"}}>Update Post</button>
    </form>
  );
}