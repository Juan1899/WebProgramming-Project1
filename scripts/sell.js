const product = document.querySelector('.sell');

console.log(product);

var imagePaths = [];

product.addEventListener('submit', function(event){
    event.preventDefault();

    //Variables con la información de cada campo del formulario de venta. 
    const title = product.title.value;
    const price = product.price.value;
    const edition = product.edition.value;
    const description = product.description.value;

    // Se crea el objeto a partir de los valores del formulario de venta. 
    const newProduct = {
        title: title,
        price: price,
        edition: edition,
        description: description,

        storageImgs: imagePaths,
    }

    function handleThen (docRef) {
        product.title.value = '';
        product.price.value = '';
        product.edition.value = '';
        product.cardImage.value = '';
        product.productImage.value = '';
        product.description.value = '';

        imagePaths = []; 
    }
    
    function handleCatch (error) {
        console.error("Error adding document: ", error);
    }

    productsRef
    .add(newProduct)
    .then(handleThen)
    .catch(handleCatch);
    
});

const images = product.querySelectorAll('input[type=file]');

images.forEach(element => {
    element.addEventListener('change', function () {
  
        //Subir imágenes y agregar un número identificador a cada una. 
        var newImageRef = storageRef.child(`products/${element.name}${Math.floor(Math.random()*999999999)}.jpg`);
    
        var file = element.files[0];
    
        newImageRef.put(file).then(function(snapshot) {
          console.log(snapshot)
          
          imagePaths.push(snapshot.metadata.fullPath);
          alert('Imagen cargada');
        });
    
        
    });
});




