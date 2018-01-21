import React from 'react'

class CommentForm extends React.Component {
	state = {
		text: ""
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.addComment(this.state)
	}




	render(){

		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" 
					   name="text" 
					   value={this.state.text}
					   onChange={this.handleChange}/>
				<input type="submit" value="Submit"/>
			</form>
		)
	}
}

export default CommentForm