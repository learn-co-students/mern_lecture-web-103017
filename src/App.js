import React from 'react'
import CommentBox from './containers/CommentBox'
import { Route, Switch, withRouter } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

class App extends React.Component{
	state = {
		currentUser: {username: "Anonymous"}
	}

	login = (userInput, type) => {
		let headers = {
			"Content-Type": 'application/json',
			"Accept": "application/json"
		}
		fetch(`http://localhost:3001/api/${type}`, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(userInput)
		})
		.then(res => res.json())
		.then(res => {
			if (res.error){
				alert(res.error)
			} else {
				this.setState({currentUser: res}, this.props.history.push("/comments"))
			}
		})
	}

	render(){
		return (
			<Switch>
				<Route path="/comments" render={(props) => <CommentBox {...props} currentUser={this.state.currentUser}/>}/>
				<Route path="/login" render={(props) => <LoginForm {...props} login={this.login}/>}/>
				<Route path="/signup" render={(props) => <SignupForm {...props} login={this.login}/>}/>
			</Switch>
		)
	}
}

export default withRouter(App)