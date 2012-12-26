/*
Plugin Name: Selectizr
Description: Selectizr is a plugin to autofill a text field with options for one question
Author: highercomve (Sergio Marin)
Licencia MIT

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
      var self = this;

      self.values = "";
      self.options = $.extend( {}, $.fn.selectizr.options, options );
      // Default selectors
      self.field_parent = $(elem);
      self.field = self.field_parent.find(self.options.field_selector);  

      self.firstDisplay();   
      self.eventInit(); 
    },

    eventInit: function() {
      var self = this;
      self.addMore();
      self.saveEvent();
    },

    firstDisplay: function() {
      var self = this;
      
      self.inners_fields = $('<div></div>', { class: "inners-fields" })
        .append($('<a></a>', { text: "Agregar opcion", class: "more-button" }))
        .insertAfter(self.field);
      console.log(self.inners_fields);
    },

    addMore: function() {
      var self = this;
      self.field_parent.on('click', '.more-button', function (){
        console.log('agregando campo');
        self.addField();
      });
    },
    
    addField: function() {
      var self = this,
          template = "<div class='option-container'>\
                        <span type='text' class='option-field' contenteditable='true'>New Option</span>\
                        <input type='checkbox' class='option-field-correct' value='true'/>Correct?\
                        <a href='#' class='iconos edit-icon edit-option'>Edit</a>\
                        <a href='#' class='iconos save-icon save-option'>Save</a>\
                      </div>";
      $(template).appendTo(self.inners_fields);
    },

    saveEvent: function() {
      self = this;
      self.field_parent.on('click', '.save-option', function(){
        self.saveField(this);
      });
    },

    saveField: function(element) {
      var self = this,
          $element = $(element),
          $parent = $element.parent('.option-container'),
          $options = 
          content = $parent.find('.option-field').html(),
          correct = $parent.find('.option-field-correct:checked').val();
    
        correct = (correct === undefined) ? false:true;
        console.log("contenido: "+content+" correcto"+correct);
    },
    processValues: function() {
      var self = this;
      
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
    'field_selector' : '.options-field'
  };

})(jQuery, window, document);