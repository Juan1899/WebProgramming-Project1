const username = document.querySelectorAll('.username'); 
const login = document.querySelector('.menu__login');
const userinfo = document.querySelector('.userinfo');
const logout = document.querySelector('.logout');
const email = document.querySelector('.email'); 

firebase.auth().onAuthStateChanged(function(user){

    if(user) {

        userinfo.classList.remove('hidden');
        login.classList.add('hidden');

        usersRef.doc(user.uid).get()
        .then(function(doc){
            const data = doc.data(); 
            username.forEach(element => {
                element.innerText = data.name;
            });

            if(email){
                email.innerText = data.email;
            }
            
             
        });
    }else{
        userinfo.classList.add('hidden');
        login.classList.remove('hidden');
    }

});

logout.addEventListener('click', function(){

    firebase.auth().signOut();

});