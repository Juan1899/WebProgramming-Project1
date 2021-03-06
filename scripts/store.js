const cartContainer = document.querySelector('.container');


//const cart

function renderProducts(list) {
  cartContainer.innerHTML = '';

  list.forEach(function (elem) {
    const newProduct = document.createElement('section');
    newProduct.classList.add('card');

    const url = `product.html?${elem.id}-${elem.title}`;

    newProduct.innerHTML = `
    
        <h2><a href="${url}">${elem.title}</a></h2>
        <img src="" alt="" />
        <section class="card__cont">
        <div>
          <img src="./img/Icons/${elem.edition}.png" alt="" />
          <p>${elem.edition}</p>
        </div>
        <div>
          <img src="./img/Icons/vp.png" alt="" />
          <p><strong>${elem.price}</strong></p>
        </div>
        <p class="card__button">Agregar al carrito</p>

        </section>
        
        `;


    if (elem.storageImgs) {

      elem.storageImgs.forEach(function (imageRef) {
        storageRef.child(imageRef).getDownloadURL().then(function (url) {

          var img = newProduct.querySelector('img');
          if (url.includes('cardImage')) {

            img.src = url;
          }

        }).catch(function (error) {

        });
      });

    }

    const addBtn = newProduct.querySelector('.card__button');
    addBtn.addEventListener('click', function () {

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
          usersRef.doc(user.uid).collection('cart').doc(elem.id)
            .get() // pide todos los documentos de la colección
            .then((snapshot) => {
              const object = snapshot.data();
              if (object) {
                //Si el producto ya existe dentro del carrito, se le informará al usuario. 
                const p = document.querySelector('#modal-repeat-content').querySelector('p');
                p.innerText = `El producto ${elem.title} ya se encuentra en tu carrito.`;
                MicroModal.show('modal-repeat');
              } else {
                usersRef.doc(user.uid).collection('cart').doc(elem.id)
                  .set(elem)
                  .then(function () {
                    //Alert para notificar al usuario cuando se agrega un nuevo producto al carrito.  
                    //alert('¡Producto agregado a tu carrito!');
                    const p = document.querySelector('#modal-add-content').querySelector('p');
                    p.innerText = `Agregaste ${elem.title} a tu carrito.`;
                    MicroModal.show('modal-add');
                  });
              }

            });

        } else {
          // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
          MicroModal.show('modal-login');
        }
      });

    });

    cartContainer.appendChild(newProduct);
    TweenMax.set(newProduct,{height: 0});

    var tl = new TimelineLite();

    tl = new TimelineLite();
    tl.to(newProduct, 1, {
      height: "402px",
      ease: Expo.easeInOut
    });
  });
}

const objects = [];

function getProducts() {
  productsRef  // referencia de la colección
    .get() // pide todos los documentos de la colección
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        objects.push(obj);
      });
      renderProducts(objects);
    });
}

// render inicial con todos los productos
getProducts();

//filtros

const filters = document.querySelector('.filters').querySelector('form');

filters.addEventListener('input', function () {

  //Variable para copiar la información de los productos y usar la información copiada
  // para aplicar los filtros. 
  let copy = objects.slice();

  // Filtro por colección del arma. 
  const collection = filters.collection.value;

  if (collection != '') {
    copy = copy.filter(function (elem) {
      if (elem.title.toLowerCase().includes(collection)) {
        return true;
      } else {
        return false;
      }
    });
  }

  // Filtro por tipo de arma. 
  const gun = filters.gun.value;

  if (gun != '') {
    console.log(gun);
    switch (parseInt(gun)) {
      case 1:
        copy = copy.filter(function (elem) {
          if (elem.title.toLowerCase().includes('daga') ||
            elem.title.toLowerCase().includes('hacha') ||
            elem.title.toLowerCase().includes('garra') ||
            elem.title.toLowerCase().includes('bastón')) {
            return true;
          } else {
            return false;
          }
        });
        break;

      case 2:
        copy = copy.filter(function (elem) {
          if (elem.title.toLowerCase().includes('classic') ||
            elem.title.toLowerCase().includes('shorty') ||
            elem.title.toLowerCase().includes('sheriff')) {
            return true;
          } else {
            return false;
          }
        });
        break;

      case 3:
        copy = copy.filter(function (elem) {
          if (elem.title.toLowerCase().includes('spectre')) {
            return true;
          } else {
            return false;
          }
        });
        break;

      case 4:
        copy = copy.filter(function (elem) {
          if (elem.title.toLowerCase().includes('judge')) {
            return true;
          } else {
            return false;
          }
        });
        break;

      case 5:
        copy = copy.filter(function (elem) {
          if (elem.title.toLowerCase().includes('vandal') ||
            elem.title.toLowerCase().includes('phantom') ||
            elem.title.toLowerCase().includes('guardian')) {
            return true;
          } else {
            return false;
          }
        });
        break;

      case 6:
        copy = copy.filter(function (elem) {
          if (elem.title.toLowerCase().includes('operator')) {
            return true;
          } else {
            return false;
          }
        });
        break;

      case 7:
        copy = copy.filter(function (elem) {
          if (elem.title.toLowerCase().includes('ares')) {
            return true;
          } else {
            return false;
          }
        });
        break;

      default:
        break;
    }

  }

  // Filtro por edición del arma. 
  const edition = filters.edition.value;

  if (edition != '') {
    copy = copy.filter(function (elem) {
      if (elem.edition.toLowerCase().includes(edition)) {
        return true;
      } else {
        return false;
      }
    });
  }


  renderProducts(copy);

});