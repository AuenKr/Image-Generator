let count = 5;

const acessKeys = [`Me2HeskTDeXxLnNRTg3jRFfHT7p9dYxm0CE5j6Bik_4`, `2jVS7T2AQHvoUSmqnRrMcd-5pRxQmwQyAb5WVNhe1Sc`, `891bb11653baa0ee566d6721f4113e4c91d4d93efccf84ca3ee292c47a9f2625`, `r1zplx0mNKePUYxLjxnv7LYsEmy_D9GIJ0vsN2qilI8`, `190dadb72657f630596b3b6daea32055c05c3326948586d20bb2a9654ece5d36`];

let keyno = 1;
let acesskey = acessKeys[keyno -1];

const loader_text = document.getElementById('loader_component_text');
const loader_img = document.getElementById('loader_component_img');
const header = document.getElementById('header')
const Image_Container = document.getElementById('content');

let photoArray = [];

let imageloaded = 0;
let totalimages = count;
let newload = false;

// Api Request
async function GetPhotes() {
    try {
        let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${acesskey}&count=${count}`;
        imageloaded = 0;
        count = 15;

        let response = await fetch(apiUrl);
        photoArray = await response.json();
        DisplayPhotoes();
        
    } catch (error) {
        // enter error message
        console.log(photoArray)
        if (photoArray.length == 0) {
            keyno++;
            acesskey = acessKeys[keyno-1]
            if (keyno == 4){
                console.log("rate limit exceed");
            }
            GetPhotes()
        }
    }
}

// Displaying photoes
function DisplayPhotoes() {
    photoArray.forEach(photo => {
        //      Check Image Loaded 
        const item = document.createElement('a')
        item.setAttribute('href', photo.urls.regular)
        item.setAttribute('target', '_blank')

        // Creating <img> element
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.description);
        img.setAttribute('title', photo.description);
        
        img.addEventListener('load', () => {
            imageloaded++;
        })
        // Put in order <a> <img> </a>
        Image_Container.appendChild(item);
        item.appendChild(img);
    });

    loader_img.hidden = true;
    loader_text.hidden = true;
    header.hidden = false;
}

// Adding Scroll feature
function OnScroll() {
    if (imageloaded == totalimages){
        newload = true;
    }
    if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && newload) {
        GetPhotes();
        newload = false;
    }
}

// Adding Event Listners
window.addEventListener('scroll', OnScroll)

// Initialization
GetPhotes();