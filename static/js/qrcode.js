function start_scanner(cameraId) {

// Create instance of the object. The only argument is the "id" of HTML element created above.
const html5QrCode = new Html5Qrcode("qr-reader");

html5QrCode.start(
  cameraId,     // retreived in the previous step.
  {
    fps: 10,    // sets the framerate to 10 frame per second
    qrbox: 250  // sets only 250 X 250 region of viewfinder to
                // scannable, rest shaded.
  },
  qrCodeMessage => {
    // do something when code is read. For example:
    console.log(`QR Code detected: ${qrCodeMessage}`);

    // Redirect to pay
    window.location.href = "/pay"; 
  },
  errorMessage => {
    // parse error, ideally ignore it. For example:
    //console.log(`QR Code no longer in front of camera.`);
  })
.catch(err => {
  // Start failed, handle it. For example,
  console.log(`Unable to start scanning, error: ${err}`);
});
}


// This method will trigger user permissions
Html5Qrcode.getCameras().then(devices => {
  /**
   * devices would be an array of objects of type:
   * { id: "id", label: "label" }
   */
  if (devices && devices.length) {
    var cameraId = devices[devices.length-1].id;
    console.log(" .. use this to start scanning.");
    start_scanner(cameraId);
  }
}).catch(err => {
  // handle err
});