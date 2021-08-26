import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	paper: {
		height: '80vh',
		width: '80vw',
		background: 'rgba( 255, 255, 255, 0.25 )',
		boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
		backdropFilter: 'blur( 4px )',
		bordeRadius: '10px',
		marginTop: theme.spacing(10),
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: '0.5fr 2fr 1fr',
		gridColumnGap: '10px',
		gridRowGap: '10px',
	},
	backgroundDiv: {
		gridArea: '1 / 2 / 4 / 3',
		background: 'linear-gradient(to right top, #9b64a3, #9971b3, #957ec1, #918ace, #8c97da, #81a5e7, #75b2f1, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
	},
	avatar: {
		gridArea: '1 / 1 / 2 / 2',
		justifySelf: 'center',
		alignSelf: 'center',
		margin: theme.spacing(1),
		backgroundColor: '#9b64a3',
	},
	avatarLogged: {
		gridArea: '2 / 1 / 3 / 2',
		justifySelf: 'center',
		alignSelf: 'center',
		margin: theme.spacing(1),
		backgroundColor: '#9b64a3',
		width: '200px',
		height: '200px'	
	},
	form: {
		gridArea: '2 / 2 / 4 / 3',
		justifySelf: 'center',
		alignSelf: 'center',
		width: '80%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		color: 'white'
	},
	submit: {
		justifySelf: 'center',
		alignSelf: 'center',
		color: '#9b64a3',
		backgroundColor: '#5FFBF1',
		margin: theme.spacing(3, 0, 2),
	},
	box: {
		gridArea: '2 / 1 / 3 / 2',
		justifySelf: 'center',
		alignSelf: 'center',
		background: 'linear-gradient(to right top, #9b64a3, #9971b3, #957ec1, #918ace, #8c97da, #81a5e7, #75b2f1, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
		border: 0,
		color: 'white',
		width: '250px',
		height: '250px'
	},
	canvas: {
		justifySelf: 'center',
		alignSelf: 'center',
		gridArea: '3 / 1 / 4 / 2',
	},
	message: {
		justifySelf: 'center',
		alignSelf: 'center',
		gridArea: '1 / 2 / 2 / 3',
	},
	text: {
		color: '#fffdfa',
		borderColor: '#fffdfa',

	}
}));

export default useStyles;