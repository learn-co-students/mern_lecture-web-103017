import React from 'react'
import marked from 'marked'


const Comment = ({author, children, werewolf, id, editComment, deleteComment}) => {

	const rawMarkup = () => {
		let rawMarkup = marked(children.toString());
		return { __html: rawMarkup };
	}

	const handleEdit = (event) => {
		editComment({author, id, werewolf})
	}

	const handleDelete = (event) => {
		deleteComment(id)
	}

	return (
		<div>
			<button onClick={handleEdit}>{author}</button>
			<span dangerouslySetInnerHTML={ rawMarkup() } />
			{author === "Werewolf" ? <button onClick={handleDelete}>Stake with silver!</button> : null}
		</div>
	)
}

export default Comment