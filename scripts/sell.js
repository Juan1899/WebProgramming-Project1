const product = document.querySelector('.sell');

console.log(product);

var imagePaths;

product.addEventListener('submit', function(event){
    event.preventDefault();

    const title = product.title.value;
    const price = product.price.value;
    const edition = product.edition.value;
    const description = product.description.value;

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
        product.image.value = '';
        product.description.value = '';

        imagePaths = ""; 
    }
    
    function handleCatch (error) {
        console.error("Error adding document: ", error);
    }

    productsRef
    .add(newProduct)
    .then(handleThen)
    .catch(handleCatch);
    
});

const image = product.image;

console.log(image);

image.addEventListener('change', function () {
  
    // Create a reference to 'mountains.jpg'
    var newImageRef = storageRef.child(`products/${Math.floor(Math.random()*999999999)}.jpg`);

    var file = image.files[0];

    newImageRef.put(file).then(function(snapshot) {
      console.log(snapshot)
      console.log('Uploaded a blob or file!');
      imagePaths = snapshot.metadata.fullPath;
      console.log(imagePaths);
    });

    
});



