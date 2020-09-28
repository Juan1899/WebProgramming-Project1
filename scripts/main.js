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

const banner = document.querySelector('.banner');
const bannerInfo = document.querySelector('.banner__info');
let bannerIndex = 1;

function bannerChangeHandle(){
    if(bannerIndex == 0){
        banner.style.backgroundImage = "url('../img/Header/HeaderImage1.png')";
        bannerInfo.classList.add('banner__info--hidden');
        bannerIndex =1;
    }else{
        banner.style.backgroundImage = "url('../img/Header/HeaderImage2.png')";
        bannerInfo.classList.remove('banner__info--hidden');
        bannerIndex =0;
    }    
    console.log(bannerIndex);
}

setInterval(bannerChangeHandle,2000);

