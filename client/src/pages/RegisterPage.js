import {useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "../axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault()

    axios.post("/register", {
      username,
      password,
    }, {})
      .then(res => {
        setRedirect(true);
      })
      .catch(e => {
        console.error(e);
      });
  }


  if(redirect) {
    return <Navigate to={"/"} />
  }
  return(
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button>Register</button>

    </form>
  )
}