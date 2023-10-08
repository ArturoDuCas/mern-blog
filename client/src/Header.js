import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then(res => {
      res.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })}
    ,[])


  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
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

