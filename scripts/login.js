const register = document.querySelector('.login');

register.addEventListener('submit',function(event){

    event.preventDefault(); 
    
    const email = register.email.value;
    const password = register.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {

        window.location.href='store.html'

    })
    .catch(function(error){

        console.log(error.message);

    });

}); 

