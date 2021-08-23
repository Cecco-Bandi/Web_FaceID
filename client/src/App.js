import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
	let [context, setContext] = useState('SignIn');
	let [signInMessage, setSignInMessage] = useState('Fill in your email');
	let [signUpMessage, setSignUpMessage] = useState('Please fill in the form');
	let [loginFrame, setLoginFrame] = useState(null);
	let [regFrame, setRegFrame] = useState(null);

	return (
		<Router>
			<Switch>
				<Route path='/signin'>
					<SignIn loginFrame={loginFrame} setLoginFrame={setLoginFrame} context={context} setContext={setContext} signInMessage={signInMessage} setSignInMessage={setSignInMessage} signUpMessage={signUpMessage} setSignUpMessage={setSignUpMessage} />
				</Route>
				<Route path='/signup'>
					<SignUp regFrame={regFrame} setRegFrame={setRegFrame} context={context} setContext={setContext} signInMessage={signInMessage} setSignInMessage={setSignInMessage} signUpMessage={signUpMessage} setSignUpMessage={setSignUpMessage} />{' '}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
