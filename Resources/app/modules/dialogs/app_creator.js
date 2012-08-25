/**
 * App Creator
 * ===========
 * The App Creator window is used to create/import a new application into Tide Builder.
 */
define(['modules/bs_window', 'modules/ui/publisher_picker', 'text!./app_creator/template.html', 'css!./app_creator/style.css', 'i18n!./app_creator/nls/lang'], function(mod_window, mod_publisher_picker, html, css, lang){
    var my_window = new mod_window({
        title: 'Create new Application',
        backdrop: true,
        close_on_backdrop: false,
        keyboard: false,
        close_title: true,
        width: 670,
        window_class: 'mod-app-creator',
        height_limit: 450,
        buttons: [
            {
                type: 'primary',
                label: lang.create_application,
                disabled: true
            },
            {
                label: lang.cancel,
                do_close: true
            }
        ]
    });

    var app;
    function prepare_app(){
        app = {
            title: '',
            id: '',
            path: '',
            publisher: null
        }
    }

    function build_app_key(){
        var publisher_key = publisher_picker.get();
        if(publisher_key == null){
            my_window.$('.txt-application-id').val('');
            return;
        }
        publisher_key = publisher_key.id;

        var dta = my_window.$('.txt-application-title').val().toLowerCase();
        var allowed = 'abcdefghijklmnopqrstuvwxyz0123456789 '.split('');
        var app_key = '';
        for(var i = 0; i < dta.length; i++){
            if(allowed.indexOf(dta.substr(i, 1)) != -1) app_key += dta.substr(i, 1);
        }

        app_key = app_key.replace(/ /gm, '_');

        if(!app_key) app_key = 'untitled';

        console.log(publisher_key + '.' + app_key);
        my_window.$('.txt-application-id').val(publisher_key + '.' + app_key);
    }

    my_window.content_el.html(_.template(html)(lang));

    my_window.$('.txt-application-title').keyup(build_app_key);


    var publisher_picker = new mod_publisher_picker({
        id: localStorage.getItem('builder.last_creation_publisher')
    });
    publisher_picker.on('change', build_app_key);

    my_window.$('.publisher_picker').append(publisher_picker.el);

    my_window.on('show', function(){
        my_window.$('.txt-application-title').val('').focus();
        build_app_key();
    });

    var obj = {
        open: function(){
            my_window.show();
        }
    }

    _.extend(obj, Backbone.Events);


    return obj;
});