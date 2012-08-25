/**
 * main.js
 * ===========
 * description
 */
requirejs.config({
    urlArgs: "bust=" +  (new Date()).getTime()
});

define(['modules/ui/application_controller', 'modules/ui/application_settings', 'modules/ui/application_list'], function(mod_application_controller, mod_application_settings, mod_application_list){

    //Embedding the application controller.
    $('.application-title').append(mod_application_controller.el);

    //Embedding the application settings.
    $('.workspace').append(mod_application_settings.el);

    //Embedding the application list.
    $('.sidebar').append(mod_application_list.el);

    //Launch the app creator.
    $('.btn_add_application').click(function(){
        require(['modules/dialogs/app_creator'], function(ac){
            ac.open();
        });
    });

    //Run the selected application!
    $('.btn_run').click(function(){
        require(['modules/dialogs/runner'], function(runner){
            runner.open();
        });
    });
});