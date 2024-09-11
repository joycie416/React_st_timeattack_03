import axios from "axios";

const url = 'http://localhost:4000';

const api = axios.create({baseURL:url});

export const getPosts = async () => {
  try{
    const {data} = await api.get('/posts');
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const addPost = async (post) => {
  try {
    const {data} = await api.post('/posts', post);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getComments = async (id) => {
  try{
    const {data} = await api.get('/comments');
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const addComment = async (comment) => {
  try {
    const {data} = await api.post('/comments', comment);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getProfiles = async (id) => {
  try{
    const {data} = await api.get('/profile');
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
}