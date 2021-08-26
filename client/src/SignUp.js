import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Copyright from './Copyright';
import {Box, Grid, Link, TextField, Avatar, Button, CssBaseline, Typography, Container, Paper} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import theme from './theme';
import {ThemeProvider} from '@material-ui/core/styles'
import Webcam from './Webcam';
const axios = require('axios');

export default function SignUp({ regFrame, setRegFrame, context, setContext }) {
	useEffect(() => {
		setContext('SignUp');
	});

	const classes = useStyles();
	const [signUpMessage, setSignUpMessage] = useState('Sign Up')
	const [disableSubmit, setDisableSubmit] = useState(true)
	const [webcam, setWebcam] = useState(false);
	const [emailInput, setEmailInput] = useState(false)
	const [emailInputMessage, setEmailInputMessage] = useState('');
	const [formData, setFormData] = useState(new FormData());
	const [user, setUser] = useState(null)
	const history = useHistory();

	const stateChange = async () => {
		let emailInput = document.getElementById("email")
		const user = await axios.get('http://localhost:3010/list').then(res => {
			const userEmail = res.data.find(user => user.email === emailInput.value);
			if (userEmail) return userEmail
		});
		console.log(user)
		if (user) {
			setEmailInput(true);
			setEmailInputMessage("Email already in use");
		} else {
			setEmailInput(false);
			setEmailInputMessage("Valid Email");
		}
	}

	const checkUniform = () => {
		const inputs = document.querySelectorAll('input');
		const inputsArr = Array.from(inputs);
		const checkEmpty = (input) => input.value.length !== 0;
		const uniform = inputsArr.every(checkEmpty);
		return uniform;
	}

	const checkSubmitDisable = () => {
		const uniform = checkUniform();
		if (uniform) setDisableSubmit(false)
		else setDisableSubmit(true);
	}

	useEffect( () => {
		async function register() {
		if (regFrame !== null) {
			const canvas = document.getElementById('myCanvas');
			const ctx = canvas.getContext('2d');
			ctx.drawImage(regFrame, 0, 0);

			const image_to_send = canvas.toDataURL()
			formData.append('regFrame', image_to_send);
			setRegFrame(null);
			
			await axios.post('http://localhost:3010/register', formData, {
					headers: {
						'Content-Type': 'application/json',
					}
			}).then(res => {
				if (res.status === 200) {
					console.log(res.data)
					history.push('/home', { state: res.data });
				} else {
					setSignUpMessage("Sign Up Failed")
					setTimeout(window.location.reload(), 3000);
				}
			  });			
		}
	};
	register();	
	}, [regFrame, setRegFrame, formData]);

	return (
		<ThemeProvider theme={theme}>
		<Container className={classes.container} >
			<CssBaseline />
			<Paper className={classes.paper}>
			<div className={classes.backgroundDiv}/>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Box className={classes.box} mb={2}>
					<Webcam webcam={webcam} setWebcam={setWebcam} regFrame={regFrame} setRegFrame={setRegFrame} setSignUpMessage={setSignUpMessage} context={context} className={classes.box} />
				</Box>
				<canvas id="myCanvas" width="120" height="120" className={classes.canvas}></canvas>
				<Typography className={classes.message} component='h1' variant='h5' color="primary">
					{signUpMessage}
				</Typography>
				<form
					id='form'
					className={classes.form}
					noValidate
					onSubmit={(e) => {
						e.preventDefault();
						const uniform = checkUniform()
						if (uniform) {
							const inputs = document.querySelectorAll('input');
							inputs.forEach((input) => (input.disabled = true));
							setSignUpMessage('Point the camera to your face');
							inputs.forEach((input) => {
								const key = input.name;
								const value = input.value;
								formData.append(key, value);
							});
							setWebcam(true);
						} else {
							setSignUpMessage('Some fields are empty');
						}
					}}
				>
					<Grid container spacing={3}>
						<Grid item xs={6} >
							<TextField autoComplete='fname' name='first_name' variant='outlined' required fullWidth id='firstName' label='First Name' autoFocus onBlur={checkSubmitDisable} InputProps={{className: classes.text}} />
						</Grid>
						<Grid item xs={6}>
							<TextField variant='outlined' required fullWidth id='lastName' label='Last Name' name='last_name' autoComplete='lname' onBlur={checkSubmitDisable} InputProps={{className: classes.text}}/>
						</Grid>
						<Grid item xs={12}>
							<TextField variant='outlined' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' onBlur={stateChange} onChange={checkSubmitDisable} error={emailInput} helperText={emailInputMessage} InputProps={{className: classes.text}}/>
						</Grid>
						<Grid item xs={12}>
							<TextField variant='outlined' required fullWidth name='password' label='Password' type='password' id='password' autoComplete='current-password' onChange={checkSubmitDisable} InputProps={{className: classes.text}}/>
						</Grid>
					</Grid>
					<Button fullWidth disabled={disableSubmit} variant='contained' className={classes.submit} type='submit'>
						Sign Up
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link href='SignIn' variant='body2'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</Paper>
			<Box  mt={5}>
				<Copyright />
			</Box>
		</Container>
		</ThemeProvider>
	);
}
