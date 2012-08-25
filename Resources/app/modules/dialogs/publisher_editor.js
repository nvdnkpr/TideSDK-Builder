/**
 * Publisher Editor
 * ================
 * The publisher editor is used to manage the available publishers, as well as selecting
 */
define(['modules/bs_window', 'modules/store', 'modules/ui/publisher_settings', 'text!./publisher_editor/template.html', 'text!./publisher_editor/list-item.html', 'i18n!./publisher_editor/nls/lang'], function (mod_window, store, mod_publisher_settings, tpl_src, tpl_item_src, lang) {
    var tpl_item = _.template(tpl_item_src);

    var my_window = new mod_window({
        title:lang.title,
        backdrop:true,
        close_title:true,
        width:670,
        window_class:'mod-publisher-editor',
        height_limit:450,
        zindex: 2000,
        width: 690,
        buttons:[
            {
                id: 'do_select',
                type:'primary',
                label:lang.select,
                do_close: true,
                callback: function(){
                    public.trigger('select', store.publisher_get(private.selected));
                },
                disabled:true
            },
            {
                label:lang.cancel,
                do_close:true
            }
        ]
    });

    my_window.content_el.html(tpl_src);

    var publisher_settings = new mod_publisher_settings();
    publisher_settings.el.hide();
    my_window.$('.hook_mod-publisher-settings').append(publisher_settings.el);

    //The add publisher button
    my_window.$('.btn-primary').click(function(){
        var new_publisher = {
            id: 'com.example.publisher',
            title: 'New Publisher',
            web: '',
            mail: ''
        }

        store.publisher_set('com.example.publisher', new_publisher);

        public.pick('com.example.publisher');
    });

    my_window.$('.nav').on('click', 'a', function(e){
        e.stopPropagation();
        e.preventDefault();

        $(this).parent().parent().find('li').removeClass('active');
        $(this).parent().addClass('active');
        public.pick($(this).attr('data-id'));
    });

    function get_list(){
        var publishers = store.publisher_list();
        var html = '';
        _.each(publishers, function(publisher){
            html += tpl_item(publisher);
        });
        if(!publishers.length){
            html = '<li class="nav-header">' + lang.empty + '</li>';
        }
        my_window.$('.nav').html(html);
        if(private.selected) my_window.$('a[data-id="' + private.selected + '"]').parent().addClass('active');
    }

    var private = {
        selected: ''
    }

    var public = {
        /**
         * Select a specific publisher element.
         * @param id
         */
        pick: function(id){
            if(store.publisher_exists(id)){
                private.selected = id;
                get_list();
                publisher_settings.edit(id);
                my_window.$('.no-select-message').hide();
                publisher_settings.el.show();
                my_window.enable_button('do_select');
            }
        },
        show: function(){
            my_window.show();
            this.trigger('show');
        },
        hide: function(){
            my_window.hide();
            this.trigger('hide');
        }
    }

    _.extend(public, Backbone.Events);

    get_list();
    store.on('publisher:add publisher:remove publisher:update', get_list);

    return public;
});