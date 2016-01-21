// @Review tout ce qui a dans le onload mettre dans un <script> avant </body>
window.onload = function () {
    var mySlider = new awesomeSlider('slider');
    var next = document.getElementById('next');
    var prev = document.getElementById('prev');

    // @Review Mauvaise gestions des bullets, ce doit être généré par le javascript et non mis manuellement
    var firstBullet = document.getElementById('bullets-1');
    var secondBullet = document.getElementById('bullets-2');
    var thirdBullet = document.getElementById('bullets-3');

    next.addEventListener('click', function() {
        mySlider.showNextItem();
    });
    prev.addEventListener('click', function() {
        mySlider.showPrevItem();
    });

    setInterval(function() {
        mySlider.showNextItem();
    }, 2000);

    // @Review Mauvaise gestions des event des bullets, ce doit être généré par le javascript et non mis manuellement
    firstBullet.addEventListener('click', function () {
        mySlider.selectCurrentImg(1,this);
    });

    secondBullet.addEventListener('click', function () {
        mySlider.selectCurrentImg(2, this);
    });

    thirdBullet.addEventListener('click', function() {
       mySlider.selectCurrentImg(3, this);
    })
};

function awesomeSlider(classSlider) {
    this.slider = document.getElementsByClassName(classSlider)[0];

    this.showNextItem = function() {
        this.changeActiveItemTo(this.nextElementToShowIn());
    };

    this.showPrevItem = function() {
        this.changeActiveItemTo(this.prevElementToShowIn());
    };

    this.nextElementToShowIn = function() {
        var activeItem = this.slider.getElementsByClassName('active')[0];
        var nextItem = activeItem.nextElementSibling;

        if (nextItem == null) {
            return document.getElementsByClassName('slider')[0].firstElementChild;
        }

        return nextItem;
    };

    this.prevElementToShowIn = function() {
        var activeItem = this.slider.getElementsByClassName('active')[0];
        var prevItem = activeItem.previousElementSibling;

        if (prevItem == null) {
            return document.getElementsByClassName('slider')[0].lastElementChild;
        }

        return prevItem;
    };

    this.animateSlider = function(activeItem, nextItem) {
        activeItem.classList.remove('active');
        activeItem.classList.remove('fade-out');
        nextItem.classList.add('active');
    };

    this.changeActiveItemTo = function(index) {
        var activeItem = this.slider.getElementsByClassName('active')[0];
        activeItem.classList.add('fade-out');

        var that = this;
        setTimeout(function() {
            that.animateSlider(activeItem, index);
        }, 600);
    };


    this.selectCurrentImg = function(item, bullets) {
        var nextItem = this.slider.getElementsByClassName('item')[item - 1];
        bullets.classList.add('active-bullet');
        this.changeActiveItemTo(nextItem);
    };


};

