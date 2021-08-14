Moralis.initialize('yBGQoNrkmYp88DOu3afA9N28hngkPpYjfeqv9sZL');
Moralis.serverURL = 'https://qbgrfr4bspbb.moralisweb3.com:2053/server';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
user = Moralis.User.current();
if (user) {
    $(".login_button").remove();
    $(".header").append(`<div class="logout_button">Sign out from MetaMask</div>`);
}


async function login() {

    if (!user) {
        user = await Moralis.Web3.authenticate();
        console.log("logged in as: ", user);
        $(".login_button").remove();
        $(".header").append(`<div class="logout_button">Sign out from MetaMask</div>`);


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

$('body').on('click', '.login_button', function () {
    login();
});


$('body').on('click', '.logout_button', function () {
    logout();
});


async function getBalance(useracc) {
    let bala;
    await web3.eth.getBalance(useracc, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            let abc = web3.utils.fromWei(result, "ether") + " ETH"
            // console.log(abc);
            bala = abc
        }
    });
    // console.log(bala)
    return bala
}

async function getUserAddr() {
    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    });
    const account = accounts[0];
    return account;
}

function changeBalance() {
    user_acc = getUserAddr()
    user_acc.then(function (result) {
        let bal = getBalance(result)
        bal.then(function (result) {
            $(".balance").text(`Balance:  ${result}`);
        })
    })

}

changeBalance();
setInterval( changeBalance, 1000);