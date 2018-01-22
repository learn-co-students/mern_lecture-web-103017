import React from 'react'
import CommentBox from './containers/CommentBox'
import { Route, Switch, withRouter } from 'react-router-dom'


class App extends React.Component{
	state = {
		currentUser: {username: "Anonymous"}
	}



	render(){
		return (
			<Switch>
				<Route path="/comments" render={(props) => <CommentBox {...props} currentUser={this.state.currentUser}/>}/>
			</Switch>
		)
	}
}

export default withRouter(App)