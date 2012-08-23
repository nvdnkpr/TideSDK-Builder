/**
 * Application Controller
 * ======================
 * The application controller module displays the title of the current application, its build number
 * and two buttons to trigger the runner and packager.
 * @singleton
 */
define(['text!./application_controller/template.html', 'i18n!./application_controller/nls/lang'], function(html, lang){

    var DOM_el = $(_.template(html)(lang));

    var public = {
        el: DOM_el
    }

    return public;
});