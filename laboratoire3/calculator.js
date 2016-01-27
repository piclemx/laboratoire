var calculator = function() {
    this.result = null;
    this.memory = null;

    this.add = function(number) {
        this.result += number;
        return this;
    };

    this.subtract = function(number) {
        this.result -= number;
        return this;
    };

    this.multiple = function(number) {
        this.result *= number;
        return this;
    };

    this.divide = function(number) {
        this.result /= number;
        return this;
    };

    this.sin = function(number) {
        this.result = Math.sin(number);
        return this;
    };

    this.cos = function(number) {
        this.result = Math.cos(number);
        return this;
    };

    this.tan = function(number) {
        this.result = Math.tan(number);
        return this;
    };

    this.fact = function(number) {
        this.result = factorize(number);
        return this;
    };

    this.memoryStore = function() {
        this.memory = this.result;
        return this;
    };

    this.memoryRecall = function() {
        this.result = this.memory;
        return this;
    };

    this.memoryClear = function() {
        this.memory = null;
        return this;
    };

    function factorize(number) {
        if (number == 0) return 1;
        else return number * factorize(number - 1);
    }
};