const register = document.querySelector('.register'); 

register.addEventListener('submit',function(event){

    event.preventDefault(); 
    const name = register.name.value;
    const email = register.email.value;
    const password = register.password.value;

    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(function(credentials) {

        const uid = credentials.user.uid;
        usersRef.doc(uid).set({

            name: name,
            email: email
        })
        .then(function() {

            window.location.href='store.html'

        });
        

    }) 
    .catch(function(error){

        console.log(error.message);

    }); 
    
}); 