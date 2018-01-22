import React from 'react'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import data from '../data/data'

class CommentBox extends React.Component{
	state = {
		comments: data
	}

	componentDidMount() {
		fetch('http://localhost:3001/api/comments')
		.then(res => res.json())
		.then(data => {
			debugger
			this.setState({comments: data.comments})
		})
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
		.then(data => {
			debugger
			this.setState({comments: [...this.state.comments, data.comment]})
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
			debugger
			this.setState({comments: data.comments})
		})
	}

	render(){
		return(
			<div>
				<h2>Comments: </h2>
				<CommentList data={ this.state.comments } deleteComment={this.deleteComment}/>
 				<CommentForm addComment={this.addComment} />
			</div>
		)
	}
}

export default CommentBox