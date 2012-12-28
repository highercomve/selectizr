/*
Plugin Name: Selectizr
Description: Selectizr is a plugin to autofill a text field with options for one question
Author: highercomve (Sergio Marin)
license: MIT

*/

if ( typeof Object.create !== 'function' ) {
  Object.create = function( obj ) {
    function F() {};
    F.prototype = obj;
    return new F();
  };
}

(function( $ , window, document, undefined){

  var SelectizrBuilder = {

    init: function(options, elem) {
      var self = this; // guarda un cache de objeto para no confundirlo con el this de jQuery

      self.values = "";
      self.options = $.extend( {}, $.fn.selectizr.options, options );
      // Default selectors
      self.field_parent = $(elem);
      self.field = self.field_parent.find(self.options.field_selector);  
      if(!self.options.debug) {
        self.field.hide();
      }
      self.firstDisplay();   
      self.eventInit(); 
    },

    eventInit: function() {
      var self = this;  // guarda un cache de objeto para no confundirlo con el this de jQuery
      self.addMore();
      self.saveEvent();
    },

    firstDisplay: function() {
      var self = this; // guarda un cache de objeto para no confundirlo con el this de jQuery
      
      self.inners_fields = $('<div></div>', { class: "inners-fields" })
        .append($('<a></a>', { text: "Agregar opcion", class: "more-button" }))
        .append($('<a></a>', { text: "Guardar Opciones", class: "save-button" }))
        .insertAfter(self.field);
      console.log(self.inners_fields);
    },

    addMore: function() {
      var self = this; // guarda un cache de objeto para no confundirlo con el this de jQuery
      self.field_parent.on('click', '.more-button', function (){
        console.log('agregando campo');
        self.addField();
      });
    },
    
    addField: function() {
      var self = this, // guarda un cache de objeto para no confundirlo con el this de jQuery
          template = "<div class='option-container'>\
                        <span type='text' class='option-field' contenteditable='true'>New Option</span>\
                        <input type='checkbox' class='option-field-correct' value='true'/>Correct?\
                      </div>";
      $(template).appendTo(self.inners_fields);
    },

    saveEvent: function() {
      self = this; // guarda un cache de objeto para no confundirlo con el this de jQuery
      self.field_parent.on('click', '.save-button', function(){
        self.saveFields();
      });
    },

    saveFields: function() {
      var self = this, // guarda un cache de objeto para no confundirlo con el this de jQuery
          options = new Array();
      
      self.field_parent.find(".option-container").each(function () {
        var $this = $(this),
            content = $this.find('.option-field').html(),
            correct = $this.find('.option-field-correct:checked').val();

        // variable format option@true|false, option@true|false
        correct = (correct === undefined) ? false:true;
        options.push( content+"@"+correct );
      });

      self.field.val(options);
      //console.log("contenido: "+content+" correcto"+correct);
    }
  };

  $.fn.selectizr = function(options) {
    return this.each(function () {
      // dynamicof = dynamic options field
      var dynamicof = Object.create( SelectizrBuilder );

      dynamicof.init(options, this);

      $.data( this, 'selectizr', dynamicof );
    });
  };

  $.fn.selectizr.options = {
    'field_selector' : '.options-field',
    'debug' : false
  };

})(jQuery, window, document);