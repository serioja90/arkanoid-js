/* 
* @Author: Groza Sergiu
* @Date:   2014-05-24 00:58:27
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-24 01:09:27
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Vector = function(options){
    var configs = options || {};
    this.parent = configs["parent"];
    this.log_prefix = configs["log-prefix"] || "Vector | ";
    this.verbosity = configs["verbosity"] || Arkanoid.Logger.DEBUG;
    this.x = configs["x"] || 0;
    this.y = configs["y"] || 0;
  };

  Vector.prototype = Object.create(Arkanoid.AbstractLogger);
  Object.defineProperties(Vector.prototype,{
    x: {
      get: function(){ return this._x; },
      set: function(x){
        this._x = Number(x);
        return this;
      }
    },

    y: {
      get: function(){ return this._y; },
      set: function(y){
        this._y = Number(y);
        return this;
      }
    },
  });

  Arkanoid.Vector = Vector;
})(window,undefined);