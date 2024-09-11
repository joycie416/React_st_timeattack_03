import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useRef, useState } from 'react'
import { addComment, getComments } from '../axios/api';

const Comments = ({id}) => {
  const queryClient = useQueryClient();
  const text = useRef('');

  const { data: comments, isPending, isError, refetch } = useQuery({
    queryKey: [`comment`, id],
    queryFn: getComments,
    select: useCallback(value => value.filter(ele => ele.postId === id)),
    enabled: false,
  })

  const {mutate: createComment} = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:['comment', id],
      })
    }
  })
  
  const showComments = (e) => {
    e.preventDefault();
    refetch();
  }

  const handleAdd = (e) => {
    e.preventDefault();
    createComment({text:text.current, postId:id})
    refetch();
  }

  if (isPending) {
    return (
      <div>
        <button onClick={showComments}>댓글보기</button>
      </div>
    )
  }
  if (isError) {
    return (
      <div>
        <button onClick={showComments}>댓글보기</button>
        <p>에러 발생</p>
      </div>
    )
  }
  return (
    <div>
      <input placeholder='comment' onChange={(e) => {text.current = e.target.value}}/>
      <button onClick={handleAdd}>댓글 저장</button>
      {comments?.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Comments