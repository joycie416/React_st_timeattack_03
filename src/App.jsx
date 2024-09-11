import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPost, getComments, getPosts, getProfiles } from './axios/api'
import Comments from './components/Comments'

function App() {
  const queryClient = useQueryClient();
  const [title, views] = [useRef(''), useRef(0)];

  const { data: posts, isPending, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  const { data: profiles, isProfilePending, isProfileError } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  })

  const {mutate: createPost} = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:['posts'],
      })
    }
  })
  
  const handleAdd = (e) => {
    e.preventDefault();
    createPost({title:title.current, views:views.current});
  }

  if (isPending) {
    return (
      <div>
        로딩중입니다.
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        오류가 발생했습니다.
      </div>
    )
  }

  return (
    <>
    <div>
      {isProfilePending || isProfileError ? <p>profile 로딩중/에러</p>
      : <div><p>profile : {profiles.name}</p></div>}
    </div>
      <form onSubmit={handleAdd}>
        <input placeholder='title' onChange={(e) => {title.current = e.target.value}}/>
        <input placeholder='views' type='number' onChange={(e) => {views.current = +e.target.value}}/>
        <button>저장</button>
      </form>
      <div>
        {posts?.map(post => (
          <div key={post.id}>
            <p>제목 : {post.title}</p>
            <p>views : {post.views}</p>
            <Comments id={post.id}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
