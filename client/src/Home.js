import React from 'react';
import Copyright from './Copyright';
import {Box, Grid, TextField, Avatar, CssBaseline, Container, Paper, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import theme from './theme';
import {ThemeProvider} from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom';

export default function Home() {

	const classes = useStyles();
    const location = useLocation()
    const user = location.state;
    console.log(user.state.first_name)

	return (
		<ThemeProvider theme={theme}>
		<Container className={classes.container} >
			<CssBaseline />
            
			<Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
					<LockOutlinedIcon />
			</Avatar>
            <Typography className={classes.message} component='h1' variant='h5' color="primary">
				Your Data
			</Typography>
            <div className={classes.backgroundDiv}/>

            <Grid className={classes.form} container spacing={3}>
						<Grid item xs={6} >
							<TextField defaultValue={user.state.first_name} name='first_name' label="First Name" variant='outlined' InputProps={{readOnly: true}} fullWidth />
						</Grid>
						<Grid item xs={6}>
                            <TextField defaultValue={user.state.last_name} name='last_name' label="Last Name" variant='outlined' InputProps={{readOnly: true}} fullWidth />
						</Grid>
						<Grid item xs={12}>
                            <TextField defaultValue={user.state.email} name='email' label="email" variant='outlined' InputProps={{readOnly: true}} fullWidth />
						</Grid>
					</Grid>
			</Paper>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
		</ThemeProvider>
	);
}
