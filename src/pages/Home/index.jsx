import { useState, useEffect, useCallback } from "react"

import './style.css';

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [inputSearchValue, setInputSearchValue] = useState("");

  const noMorePost = page + postsPerPage >= allPosts.length;

  const filterPosts = !!inputSearchValue 
    ? allPosts.filter((post) => {
      return post.title.toLowerCase().includes(inputSearchValue.toLowerCase());
    }) 
    : posts;

  

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleInputSearch = (event) => {
    const { value } = event.target;
    setInputSearchValue(value);
  }

  const handleLoadPost = useCallback(async (page, postsPerPage) => {
    const postAndPhotos = await loadPosts();

    setPosts(postAndPhotos.slice(page, postsPerPage));
    setAllPosts(postAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPost(0, postsPerPage);
  }, [handleLoadPost, postsPerPage]);

  return (
    <section className={"container"}>
      <div className={"content"}>

        {!!inputSearchValue && (
          <h2>filter: {inputSearchValue}</h2> 
        )}

        <InputSearch
          onChange={handleInputSearch}
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
            onClick={loadMorePosts}
            disabled={noMorePost}
          />
        )}
      </div>
    </section>
  );
}

export {Home};