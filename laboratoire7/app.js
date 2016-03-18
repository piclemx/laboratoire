$(function () {
    var dayCollection = new DayCollection({});

    var dayView = new DayView({
        collection: dayCollection
    });

    dayCollection.fetch().complete(function () {
        dayView.render();
    });
});
