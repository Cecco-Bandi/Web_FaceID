import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
	let [context, setContext] = useState('SignIn');

	return (
		<Router>
			<Switch>
				<Route path='/signin'>
					<SignIn context={context} setContext={setContext} />
				</Route>
				<Route path='/signup'>
					<SignUp context={context} setContext={setContext} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
