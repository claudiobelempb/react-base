import { Component } from "react"

import './style.css';

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";


class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    inputSearchValue: '',
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

  handleInputSearch = (event) => {
    const { value } = event.target;
    this.setState({ inputSearchValue: value });
  }

  render() {

    const { 
      posts, 
      page, 
      postsPerPage, 
      allPosts,
      inputSearchValue,
    } = this.state;
    const noMorePost = page + postsPerPage >= allPosts.length;

    const filterPosts = !!inputSearchValue 
    ? allPosts.filter((post) => {
      return post.title.toLowerCase().includes(inputSearchValue.toLowerCase());
    }) 
    : posts;

    return (
    <section className={"container"}>
      <div className={"content"}>

        {!!inputSearchValue && (
          <h2>filter: {inputSearchValue}</h2> 
        )}

        <InputSearch
          onChange={this.handleInputSearch}
          value={inputSearchValue}
        />

        {filterPosts.length > 0 && (
          <Posts posts={filterPosts}/>
        )}

        {filterPosts.length === 0 && (
          <p>Not exists posts</p>
        )}

        {!inputSearchValue && (
          <Button 
            title={"Load more posts"} 
            onClick={this.loadMorePosts}
            disabled={noMorePost}
          />
        )}
      </div>
    </section>
  );
  }
}

export {Home};