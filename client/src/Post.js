import {format} from "date-fns";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import AssignColor from "./AssignColor";



export default function Post({title, summary, cover, content, createdAt, author, _id}) {
  const [color, setColor] = useState("");
  useEffect(() => {
    setColor(AssignColor(_id));
  }, [_id])

  return(
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          {cover ? (
            <img src={cover} alt=""/>
          ) :
            (
              <div className="no-image" style={{backgroundColor: color}}>
              </div>
            )
          }
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">
            {author.username}
          </a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}