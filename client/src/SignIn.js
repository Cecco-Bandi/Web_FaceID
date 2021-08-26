import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Webcam from './Webcam';
import { useEffect } from 'react';
import theme from './theme';
import {ThemeProvider} from '@material-ui/core/styles'
import Copyright from './Copyright';
const axios = require('axios');


export default function SignIn({loginFrame, setLoginFrame, context, setContext}) {
	useEffect(() => {
		setContext('SignIn');
	});
	const [webcam, setWebcam] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const [signInMessage, setSignInMessage] = useState('Sign In')
	const [logPass, setLogPass] = useState(false);
	const [loginMethod, setLoginMethod] = useState("Face")
	const [disableSubmit, setDisableSubmit] = useState(true)
	const [emailInput, setEmailInput] = useState(false)
	const [emailInputMessage, setEmailInputMessage] = useState('');
	const history = useHistory();

	const classes = useStyles();

	useEffect(() => {
		async function login() {
		if (loginFrame !== null) {
			const canvas = document.getElementById('myCanvas');
			const ctx = canvas.getContext('2d');
			ctx.drawImage(loginFrame, 0, 0);

			const image_to_send = canvas.toDataURL()
			formData.append('loginFrame', image_to_send);
			setLoginFrame(null);
			//#### TO REMOVE BEFORE DEPLOYING ####
			console.log('POST data: ');
			for (let value of formData.values()) {
				console.log(value);
			}
			//#### TO REMOVE BEFORE DEPLOYING ####
			await axios.post('http://localhost:3010/login', formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((res) => {
				history.push('/home', { state: res.data[0] });
			}).catch(function (error) {
				if (error.response) {
				  if (error.response.status === 404) {
					setSignInMessage("Login Failed")
					setLoginMethod("Password")
					setLogPass(true)
				  }
				}
			});
			setFormData(new FormData());
		}
	};
	login();
	}, [loginFrame, setLoginFrame, formData]);

	const stateChange = async () => {
		let emailInput = document.getElementById("email")
		const user = await axios.get('http://localhost:3010/list').then(res => {
			const userEmail = res.data.find(user => user.email === emailInput.value);
			if (userEmail) return userEmail
		});
		console.log(user)
		if (user) {
			setEmailInput(false);
			setEmailInputMessage("Valid Email");
			setDisableSubmit(false);
		} else {
			setEmailInput(true);
			setEmailInputMessage("You are not registered yet.s");
		}
	}

	async function loginWithPass() {
		if (logPass) {
			let email = document.querySelector('#email');
			let password = document.querySelector('#password')
			password.disabled = true;
			email.disabled = true;
			formData.append('email', email.value);
			formData.append('password', password.value);
			

			await axios.post('http://localhost:3010/login', formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((res) => {
				history.push('/home', { state: res.data[0] });
			}).catch(function (error) {
				if (error.response) {
				  if (error.response.status === 404) {
					setSignInMessage("Password Incorrect")
					// setTimeout(window.location.reload(), 30000);
				  }
				}
			});
		}
	}
	
	return (
		<ThemeProvider theme={theme}>
		<Container className={classes.container}>
			<CssBaseline />
			<Paper className={classes.paper}>
				
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<div className={classes.backgroundDiv}/>
				<Typography className={classes.message} component='h1' variant='h5' color="primary">
					{signInMessage}
				</Typography>

				<Box className={classes.box} my={2}>
					<Webcam webcam={webcam} setWebcam={setWebcam} setLoginFrame={setLoginFrame} setSignInMessage={setSignInMessage} context={context} className={classes.box} />
				</Box>
				<canvas className={classes.canvas} id="myCanvas" width="128" height="128"></canvas>
				<form
					id='signInForm'
					className={classes.form}
					noValidate
					onSubmit={(e) => {
						e.preventDefault();
						if (logPass) {
							loginWithPass()
						}
						else {
							let email = document.querySelector('#email');
							if (email.value.length !== 0) {
								email.disabled = true;
								setWebcam(true);
								setSignInMessage('Point the camera to your face');
								formData.append('email', email.value);
							} else {
							setSignInMessage("Email field can't be empty");
							}
						}
					}}
				>
					<Box>
						<TextField variant='outlined' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' onBlur={stateChange} error={emailInput} helperText={emailInputMessage} InputProps={{className: classes.text}}/>
					</Box>
					{logPass ? (<TextField variant='outlined' required fullWidth name='password' label='Password' type='password' id='password' autoComplete='current-password' InputProps={{className: classes.text}}/>) : null}
					<Button type='submit' disabled={disableSubmit} fullWidth variant='contained' color='primary' className={classes.submit}>
						Authenticate with {loginMethod}
					</Button>
					<Grid container>
						<Grid item>
							<Link href='SignUp' variant='body2'>
								Already have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</form>
			</Paper>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
		</ThemeProvider>
	);
}
