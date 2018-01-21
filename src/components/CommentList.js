import React from 'react'
import Comment from './Comment'

const CommentList = ({data, editComment, deleteComment}) => {
	let commentNodes = data.map(comment => {
 		return (
 			<Comment author={ comment.author } werewolf={comment.werewolf} id={comment['_id']} deleteComment={deleteComment} editComment={editComment}key={ comment['_id'] }>
 				{ comment.text}
 			</Comment>
 		)
 	})
 	
 	return (
 		<div>
 			{ commentNodes }
 		</div>
 	)
}

export default CommentList