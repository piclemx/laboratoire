$(function () {
    var dayCollection = new DayCollection({});
    dayCollection.url = 'http://api.wunderground.com/api/ccf8fe1ec42afad2/forecast7day/q/Québec.json';

    var dayView = new DayView({
        collection: dayCollection
    });

    dayCollection.fetch().complete(function () {
        dayView.render();
    });
});
