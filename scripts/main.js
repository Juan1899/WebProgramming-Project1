const gallery = document.querySelector('.carrousel');
let galleryIndex = 0;
let imgs = [
    './img/Section4/Haven.png',
    './img/Section4/Ascent.png',
    './img/Section4/JettConceptArt.png'
]

function galleryHandle(){
    gallery.setAttribute('src', imgs[galleryIndex]);
    if(galleryIndex<imgs.length-1){
        galleryIndex++;
    }else{
        galleryIndex=0;
    }
}

setInterval(galleryHandle,2000);
//