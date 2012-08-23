/**
 * Application List Module
 * =======================
 * This module provides a searchable list of applications that are indexed in TideSDK Builder.
 * @singleton
 */
define(
        [
            'modules/store',
            'text!./application_list/template.html',
            'text!./application_list/list-element.html',
            'i18n!./application_list/nls/lang'
        ],

        function (store, tpl_src, tpl_element_src, lang) {
            var tpl_element = _.template(tpl_element_src);


            /**
             * The update function will re-render the list of apps.
             */
            function update(){
                var elements = store.app_list(),
                    headline = '';

                if(!elements.length) headline = lang.no_apps;

                var html = '<li class="nav-header">' + headline + '</li>';

                _.each(elements, function(elm){
                    html += tpl_element(elm);
                });

                $('.applications-list', DOM_el).html(html);
            }

            var DOM_el = $(_.template(tpl_src)(lang));

            var public = {
                el: DOM_el
            }

            update();

            _.extend(public, Backbone.Events);

            return public;
        }
);