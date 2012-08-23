/**
 * Application Settings Module
 * ===========================
 * The application settings module is used to tweak all kinds of settings of the current application.
 */
define(['text!./application_settings/template.html', 'i18n!./application_settings/nls/lang'], function(html, lang){

    var DOM_el = $(_.template(html)(lang));

    var public = {
        el: DOM_el
    }

    return public;
});