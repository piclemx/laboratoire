$(function() {
    DayCollection = Backbone.Collection.extend({
        model: DayModel,
        url: 'http://api.wunderground.com/api/ccf8fe1ec42afad2/forecast7day/q/Québec.json',
        parse: function(response) {
            return response.forecast.simpleforecast.forecastday;
        }
    });
});