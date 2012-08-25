/**
 * Publisher Settings
 * ==================
 *
 */
define(['modules/store', 'text!./publisher_settings/template.html', 'i18n!./publisher_settings/nls/lang'], function (store, tpl_src, lang) {
    var tpl = _.template(tpl_src);

    return function (params) {
        var DOM_el = $(tpl(lang));

        $('input', DOM_el).keyup(function () {
            var $this = $(this);

            var value = $(this).val();
            if ($this.hasClass('txt-publisher-key')){
                editing_obj.id = value;
                clearTimeout(keytimer);
                keytimer = setTimeout(update_key, 2000);
            }
            if ($this.hasClass('txt-publisher-name')) editing_obj.title = value;
            if ($this.hasClass('txt-publisher-web')) {
                editing_obj.web = value;
                console.log(value);
                if (value.match(/.+?\:\/\/.+?\..+?/)) {
                    var urlval = value.replace(/.+?\:\/\//gm, '');
                    urlval = urlval.split('/');
                    urlval = urlval[0].split('.').reverse();
                    $('.txt-publisher-key', DOM_el).val(urlval[0] + '.' + urlval[1]);
                    editing_obj.id = urlval[0] + '.' + urlval[1];
                    clearTimeout(keytimer);
                    keytimer = setTimeout(update_key, 2000);
                }
            }
            if ($this.hasClass('txt-publisher-mail')) editing_obj.mail = value;

            store.publisher_set(editing_id, editing_obj);
        });

        function update_key(){
            store.publisher_set_id(editing_id, editing_obj.id);
            editing_id = editing_obj.id;
        }

        var editing_id = null;
        var editing_obj = null;
        var keytimer = null;

        var public = {
            el:DOM_el,
            /**
             * Will connect to the store module and display the given publisher element for editing.
             * @param id
             */
            edit:function (id) {
                var settings = store.publisher_get(id);
                editing_obj = settings;

                if (settings == null) return;

                $('.txt-publisher-name', DOM_el).val(settings.title).focus();
                $('.txt-publisher-web', DOM_el).val(settings.web);
                $('.txt-publisher-key', DOM_el).val(settings.id);
                $('.txt-publisher-mail', DOM_el).val(settings.mail);

                editing_id = id;
            }
        }

        return public;
    }
});