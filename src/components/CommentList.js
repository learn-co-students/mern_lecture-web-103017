import React from 'react'
import Comment from './Comment'

const CommentList = ({data, editComment, deleteComment}) => {
	let comments = data.map(comment => {
 		return (
 			<Comment author={ comment.author } 
 					 text={comment.text} 
 					 id={comment['_id']} 
 					 deleteComment={deleteComment} 
 					 editComment={editComment}
 					 key={ comment['_id'] }/>
 		)
 	})
 	
 	return (
 		<div>
 			{ comments }
 		</div>
 	)
}

export default CommentList