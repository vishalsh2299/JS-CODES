import axios from "axios";
import "@babel/polyfill";

const BASE_URL = "http://localhost:3000";

const form = document.querySelector("form");

// for edit
const getEditPost = () => {
  const post = JSON.parse(localStorage.getItem("post"));
  console.log(post);

  if (post !== null && post.check === true) {
    document.getElementById("title").value = post.title;
    document.getElementById("content").value = post.content;
    document.getElementById("h1").innerHTML = "EDIT";
  }

  return post;
};
const post = getEditPost();

const formEvent = form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;

  //console.log(Object.keys(post).length);
  const newPost = {
    title: title,
    content: content,
  };
  if (post === null) {
    const addedPost = await addPost(newPost);
    console.log("Added Post", addedPost);
    window.location = "http://localhost:1234/";
  } else {
    post.check = false;
    post.title = newPost.title;
    post.content = newPost.content;
    // localStorage.setItem("post", JSON.stringify(post));

    const editedPost = await editPost(post);
    console.log("Edited Post", editedPost);
    localStorage.clear();

    window.location = "http://localhost:1234/";
  }
});

// ADD
export const addPost = async (post) => {
  try {
    const res = await axios.post(`${BASE_URL}/compose`, post);
    const addedPost = res.data;

    console.log(`Added a new Post!`, addedPost);

    return addedPost;
  } catch (e) {
    console.error(e);
  }
};

// EDIT
export const editPost = async (post) => {
  try {
    const res = await axios.post(`${BASE_URL}/edit`, post);
    const editedPost = res.data;
    console.log(`Edited Post`, editedPost);
    return editedPost;
  } catch (e) {
    console.log(e);
  }
};

// Clearing local storage on changing page
const a = document.querySelectorAll("a");
a.forEach((nav) => {
  nav.addEventListener("click", () => {
    localStorage.clear();
  });
});
