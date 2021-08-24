import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({
	icon: {
		fontSize: '300px',
	},
}));

const Webcam = ({ webcam, setWebcam, setLoginFrame, setRegFrame, setSignInMessage, setSignUpMessage, context }) => {
	const classes = useStyles();
	useEffect(() => {
		if (webcam) {
			startVideo();
		}
	});

	const startVideo = () => {
		let imageCapture;
		navigator.mediaDevices
			.getUserMedia({ video: { width: 300, height: 300 } })
			.then((mediaStream) => {
				document.querySelector('.video_container').srcObject = mediaStream;
				const track = mediaStream.getVideoTracks()[0];
				imageCapture = new ImageCapture(track);
				setTimeout(() => {
					imageCapture
						.grabFrame()
						.then((imageBitmap) => {
							createImageBitmap(imageBitmap, { resizeWidth: 128, resizeHeight: 128 })
								.then((resizedImageBitmap) => {
									setWebcam(false);
									// console.log(resizedImageBitmap); //32x32 Image Bitmap
									if (context === 'SignIn') {
										setLoginFrame(resizedImageBitmap);
									} else if (context === 'SignUp') {
										setRegFrame(resizedImageBitmap);
									}
									track.stop();
									track.srcObject = null;
									if (context === 'SignIn') {
										setSignInMessage('Attempting to login...');
									} else if (context === 'SignUp') {
										setSignUpMessage('Creating the account...');
									}
								})
								.catch((err) => console.log(err));
						})
						.catch((error) => console.log(error));
				}, 3000);
			})
			.catch((error) => console.log(error));
	};

	return (
		<Box className='webcamBox'>
			{!webcam && <PersonIcon className={classes.icon} />}
			{webcam && <video className='video_container' width='300px' height='300px' muted autoPlay></video>}
		</Box>
	);
};

export default Webcam;
