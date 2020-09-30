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
        banner.style.backgroundImage = "url('./img/Header/HeaderImage1.png')";
        bannerInfo.classList.add('banner__info--hidden');
        bannerIndex =1;
    }else{
        banner.style.backgroundImage = "url('./img/Header/HeaderImage2.png')";
        bannerInfo.classList.remove('banner__info--hidden');
        bannerIndex =0;
    }    
    //console.log(bannerIndex);
}

setInterval(bannerChangeHandle,2000);

const character = document.querySelector('.character');
const characterText = document.querySelector('.character__text');
const characterButtons = document.querySelectorAll('.character__button input');

let characterImgs = [
    "../img/Section2/Phoenix_Full.png",
    "../img/Section2/Jett_Full.png",
    "../img/Section2/Sova_Full.png",
    "../img/Section2/Brimstone_Full.png"
]

let characterTexts = [
    "El poder de las estrellas de Phoenix brilla en su estilo de lucha, encendiendo el campo de batalla con su destello y destello. Ya sea que tenga refuerzos o no, se apresura a luchar en sus propios términos. El ardiente británico puede ejercer el poder de las llamas para remodelar esencialmente el campo de batalla como mejor le parezca. Con bolas de fuego explosivas que dañan a los enemigos y lo curan, un muro de fuego que bloquea la visión y un estallido de fuego cegador, Fénix es excelente para manipular el flujo de la partida. Su habilidad suprema le otorga la capacidad de renacer si es asesinado durante su duración, lo que lo impulsa a realizar movimientos audaces que de otro modo no haría.",
    "De Corea viene Jett, un luchador ágil que prioriza el movimiento por encima de todo. Sus habilidades incluyen una carrera basada en la teletransportación y una corriente ascendente que le permite alcanzar salientes más altos. También tiene la habilidad de una bomba de humo para obstaculizar la línea de visión y una poderosa Filotormenta definitiva que inflige un daño de moderado a fuerte y se mantiene precisa incluso mientras se mueve. Jett es uno de los pocos agentes con habilidad pasiva. Mantener presionada la tecla de salto mientras está en el aire permitirá que Jett ralentice su descenso.El Ultimate de Jett le permite blandir varios cuchillos arrojadizos que causan un daño moderado y matan con disparos a la cabeza. Conseguir una muerte repone tus dagas y puedes elegir lanzarlas una a la vez o lanzar todas las dagas restantes en una ráfaga de corto alcance.",
    "Sova rastrea, encuentra y elimina enemigos con despiadada eficiencia y precisión. Su arco personalizado y sus increíbles habilidades de exploración aseguran que incluso si corres, no podrás esconderte. Un experto en tiro con arco, puede equipar su arco con diferentes pernos que revelan la ubicación del enemigo o impacta a los adversarios cercanos. También puede desplegar un dron de reconocimiento para inspeccionar el campo de batalla, mientras que lo último le permite disparar tres flechas mortales a través de las paredes. Originalmente, se suponía que Sova era una mujer y se suponía que tenía una visera.",
    "El arsenal orbital de Brimstone asegura que su escuadrón siempre tenga la ventaja. Su capacidad para brindar utilidad de manera precisa y segura lo convierte en el comandante inigualable de botas en el suelo. Brimstone es un poderoso comandante que utiliza granadas incendiarias, ataques aéreos de cortina de humo y balizas de estimulación de fuego rápido para dañar a los enemigos y mejorar a los compañeros de equipo. Su impresionante Orbital Strike ultimate invoca un enorme láser que destruye a cualquiera que no se mueva fuera del radio lo suficientemente rápido."
]
console.log(characterButtons);

function characterChangeHandle(event){
    let index = event.target.getAttribute("data-index");
    characterText.innerHTML = characterTexts[index];
    character.setAttribute('src', characterImgs[index]);
    console.log();
}

characterButtons.forEach( function (elem,index) {
    elem.addEventListener('click',characterChangeHandle);
    
});

const footerAbout = document.querySelector('.footer__about');
let screenWidth = document.querySelector('.footer').clientWidth;


function screenChangeHandle() {
    screenWidth = document.querySelector('.footer').clientWidth;
   
    if(screenWidth <= 400){
        console.log(screenWidth);
        footerAbout.classList.add('footer__about--hidden');
    }
}

setInterval(screenChangeHandle,1000);

