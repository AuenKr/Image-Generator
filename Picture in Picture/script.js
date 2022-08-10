const videoELement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to vedio element, then play
async function selectMediaStream(){
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoELement.srcObject = mediaStream;
        videoELement.onloadedmetadata = () => {
            videoELement.play();
        }
    } catch (error) {
        // Catch some error
        console.log('Error in selectMediaStream function', error);
    }
};

button.addEventListener('click', async () => {
    // Disable Button
    button.disabled = true;
    // Start Picture in Picture
    await videoELement.requestPictureInPicture();
    // Reset button
    button.disabled =  false;
});

// On start click
selectMediaStream();