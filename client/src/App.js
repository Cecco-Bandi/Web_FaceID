import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
	let [context, setContext] = useState('SignIn');
	let [loginFrame, setLoginFrame] = useState(null);
	let [regFrame, setRegFrame] = useState(null);

	return (
		<Router>
			<Switch>
				<Route path='/signin'>
					<SignIn loginFrame={loginFrame} setLoginFrame={setLoginFrame} context={context} setContext={setContext} />
				</Route>
				<Route path='/signup'>
					<SignUp regFrame={regFrame} setRegFrame={setRegFrame} context={context} setContext={setContext} />{' '}
				</Route>
				<Route path='/home'>
					<Home />	
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
