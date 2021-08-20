import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({
	icon: {
		fontSize: '300px',
	},
}));

const Webcam = ({ webcam, setWebcam, setSignInMessage, setSignUpMessage, context, setContext }) => {
	const classes = useStyles();
	async function startVideo() {
		let stream = null;
		try {
			stream = await navigator.mediaDevices.getUserMedia({ video: true });
			let video = document.querySelector('.video_container');
			video.srcObject = stream;
			setTimeout(() => {
				// let imageCapture = new ImageCapture(video.srcObject.getVideoTracks()[0]);
				// let frame = imageCapture.grabFrame();
				// console.log(frame);
				captureFrame();
				stopVideo();
				if (context === 'SignIn') {
					setSignInMessage('Attempting to login...');
				} else if (context === 'SignUp') {
					setSignUpMessage('Creating the account...');
				}
			}, 3000);
		} catch (err) {
			console.log(err);
		}
	}
	const stopVideo = () => {
		if (webcam) {
			let video = document.querySelector('.video_container');
			let stream = video.srcObject.getVideoTracks()[0];
			stream.stop();
			video.srcObject = null;
			setWebcam(false);
		}
	};

	function captureFrame() {
		var imageCapture;
		const video = document.querySelector('.video_container');
		const track = video.srcObject.getVideoTracks()[0];
		imageCapture = new ImageCapture(track);
		imageCapture
			.takePhoto()
			.then((imageBitMap) => {
				console.log(imageBitMap);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		if (webcam) {
			startVideo();
		}
	});

	return (
		<Box className='webcamBox'>
			{!webcam && <PersonIcon className={classes.icon} />}
			{webcam && <video className='video_container' width='300px' height='300px' muted autoPlay></video>}
		</Box>
	);
};

export default Webcam;
