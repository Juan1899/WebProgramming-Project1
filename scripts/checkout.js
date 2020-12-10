let skins = [];

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        // Guarda los objetos del carrito en un arreglo.
        usersRef.doc(user.uid).collection('cart')
            .get()
            .then((querySnapshot) => {
                skins = [];
                querySnapshot.forEach((doc) => {
                    const obj = doc.data();
                    obj.id = doc.id;
                    skins.push(obj);
                });
            });
    }
});

const form = document.querySelector('.checkout');
const button =document.querySelector('.button--form');
console.log(button);

form.addEventListener('submit', (event) => {

    event.preventDefault();

    const name = form.name.value;
    const id = form.id.value;
    const riotID = form.riotID.value;
    const cardNumber = form.cardNumber.value;
    const expireMonth = form.expireMonth.value;
    const expireYear = form.expireYear.value;
    const code = form.code.value;
   

    const order = {

        name: name,
        id: id,
        riotID: riotID,
        cardNumber: cardNumber,
        expireMonth: expireMonth,
        expireYear: expireYear,
        code: code,
        skins: skins

    }
    console.log(order);

    function addToUser(order) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // Guarda los objetos del carrito en un arreglo.
                usersRef.doc(user.uid).collection('orders')
                    .add(order)
                    .then(() => {
                    });
            }
        });
    }

    ordersRef
        .add(order)
        .then(() => {

            addToUser(order);
            form.name.value = '';
            form.id.value = '';
            form.name.value = '';
            form.riotID.value = '';
            form.cardNumber.value = '';
            form.expireMonth.value = '';
            form.expireYear.value = '';
            form.code.value = '';

        
                    MicroModal.show('modal-checkout');
        })

        
})