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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},

	box: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		boxShadow: '0 4px 8px 0 rgba(255, 105, 135, .7)',
		color: 'white',
		height: 300,
		width: 300,
	},
}));

export default function SignIn({ context, setContext, signInMessage, setSignInMessage, signUpMessage, setSignUpMessage }) {
	useEffect(() => {
		setContext('SignIn');
	});
	let [webcam, setWebcam] = useState(false);
	// let [signInMessage, setSignInMessage] = useState('Fill in your email');
	const classes = useStyles();

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Box my={2}>
					<Typography className='point-face-text' component='h1' variant='h5' dislay='none'>
						{signInMessage}
					</Typography>
				</Box>

				<Box className={classes.box} my={2}>
					<Webcam webcam={webcam} setWebcam={setWebcam} setSignInMessage={setSignInMessage} context={context} className={classes.box} />
				</Box>
				<form
					id='signInForm'
					className={classes.form}
					noValidate
					onSubmit={(e) => {
						e.preventDefault();
						let email = document.querySelector('#email');
						if (email.value.length !== 0) {
							email.disabled = true;
							setWebcam(true);
							setSignInMessage('Point the camera to your face');
						} else {
							setSignInMessage("Email field can't be empty");
						}
					}}
				>
					<Box>
						<TextField variant='outlined' margin='normal' fullWidth id='email' label='Email Address' name='email' autoComplete='email' autoFocus />
					</Box>
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
						Authenticate with Face
					</Button>
					<Grid container>
						<Grid item>
							<Link href='SignUp' variant='body2'>
								Already have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
