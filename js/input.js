// $('body').on('click', '.input-number-decrement', function() {
//     var $buttonDecimal = $('.input-number');
//     var oldValue = $buttonDecimal.val();
//     if (oldValue >= 0.01) {
//         var newVal = parseFloat(oldValue) - 0.1; 
//     }
//     else {
//         var newVal = 0;
//     }
//     $buttonDecimal.val(Math.round((newVal * 100)) / 100);
// });

// $('body').on('click', '.input-number-increment', function() {
//     var $buttonDecimal = $('.input-number');
//     var oldValue = $buttonDecimal.val();

//     var newVal = parseFloat(oldValue) + 0.1;

//     $buttonDecimal.val(Math.round((newVal * 100)) / 100);

// });


$(function () {
    $('.input-number-decrement').on('mousedown', function () {
        var $buttonDecimal = $('.input-number');
        var oldValue = $buttonDecimal.val().replace(/[^0-9\.]/g,'');
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
        var oldValue = $buttonDecimal.val().replace(/[^0-9\.]/g,'');

        var newVal = parseFloat(oldValue) + 0.1;

        $buttonDecimal.val(Math.round((newVal * 100)) / 100 + " ETH");
    });

});


$(document).ready(function () {

    timeOut = 0;

    $('.input-number-increment').on('mousedown touchstart', function (e) {
        $(this).addClass('active');
        timeOut = setInterval(function () {
            var $buttonDecimal = $('.input-number');
            var oldValue = $buttonDecimal.val().replace(/[^0-9\.]/g,'');

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
            var oldValue = $buttonDecimal.val().replace(/[^0-9\.]/g,'');
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



$('body').on('click', '.flip', function () {
    user = Moralis.User.current();
    if (!user) {
        alert("You neet to sign in")
    } else {
        console.log($(".active-case").text())
        console.log($(".input-number").val().replace(/[^0-9\.]/g,''))
    }

});