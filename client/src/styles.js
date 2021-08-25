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
		background: 'linear-gradient(125deg, #FE6B8B 30%, #FF8E53 90%)'
	},
	avatar: {
		gridArea: '1 / 1 / 2 / 2',
		justifySelf: 'center',
		alignSelf: 'center',
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main	
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
		margin: theme.spacing(3, 0, 2),
	},
	box: {
		gridArea: '2 / 1 / 3 / 2',
		justifySelf: 'center',
		alignSelf: 'center',
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		boxShadow: '0 4px 8px 0 rgba(255, 105, 135, .7)',
		color: 'white',
		width: '250px',
		height: '250px'
	},
	canvas: {
		justifySelf: 'center',
		alignSelf: 'center',
		gridArea: '3 / 1 / 4 / 2',
		boxShadow: '0 4px 8px 0 rgba(255, 105, 135, .7)'
	},
	message: {
		justifySelf: 'center',
		alignSelf: 'center',
		gridArea: '1 / 2 / 2 / 3',
	},
	text: {
		fontColor: 'white',
		borderColor: '#fff',
		borderRadius: '100px'
	}
}));

export default useStyles;