const username = document.querySelector('.username'); 
const login = document.querySelector('.menu__login');
const userinfo = document.querySelector('.userinfo');
const logout = document.querySelector('.logout');

firebase.auth().onAuthStateChanged(function(user){

    if(user) {

        userinfo.classList.remove('hidden');
        login.classList.add('hidden');

        usersRef.doc(user.uid).get()
        .then(function(doc){
            const data = doc.data(); 
            username.innerText = data.name; 
        });
    }else{
        userinfo.classList.add('hidden');
        login.classList.remove('hidden');
    }

});

logout.addEventListener('click', function(){

    firebase.auth().signOut();

});