import React from 'react'
import marked from 'marked'


const Comment = ({author, text, children, id, editComment, deleteComment}) => {

	const handleEdit = (event) => {
		editComment({author, id})
	}

	const handleDelete = (event) => {
		deleteComment(id)
	}

	return (
		<div>
			<button onClick={handleEdit}>{author}</button>
			<span>{text}</span>
			<button onClick={handleDelete}>Delete</button>
		</div>
	)
}

export default Comment