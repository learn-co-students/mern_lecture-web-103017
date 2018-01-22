import React from 'react'
import marked from 'marked'


const Comment = ({author, text, children, id, deleteComment}) => {

	const handleDelete = (event) => {
		deleteComment(id)
	}

	return (
		<div>
			<h5>{author}</h5>
			<span>{text}</span>
			<button onClick={handleDelete}>Delete</button>
		</div>
	)
}

export default Comment