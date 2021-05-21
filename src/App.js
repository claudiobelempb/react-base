import { Component } from "react"

import './App.css';

import { Posts } from "./components/Posts";
import { loadPosts } from "./utils/loadPosts";


class App extends Component {

  state = {
    posts: []
  };

  async componentDidMount(){
    await this.loadPost();
  }

  loadPost = async () => {
    const postAndPhotos = await loadPosts();
    this.setState({posts: postAndPhotos});
  }

  render() {

    const { posts } = this.state;

    return (
    <section className={"container"}>
      <div className={"content"}>
        <Posts posts={posts}/>
      </div>
    </section>
  );
  }
}

export {App};