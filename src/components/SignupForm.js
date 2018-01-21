import React from 'react'

export default class SignupForm extends React.Component{
	state = {
		username: "",
		password: "",
		passwordConfirmation: ""
	}

	handleChange = (event) => {

		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		if (this.state.password === this.state.passwordConfirmation){
			this.props.login({username: this.state.username, password: this.state.password}, "signup")
		} else {
			alert("Whoa! Those don't match!")
		}
	}

	render(){
		return(
			<div>
				<input value={this.state.username} name="username" onChange={this.handleChange}/>
				<input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
				<input type="password" value={this.state.passwordConfirmation} name="passwordConfirmation" onChange={this.handleChange}/>
				<button onClick={this.handleSubmit}>Signup</button>
			</div>
		)
	}
}