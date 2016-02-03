$(document).ready(function () {
    var calculator = new Calculator();
    var display = $("#display");

    $(".num-button").click(function () {
        var value = $(this).text();
        calculator.value(value);
        display.val(display.val() + value);
    });

    $(".clear-button").click(function () {
        calculator.clear();
        display.val("");
    });

    $(".function-button.add").click(function () {
        calculator.add();
        display.val(calculator.getEquation());
    });

    $(".function-button.subtract").click(function () {
        calculator.subtract();
        display.val(calculator.getEquation());
    });

    $(".function-button.multiply").click(function () {
        calculator.multiply();
        display.val(calculator.getEquation());
    });

    $(".function-button.divide").click(function () {
        calculator.divide();
        display.val(calculator.getEquation());
    });

    $(".function-button.sin").click(function () {
        calculator.sin();
        display.val(calculator.getEquation());
    });

    $(".function-button.cos").click(function () {
        calculator.sin();
        display.val(calculator.getEquation());
    });

    $(".function-button.tan").click(function () {
        calculator.sin();
        display.val(calculator.getEquation());
    });

    $(".memory-button.clear").click(function () {
        calculator.clearMemory();
    });

    $(".memory-button.recall").click(function () {
        var value = calculator.getMemory();
        calculator.value(value);
        display.val(display.val() + value);
    });

    $(".memory-button.store").click(function () {
        calculator.setMemory();
    });

    $(".equals-button").click(function () {
        var answer = calculator.equals();
        display.val(answer);
        if ($.isNumeric(answer)) {
            calculator.value(answer);
        }
    });
});
