/**
 * runner.js
 * ===========
 * description
 */
define(['modules/bs_window', 'text!./runner/template.html', 'css!./runner/style.css'], function(mod_window, html, css){
    var my_window = new mod_window({
        title: 'Running Application Title <small>build 315</small>',
        backdrop: true,
        close_on_backdrop: false,
        close_title: false,
        keyboard: false,
        width: 670,
        window_class: 'mod-runner',
        buttons: [
            {
                label: 'Stop Process',
                do_close: true,
                css_class: 'btn-danger'
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