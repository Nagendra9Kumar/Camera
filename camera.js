async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        const cameraSelect = document.getElementById('cameraSelect');
        videoDevices.forEach((device, index) => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Camera ${index + 1}`;
            cameraSelect.appendChild(option);
        });

        cameraSelect.addEventListener('change', () => {
            startCamera(cameraSelect.value);
        });

        if (videoDevices.length > 0) {
            startCamera(videoDevices[0].deviceId);
        }
    } catch (error) {
        console.error('Error accessing cameras:', error);
    }
}

async function startCamera(deviceId) {
    const constraints = {
        video: {
            deviceId: { exact: deviceId }
        }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoPreview = document.getElementById('videoPreview');
        videoPreview.srcObject = stream;
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}

document.addEventListener('DOMContentLoaded', getCameras);
