const cartContainer = document.querySelector('.container');

function renderProducts(list) {
  cartContainer.innerHTML = '';

  list.forEach(function (elem) {
    const newProduct = document.createElement('section');
    newProduct.classList.add('card');

    const url = `product.html?${elem.id}-${elem.title}`;

    newProduct.innerHTML = `
    
        <h2><a href="${url}">${elem.title}</a></h2>
        <img src="" alt="" />
        <div>
          <img src="./img/Icons/${elem.edition}.png" alt="" />
          <p>${elem.edition}</p>
        </div>
        <div>
          <img src="./img/Icons/vp.png" alt="" />
          <p><strong>${elem.price}</strong></p>
        </div>
        <p class="card__button">Agregar al carrito</p>
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
                alert('¡Este producto ya se encuentra en tu carrito!');
              } else {
                usersRef.doc(user.uid).collection('cart').doc(elem.id)
                  .set(elem)
                  .then(function () {
                    //Alert para cuando se agrega un nuevo producto al carrito.  
                    console.log('¡Producto agregado a tu carrito!');
                  });
              }

            });

        } else {
          // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
          alert("Debes iniciar sesion");
        }
      });

    });

    cartContainer.appendChild(newProduct);
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
        console.log(`${doc.id} => ${doc.data()}`);
      });
      renderProducts(objects);
    });
}

// render inicial con todos los productos
getProducts();

//filtros

const filters = document.querySelector('.filters').querySelector('form');

console.log(filters);

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