import React from 'react'

export default class LoginForm extends React.Component{
	state = {
		username: "",
		password: ""
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {

		this.props.login(this.state, "login")
	}

	render(){
		return(
			<div>
				<input value={this.state.username} name="username" onChange={this.handleChange}/>
				<input type="password" alue={this.state.password} name="password" onChange={this.handleChange}/>
				<button onClick={this.handleSubmit}>Login</button>
			</div>
		)
	}
}