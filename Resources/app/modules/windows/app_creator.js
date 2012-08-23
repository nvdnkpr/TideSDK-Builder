/**
 * App Creator
 * ===========
 * The App Creator window is used to create/import a new application into Tide Builder.
 */
define(['modules/window', 'text!./app_creator/template.html', 'css!./app_creator/style.css'], function(win, html, css){
    var my_window = new win({
        title: 'Create new Application',
        backdrop: true,
        close_on_backdrop: false,
        keyboard: false,
        close_title: true,
        width: 670,
        css_class: 'mod-app-creator',
        buttons: [
            {
                type: 'primary',
                label: 'Create application',
                disabled: true
            },
            {
                label: 'Cancel',
                do_close: true
            }
        ]
    });

    my_window.content_el.html(html);

    var obj = {
        open: function(){
            my_window.show();
        }
    }

    _.extend(obj, Backbone.Events);

    return obj;
});