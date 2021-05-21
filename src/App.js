import { Component } from "react"
import { PostCard } from "./components/PostCard"

import './App.css';

class App extends Component {

  state = {
    posts: []
  };

  componentDidMount(){
    this.loadPost();
  }

  loadPost = async () => {
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postJson = await posts.json();
    const photosJson = await photos.json();

    const postAndPhotos = postJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url}
    })

    this.setState({posts: postAndPhotos});
  }

  render() {

    const { posts } = this.state;

    return (
    <section className={"container"}>
      <div className="cards">
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
    </section>
  );
  }
}

export {App};