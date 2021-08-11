Moralis.initialize('yBGQoNrkmYp88DOu3afA9N28hngkPpYjfeqv9sZL');
Moralis.serverURL = 'https://qbgrfr4bspbb.moralisweb3.com:2053/server';

user = Moralis.User.current();
if(user){
    $(".login_button").remove();
    $(".header").append(`<div class="logout_button">Sign out from MetaMask</div>`);
}

async function login() {
    
    if (!user) {
        user = await Moralis.Web3.authenticate();
        console.log("logged in as: ", user);
        $( ".login_button" ).remove();
        $( ".header" ).append(`<div class="logout_button">Sign out from MetaMask</div>`);

    } else {
        console.log("already logged in user: ", user);
    }

}

async function logout() {
    await Moralis.User.logOut();
    user = Moralis.User.current();
    $(".logout_button").remove();
    $(".header").append(`<div class="login_button">Sign in with MetaMask</div>`);
}

$('body').on('click', '.login_button', function() {
    login();
});


$('body').on('click', '.logout_button', function() {
    logout();
});