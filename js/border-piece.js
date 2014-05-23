/* 
* @Author: Groza Sergiu
* @Date:   2014-05-23 02:44:33
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-24 00:18:07
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var BorderPiece = function(options){
    var configs = options || {};
    this.parent = configs["parent"];
    this.log_prefix = configs["log-prefix"] || "BorderPiece | ";
    this.verbosity = configs["verbosity"] || Arkanoid.Logger.DEBUG;
    this.x = configs["x"] || 0;
    this.y = configs["y"] || 0;
    this.image = configs["image"];
    this.width = configs["width"] || this.image.width;
    this.height = configs["height"] || this.image.height;
  };

  BorderPiece.prototype = Object.create(Arkanoid.AbstractLogger);
  Object.defineProperties(BorderPiece.prototype,{
    x: {
      get: function(){ return this._x; },
      set: function(value){
        if(!isNaN(Number(value))){
          this._x = Number(value);
        }else{
          throw new Error("Invalid x value: '" + value + "'");
        }
        return this;
      }
    },

    y: {
      get: function(){ return this._y; },
      set: function(value){
        if(!isNaN(Number(value))){
          this._y = Number(value);
        }else{
          throw new Error("Invalid y value: '" + value + "'");
        }
        return this;
      }
    },

    width: {
      get: function(){ return this._width; },
      set: function(value){
        this._width = value;
        return this;
      }
    },

    height: {
      get: function(){ return this._height; },
      set: function(value){
        this._height = value;
        return this;
      }
    },

    image: {
      get: function(){ return this._image; },
      set: function(image){
        if(image && typeof(image) === "object"){
          var that = this;
          this._image = image;
        }else{
          throw new Error("Invalid image value: '" + image + '"');
        }
        return this;
      }
    }
  });

  Arkanoid.BorderPiece = BorderPiece;
})(window,undefined);