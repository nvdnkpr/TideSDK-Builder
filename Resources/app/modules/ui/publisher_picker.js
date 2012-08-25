/**
 * Publisher Picker
 * ================
 * This element will draw a button which shows the currently selected publisher and opens the publisher editor on click.
 */
define(['modules/store', 'text!./publisher_picker/button.html', 'i18n!./publisher_picker/nls/lang'], function(store, tpl_src, lang){
    var tpl = _.template(tpl_src);

    return function(params){
        if(typeof params == 'undefined') params = {};

        var selected_publisher = store.publisher_get(params.id);

        if(selected_publisher === null){
            selected_publisher = {
                id: null,
                icon: null,
                title: lang.empty
            }
        }

        var DOM_el = $('<div class="mod_publisher_picker">' + tpl(selected_publisher) + '</div>');

        function update(publisher){
            DOM_el.html(tpl(publisher));
        }

        //Listen to changes on that record and update the button, if necessary.
        store.on('publisher:' + selected_publisher.id + ':update', update);

        $(DOM_el).on('click', '.btn', function(){
            /**
             * Open the publisher editor and listen to "select" events as long as its open.
             */
            require(['modules/dialogs/publisher_editor'], function(publisher_editor){
                if(selected_publisher.id) publisher_editor.pick(selected_publisher.id);

                function listener(publisher){
                    store.off('publisher:' + selected_publisher.id + ':update', update);
                    selected_publisher = publisher;
                    store.on('publisher:' + selected_publisher.id + ':update', update);
                    update(publisher);
                    public.trigger('change', selected_publisher);
                }

                publisher_editor.on('select', listener);

                publisher_editor.one('hide', function(){
                    publisher_editor.off('select', listener);
                });

                publisher_editor.show();
            });
        });

        var public = {
            el: DOM_el,
            /**
             * Returns data of the currently picked publisher.
             */
            get: function(){
                return selected_publisher;
            }
        }

        _.extend(public, Backbone.Events);

        return public;
    }
});