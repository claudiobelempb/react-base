import { PostCard } from "../PostCard"
const Posts = ({posts}) => {
  return (
    <div className="box">
      {posts.map((post) => (
        <PostCard 
          key={post.id}
          id={post.id}
          cover={post.cover} 
          title={post.title}
          body={post.body}
        />
      ))}
    </div>
  );
}

export { Posts };