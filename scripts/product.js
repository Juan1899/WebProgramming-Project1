window.addEventListener('load', function () {

    const parts = location.search.split('-');
    const uid = parts[0].replace('?', '');

    productsRef.doc(uid)
        .get()
        .then(function (snapshot) {
            const product = snapshot.data();
            const article = document.querySelector('.product');
            const info = article.querySelector('.product__info');

            if (product.storageImgs) {

                product.storageImgs.forEach(function (imageRef) {
                    storageRef.child(imageRef).getDownloadURL().then(function (url) {

                        var carrousel = article.querySelector('.product__carrousel');
                        var img = document.createElement('img');
                        if (url.includes('productImage')) {

                            img.src = url;
                            carrousel.appendChild(img);

                        }


                    }).catch(function (error) {

                    });
                });

            }

            function addProduct() {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada

                        usersRef.doc(user.uid).collection('cart').doc(uid)
                            .get() // pide todos los documentos de la colección
                            .then((snapshot) => {
                                const object = snapshot.data();
                                if (object) {
                                    alert('el producto ya fue agregado al carrito');
                                } else {
                                    usersRef.doc(user.uid).collection('cart').doc(uid)
                                        .set(product)
                                        .then(function () {
                                            console.log('se agrego');
                                        });
                                }

                            });

                    } else {
                        // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
                        alert("Por favor inicia sesión");
                    }
                });
            }

            const btnAddCart = document.querySelector('.button--cart');

            btnAddCart.addEventListener('click', function () {
                addProduct();
            });


            info.querySelector('h2').innerText = product.title;
            info.querySelector('.product__price').querySelector('p').innerText = product.price;
            info.querySelector('.product__edition').querySelector('p').innerText = product.edition;
            
            //Dependiendo del producto, cambia la imagen de la edición. 
            info.querySelector('.product__edition').querySelector('img').src = `./img/Icons/${product.edition}.png`

            //Descripción del producto.. 
            article.querySelector('.product__description').innerText = product.description;

            // sound pts code
            
            (function () {

                Pts.quickStart("#pt", "#101823");
            
                // Note: use Sound.loadAsBuffer instead if you need support for Safari/iOS browser. (as of Apr 2019)
                // See this example: http://ptsjs.org/demo/edit/?name=sound.analyze
            
                var sound;
                var bins = 256;
            
            
                // Load sound
                Sound.load(`./sound/${product.soundPath}`).then(s => {
                    sound = s.analyze(bins);
                }).catch(e => console.error(e));
            
            
                // Draw play button
                function playButton() {
                    if (!sound || !sound.playing) {
                        form.fillOnly("#ff4654").rect([[0, 0], [50, 50]]);
                        form.fillOnly('#fff').polygon(Triangle.fromCenter([25, 25], 10).rotate2D(Const.half_pi, [25, 25]));
                    } else {
                        form.fillOnly("rgba(0,0,0,.2)").rect([[0, 0], [50, 50]]);
                        form.fillOnly("#fff").rect([[18, 18], [32, 32]]);
                    }
                }
            
            
                // animation
                space.add({
                    animate: (time, ftime) => {
            
                        if (sound && sound.playable) {
                            sound.freqDomainTo(space.size).forEach((t, i) => {
                                form.fillOnly("#ff4654").point(t, 2, 'circle');
                            });
                        }
                        //form.line(td);
                        playButton();
                    },
            
                    action: (type, x, y) => {
                        if (type === "up") { // clicked button
                            sound.toggle();
                        }
                    }
                });
            
                //// ----
            
                space.bindMouse().bindTouch().play();
            
            })();


        });
});