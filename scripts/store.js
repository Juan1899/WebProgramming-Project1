const container = document.querySelector('.container');

function renderProducts(list) {
  container.innerHTML = '';

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
        <p>Agregar al carrito</p>
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

    container.appendChild(newProduct);
  });
}

function getProducts() {
  productsRef  // referencia de la colección
    .get() // pide todos los documentos de la colección
    .then((querySnapshot) => {
      const objects = [];
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