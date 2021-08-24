import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Webcam from './Webcam';
import { useEffect } from 'react';
const axios = require('axios');

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	box: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		// backgroundColor: 'rgba(255, 105, 135, 0.3)',
		boxShadow: '0 4px 8px 0 rgba(255, 105, 135, .7)',
		color: 'white',
		height: 300,
		width: 300,
	},
}));

export default function SignUp({ regFrame, setRegFrame, context, setContext }) {
	useEffect(() => {
		setContext('SignUp');
	});
	const classes = useStyles();
	const [webcam, setWebcam] = useState(false);
	const [signUpMessage, setSignUpMessage] = useState('Please fill in the form');
	const [formData, setFormData] = useState(new FormData());

	useEffect(() => {
		if (regFrame !== null) {
			const canvas = document.getElementById('myCanvas');
			const ctx = canvas.getContext('2d');
			ctx.drawImage(regFrame, 0, 0);
			formData.append('regFrame', regFrame, 'chris.bpm');
			console.log('frame added to formData:', formData.get('regFrame'));
			setRegFrame(null);

			//#### TO REMOVE BEFORE DEPLOYING ####
			console.log('POST data: ');
			for(var pair of formData.entries()) {
				console.log(pair[0]+ ', '+ pair[1]);
			 }
			//#### TO REMOVE BEFORE DEPLOYING ####
			// axios.post('http://localhost:80/register', formData, {
			// 		headers: {
			// 			'Content-Type': 'multipart/form-data',
			// 		}
			// 	})
			// fetch('http://localhost:80/register', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'multipart/form-data',
			// 	},
			// 	body: formData,
			// }).then(data => {
			//   console.log('Success:', data);
			// })
			// .catch((error) => {
			//   console.error('Error:', error);
			// });
		}
	}, [regFrame, setRegFrame, formData]);

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<canvas id="myCanvas" width="128" height="128"></canvas>
				<Box my={2}>
					<Typography component='h1' variant='h5'>
						{signUpMessage}
					</Typography>
				</Box>
				<Box className={classes.box} mb={2}>
					<Webcam webcam={webcam} setWebcam={setWebcam} regFrame={regFrame} setRegFrame={setRegFrame} setSignUpMessage={setSignUpMessage} context={context} className={classes.box} />
				</Box>
				<form
					id='form'
					className={classes.form}
					noValidate
					onSubmit={async (e) => {
						e.preventDefault();
						let inputs = document.querySelectorAll('input');
						const inputsArr = Array.from(inputs);
						const checkEmpty = (input) => input.value.length !== 0;
						const uniform = inputsArr.every(checkEmpty);
						if (uniform) {
							inputs.forEach((input) => (input.disabled = true));
							setSignUpMessage('Point the camera to your face');
							inputs.forEach((input) => {
								const key = input.name;
								console.log('KEY ----> ', input.name)
								const value = input.value;
								formData.append(key, value);
							});
							setWebcam(true);
						} else {
							setSignUpMessage('Some fields are empty');
						}
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField autoComplete='fname' name='first_name' variant='outlined' required fullWidth id='firstName' label='First Name' autoFocus />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField variant='outlined' required fullWidth id='lastName' label='Last Name' name='last_name' autoComplete='lname' />
						</Grid>
						<Grid item xs={12}>
							<TextField variant='outlined' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' />
						</Grid>
						<Grid item xs={12}>
							<TextField variant='outlined' required fullWidth name='password' label='Password' type='password' id='password' autoComplete='current-password' />
						</Grid>
					</Grid>
					<Button fullWidth variant='contained' color='primary' className={classes.submit} type='submit'>
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
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
