import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";
import axios from "./axios";

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    axios.get("/profile", {
      withCredentials: true,
    })
      .then(res => {
      setUserInfo(res.data);
      })
      .catch(e => {
        console.error(e);
      });

  }, [])


  async function logout() {
    await axios.post("/logout", {}, {
      withCredentials: true,
    });

    setUserInfo(null);
  }

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {userInfo?.username ? (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

      </nav>
    </header>
  );
}

