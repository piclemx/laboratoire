$(function() {
    DayCollection = Backbone.Collection.extend({
        model: DayModel,
        parse: function(response) {
            return response.forecast.simpleforecast.forecastday;
}
    });
});