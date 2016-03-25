var App = function(config) {
    this.config = config;

    this.init = function() {
        if (typeof Cookies.get('token') == 'undefined') {
            this.showLogin();
        } else {
            this.showProfile();
        }
    };

    this.login = function() {
        var self = this;
        $.ajax(this.config.api + 'authorize', {
            data: JSON.stringify({
                'username': $('#username').val(),
                'password': $.base64.encode($('#password').val())
            }),
            contentType : 'application/json',
            type : 'POST'
        }).success(function(data) {
            Cookies.set('token', data.token);
            self.showProfile();
        }).error(function(data) {
            alert("Erreur dans l'utilisateur ou le mot de passe");
        });
    };

    this.logout = function () {
        Cookies.remove('token');
        window.location = 'index.html';
    };

    this.showLogin = function() {
        $('#' + this.config.login).show();
        $('#' + this.config.profile).hide();
    };

    this.showProfile = function() {
        var self = this;
        $.ajax(this.config.api + 'userprofile', {
            type : 'GET',
            async: false,
            data: {
                'token': Cookies.get('token')
            }
        }).success(function(data) {
            $('#email').html(data.email);
            $('#' + self.config.profile).show();
            $('#' + self.config.login).hide();
        }).error(function() {
            alert("Vous n'avez pas accès à cette page");
            self.showLogin();
        });
    };
};
