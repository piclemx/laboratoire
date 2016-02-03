$(document).ready(function () {
    var calculator = new Calculator();

    $(".num-button").click(function () {
        var value = $(this).text();

        calculator.value(value);

        var display = $("#display");
        display.val(display.val() + value);
    });



    $(".function-button.add").click(function () {
        calculator.add(0);
        $("#display").val("");
    });

    $(".equals-button").click(function () {
        $("#display").val(calculator.equals());
    });

    $(".clear-button").click(function () {
        calculator.clear();
        $("#display").val();
    });
});
