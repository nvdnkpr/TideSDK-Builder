/**
 * App Creator
 * ===========
 * The App Creator window is used to create/import a new application into Tide Builder.
 */
define(['modules/bs_window', 'text!./app_creator/template.html', 'css!./app_creator/style.css', 'i18n!./app_creator/nls/lang'], function(mod_window, html, css, lang){
    var my_window = new mod_window({
        title: 'Create new Application',
        backdrop: true,
        close_on_backdrop: false,
        keyboard: false,
        close_title: true,
        width: 670,
        window_class: 'mod-app-creator',
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

    my_window.content_el.html(_.template(html)(lang));

    my_window.on('show', function(){
        my_window.$('.txt-application-title').focus();
    });

    var obj = {
        open: function(){
            my_window.show();
        }
    }

    _.extend(obj, Backbone.Events);

    return obj;
});