function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}
function saveBase64AsFile(base64, filename) {
	var link = document.createElement("a"); 
	link.setAttribute("href", base64);
	link.setAttribute("download", filename );
	link.click();
}
function storeImagelocal  {
// Get a reference to the image element
var elephant = document.getElementById("elephant");

// Take action when the image has loaded
elephant.addEventListener("load", function () {
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = elephant.width;
    imgCanvas.height = elephant.height;

    // Draw image into canvas element
    imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);

    // Get canvas contents as a data URL
    var imgAsDataURL = imgCanvas.toDataURL("image/png");

    // Save image into localStorage
    try {
        localStorage.setItem("elephant", imgAsDataURL);
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
}