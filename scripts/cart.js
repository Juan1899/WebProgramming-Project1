const cartContainer = document.querySelector('.container');

// Renderiza la card del producto seleccionado al carrito.    
function renderCart(list) {
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
          <p class="card__button">Eliminar del carrito</p>
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

    //Permite borrar elementos del carrito. 
    const deleteBtn = newProduct.querySelector('.card__button');
    deleteBtn.addEventListener('click', function () {

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
          usersRef.doc(user.uid).collection('cart').doc(elem.id)
            .delete() // pide todos los documentos de la colección
            .then((snapshot) => {
              const p = document.querySelector('#modal-removed-content').querySelector('p');
                    p.innerText = `Se ha eliminado ${elem.title} de tu carrito.`;
                    MicroModal.show('modal-removed');
              //Recarga la página para actualizar el precio. 
              getCart();
            });

        } else {
          // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
          alert("debes iniciar sesion");
        }
      });

    });

    //Añade el producto. 
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

const count = document.querySelector('.cart__count');
const price = document.querySelector('.cart__price');

let total = 0;

function getCart() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada

      usersRef.doc(user.uid).collection('cart')
        .get()
        .then((querySnapshot) => {
          const objects = [];
          //Impide que se sigan sumando los precios cuando se quitan productos del carrito. 
          total = 0; 
          querySnapshot.forEach((doc) => {
            const obj = doc.data();
            obj.id = doc.id;
            //Suma de los precios de los productos. Hay que parsear a int porque firebase almacena 
            //el campo de número del formulario como un string. 
            total += parseInt(obj.price);
            objects.push(obj);
            console.log(`${doc.id} => ${doc.data()}`);
          });

          //Si hay un solo producto, lo escribe en singular. Si hay varios, en plural. 
          if (objects.length === 1) {
            count.innerText = `${objects.length} Artículo`;
          } else {
            count.innerText = `${objects.length} Artículos`;
          }

          //Visualizar el precio total de los productos. 
          price.innerText = `Precio total: ${total}`;

          renderCart(objects);
        });

    }
  });
}

// render inicial con la cart
getCart();