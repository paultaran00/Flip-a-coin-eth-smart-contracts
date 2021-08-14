$(document).ready(function () {
    $(function () {
        $('.input-number-decrement').on('mousedown', function () {
            var $buttonDecimal = $('.input-number');
            var oldValue = $buttonDecimal.val().replace(/[^0-9\.]/g, '');
            if (oldValue >= 0.01) {
                var newVal = parseFloat(oldValue) - 0.1;
            } else {
                var newVal = 0;
            }
            $buttonDecimal.val(Math.round((newVal * 100)) / 100 + " ETH");
        });
    });

    $(function () {
        $('.input-number-increment').on('mousedown', function () {
            var $buttonDecimal = $('.input-number');
            var oldValue = $buttonDecimal.val().replace(/[^0-9\.]/g, '');

            var newVal = parseFloat(oldValue) + 0.1;

            $buttonDecimal.val(Math.round((newVal * 100)) / 100 + " ETH");
        });

    });

    timeOut = 0;

    $('.input-number-increment').on('mousedown touchstart', function (e) {
        $(this).addClass('active');
        timeOut = setInterval(function () {
            var $buttonDecimal = $('.input-number');
            var oldValue = $buttonDecimal.val().replace(/[^0-9\.]/g, '');

            var newVal = parseFloat(oldValue) + 0.1;

            $buttonDecimal.val(Math.round((newVal * 100)) / 100 + " ETH");
        }, 100);
    }).bind('mouseup mouseleave touchend', function () {
        $(this).removeClass('active');
        clearInterval(timeOut);
    });


    $('.input-number-decrement').on('mousedown touchstart', function (e) {
        $(this).addClass('active');
        timeOut = setInterval(function () {
            var $buttonDecimal = $('.input-number');
            var oldValue = $buttonDecimal.val().replace(/[^0-9\.]/g, '');
            if (oldValue >= 0.01) {
                var newVal = parseFloat(oldValue) - 0.1;
            } else {
                var newVal = 0;
            }
            $buttonDecimal.val(Math.round((newVal * 100)) / 100 + " ETH");
        }, 100);
    }).bind('mouseup mouseleave touchend', function () {
        $(this).removeClass('active');
        clearInterval(timeOut);
    });

});






var switchButton = document.querySelector('.switch-button');
var switchBtnRight = document.querySelector('.switch-button-case.right');
var switchBtnLeft = document.querySelector('.switch-button-case.left');
var activeSwitch = document.querySelector('.active');

function switchLeft() {
    switchBtnRight.classList.remove('active-case');
    switchBtnLeft.classList.add('active-case');
    activeSwitch.style.left = '0%';
}

function switchRight() {
    switchBtnRight.classList.add('active-case');
    switchBtnLeft.classList.remove('active-case');
    activeSwitch.style.left = '50%';
}

switchBtnLeft.addEventListener('click', function () {
    switchLeft();
}, false);

switchBtnRight.addEventListener('click', function () {
    switchRight();
}, false);

async function flipcoin() {
    let bet_side;
    if ($(".active-case").text() == "Head") {
        bet_side = 0
    } else {
        bet_side = 1
    }
    const web3 = await Moralis.Web3.enable()
    let amount = $(".input-number").val().replace(/[^0-9\.]/g, '');


    
    
    let contractInstance = new web3.eth.Contract(window.abi, "0xd64553aCE4278cB257Fc284c3e2E5350e87eC25e");     // need contract address after deploying
    console.log(amount)
    contractInstance.methods.flip(bet_side).send({
        value: amount,
        from: ethereum.selectedAddress
    }).on('receipt', function (receipt) {
        if(receipt.events.bet.returnValues.win){
            console.log("you won")
        }
        else{
            console.log("you lost")
        }
    })
}

$('body').on('click', '.flip', async function () {
    user = Moralis.User.current();
    if (!user) {
        alert("You need to sign in")
    } else {
        await flipcoin();
    }
    
});


async function showBiggestwinners(){
    let biggestwinners = await Moralis.Cloud.run("biggestwinners", {});
    $(".top_winners").remove();
    let table = `<table class="top_winners"><thead><tr><th scope="col">Address</th><th scope="col">Total eth won</th></tr></thead><tbody></tbody></table>`;
    $(".statistics").append(table);
    biggestwinners.forEach( row =>{
        var t = $(`<tr><td>${row.objectId}</td><td>${row.total_sum}</td></tr>`);
        $(".top_winners tbody").append(t);
    });
    
}
showBiggestwinners();
setInterval( showBiggestwinners, 1000);
