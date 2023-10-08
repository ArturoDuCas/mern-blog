import Post from "../Post";
import {useEffect, useState} from "react";
import axios from "../axios";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/post")
      .then(response => {
        setPosts(response.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);


  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post key={post._id} {...post}/>
      ))}
    </>
  )
}