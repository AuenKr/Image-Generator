let count = 15;
const acessKey = `Me2HeskTDeXxLnNRTg3jRFfHT7p9dYxm0CE5j6Bik_4`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${acessKey}&count=${count}`;

const loader_text = document.getElementById('loader_component_text');
const loader_img = document.getElementById('loader_component_img');
const header = document.getElementById('header')
const Image_Container = document.getElementById('content');

let photoArray = [];

let imageloaded = 0;
let totalimages = count;
let newload = true;

// Api Request
async function GetPhotes(){
    try {
        imageloaded = 0;
        
        let response = await fetch(apiUrl);
        photoArray = await response.json();

        loader_img.hidden = true;
        loader_text.hidden = true;
        header.hidden = false;
        
        DisplayPhotoes();
    } catch (error) {
        // enter error message
        console.log("error")
    }
}

// Displaying photoes
function DisplayPhotoes(){
    photoArray.forEach(photo => {
        const item = document.createElement('a')
        item.setAttribute('href', photo.urls.regular)
        item.setAttribute('target', '_blank')

        // Creating <img> element
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.description);
        img.setAttribute('title', photo.description);
        
        // Put in order <a> <img> </a>
        Image_Container.appendChild(item);
        item.appendChild(img);
    });   
}

// Checking all images loaded??
function load_check(){
    imageloaded++;
    console.log(imageloaded)
    // if (imageloaded == totalimages){
    //     newload = true;
    // }
}

// Adding Scroll feature
function OnScroll() {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && newload) {
        GetPhotes();
    }
}

// Adding Event Listners
document.addEventListener('load', load_check)
window.addEventListener('scroll', OnScroll)

// Initialization
GetPhotes();