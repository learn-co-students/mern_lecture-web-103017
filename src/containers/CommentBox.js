import React from 'react'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import data from '../data/data'

class CommentBox extends React.Component{
	state = {
		comments: data
	}

	componentDidMount() {
		// fetch('http://localhost:3001/api/comments')
		// .then(res => res.json())
		// .then(comments => this.setState({comments}))
	}

	addComment = (comment) => {
		let newComment = {
			author: this.props.currentUser.username,
			text: comment.text
		}

		let headers = {
			"Content-Type": 'application/json',
			"Accept": "application/json"
		}

		fetch("http://localhost:3001/api/comments", {
			method: "POST",
			headers: headers,
			body: JSON.stringify(newComment)
		})
		.then(res => res.json())
		.then(data => this.setState({comments: [...this.state.comments, data.comment]}))
	}

	editComment = (comment) => {
		let headers = {
			"Content-Type": 'application/json',
			"Accept": "application/json"
		}

		if (comment.werewolf) {
			comment.author = "Werewolf"
			comment.text = "Awooooooo!"
		}


		fetch(`http://localhost:3001/api/comments/${comment.id}`, {
			method: "PUT",
			headers: headers,
			body: JSON.stringify({comment})
		})
		.then(res => res.json())
		.then(data => {
			let newComments = this.state.comments.slice()

			let index = newComments.findIndex(comment => comment['_id'] === data.comment['_id'])
			newComments[index] = data.comment

			this.setState({comments: newComments})
		})
	}

	deleteComment = (commentID) => {
		let headers = {
			"Content-Type": 'application/json',
			"Accept": "application/json"
		}

		fetch(`http://localhost:3001/api/comments/${commentID}`, {
			method: "DELETE",
			headers: headers,
		})
		.then(res => res.json())
		.then(data => {
			this.setState({comments: data.comments})
		})
	}

	render(){
		return(
			<div>
				<h2>Comments: </h2>
				<CommentList data={ this.state.comments } deleteComment={this.deleteComment} editComment={this.editComment}/>
 				<CommentForm addComment={this.addComment} />
			</div>
		)
	}
}

export default CommentBox