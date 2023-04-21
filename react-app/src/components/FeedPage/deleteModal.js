import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeletePost } from "../../store/post";
import { thunkDeleteComment } from "../../store/comment";

function DeleteModal({postId, commentId}) {
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(false)
  const { closeModal } = useModal();

  const handleDelete = async (postId, commentId) => {
    if (postId) await dispatch(thunkDeletePost(postId))
    else await dispatch(thunkDeleteComment(commentId))
    closeModal()
  }

  return (
    <div>
      <h1>Delete {postId ?  "Post" : "Comment"}?</h1>
      <p>Are you sure you want to permanently remove this {postId ?  "post" : "comment"}?</p>
      <p>{postId ?  "All likes and replies" : "All likes"} will be removed.</p>
      <div>
        <button onClick={()=>{handleDelete(postId, commentId)}}>
          Delete
        </button>
        <button onClick={()=>closeModal()}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteModal
