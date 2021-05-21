import "./style.css";
const PostCard = ({cover, title, id, body}) => {
  return (
    <div className={"post-card"}>
      <a href={"/"} alt={""}>
        <img src={cover} alt={title} />
          <span>{id}</span>
          <h1>{title}</h1>
          <p>{body}</p>
      </a>
    </div>
  );
}

export { PostCard };