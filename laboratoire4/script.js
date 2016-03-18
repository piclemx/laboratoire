$(document).ready(function () {
    var calculator = new Calculator();
    var display = $("#display");

    $(".num-button").click(function () {
        var value = $(this).text();
        calculator.value(value);
        display.val(display.val() + value);
        displayMolten(display);
    });

    $(".clear-button").click(function () {
        calculator.clear();
        display.val("");
        displayMolten(display);
    });

    $(".function-button.add").click(function () {
        calculator.add();
        display.val(calculator.getEquation());
        displayMolten(display);
    });

    $(".function-button.subtract").click(function () {
        calculator.subtract();
        display.val(calculator.getEquation());
        displayMolten(display);
    });

    $(".function-button.multiply").click(function () {
        calculator.multiply();
        display.val(calculator.getEquation());
        displayMolten(display);
    });

    $(".function-button.divide").click(function () {
        calculator.divide();
        display.val(calculator.getEquation());
        displayMolten(display);
    });

    $(".function-button.sin").click(function () {
        calculator.sin();
        display.val(calculator.getEquation());
        displayMolten(display);
    });

    $(".function-button.cos").click(function () {
        calculator.sin();
        display.val(calculator.getEquation());
        displayMolten(display);
    });

    $(".function-button.tan").click(function () {
        calculator.sin();
        display.val(calculator.getEquation());
        displayMolten(display);
    });

    $(".function-button.factorial").click(function () {
        calculator.factorial();
        display.val(calculator.getEquation());
        displayMolten(display);
    });

    $(".memory-button.clear").click(function () {
        calculator.clearMemory();
    });

    $(".memory-button.recall").click(function () {
        var value = calculator.getMemory();
        calculator.value(value);
        display.val(display.val() + value);
        displayMolten(display);
    });

    $(".memory-button.store").click(function () {
        calculator.setMemory();
    });

    $(".equals-button").click(function () {
        var answer = calculator.equals();
        display.val(answer);
        displayMolten(display);
        if ($.isNumeric(answer)) {
            calculator.value(answer);
        }
    });

    if(navigator.geolocation) {
        var params = {
            enableHighAccuracy: false,
            timeout: 10 * 1000 * 1000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(displayPosition,displayError,params);
    }
});

function displayPosition(position) {
    $('#displayLatitude').val(position.coords.latitude);
    $('#displayLongitude').val(position.coords.longitude)
    displayMolten($('#displayLatitude'));
    displayMolten($('#displayLongitude'));
}

function displayError(error) {
    var errors = {
        1: 'Permission refusé',
        2: 'Position indisponible',
        3: 'Request timeout'
    };
    console.log(errors[error.code]);
}

function displayMolten(elem) {
    elem.hide();
    elem.show("slow");
}
