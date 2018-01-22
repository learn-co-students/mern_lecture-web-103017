import React from 'react'


const Comment = ({author, text, children, werewolf, id, editComment, deleteComment}) => {

	const handleEdit = (event) => {
		editComment({author, id, werewolf})
	}

	const handleDelete = (event) => {
		deleteComment(id)
	}

	return (
		<div>
			<button onClick={handleEdit}>{author}</button>
			<span>{text}</span>
			{author === "Werewolf" ? <button onClick={handleDelete}>Stake with silver!</button> : null}
		</div>
	)
}

export default Comment