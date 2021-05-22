import { Component } from "react"

import './style.css';

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Button";


class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
  };

  async componentDidMount(){
    await this.loadPost();
  }

  loadPost = async () => {
    const { page, postsPerPage } = this.state;
    const postAndPhotos = await loadPosts();

    this.setState({
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos,
    });
  }

  loadMorePosts = () => {
    
    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }

  render() {

    const { 
      posts, 
      page, 
      postsPerPage, 
      allPosts 
    } = this.state;
    const noMorePost = page + postsPerPage >= allPosts.length;

    return (
    <section className={"container"}>
      <div className={"content"}>
        <Posts posts={posts}/>
        <Button 
          title={"Load more posts"} 
          onClick={this.loadMorePosts}
          disabled={noMorePost}
        />
      </div>
    </section>
  );
  }
}

export {Home};