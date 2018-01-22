import React from 'react'
import marked from 'marked'


const Comment = ({author, text, children, id, deleteComment}) => {

	const handleDelete = (event) => {
		deleteComment(id)
	}

	return (
		<div style={{margin: "30px"}}>
			<text><strong>{author}</strong></text>
			<br/>
			<text>{text}</text>
			<br/>
			<button onClick={handleDelete}>Delete</button>
		</div>
	)
}

export default Comment