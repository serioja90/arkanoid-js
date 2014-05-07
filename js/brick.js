/* 
* @Author: Groza Sergiu
* @Date:   2014-04-18 11:03:16
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-07 12:07:34
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Brick = function(options){
    var configs = options || {};
    this.parent = configs["parent"];
    this.log_prefix = configs["log-prefix"] || "Brick | ";
    this.verbosity = configs["verbosity"] || Arkanoid.Logger.DEBUG;
    this.type = configs["type"];
    this.level = configs["level"];
    this.init();
  };

  Brick.TYPES = ["W","O","C","G","R","B","V","Y","I","S"];
  Brick.COLORS = {
    "W": "white",
    "O": "orange",
    "C": "cyan",
    "G": "green",
    "R": "red",
    "B": "blue",
    "V": "violet",
    "Y": "yellow",
    "I": "gold", // to set
    "S": "gray"
  }
  
  Brick.prototype = Object.create(Arkanoid.AbstractLogger);
  Object.defineProperties(Brick.prototype,{
    init: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        if(this.type === "I"){
          this.health = Infinity;
          this.points = 50;
        }else if(this.type === "S"){
          this.health = 2 + this.level % 8;
          this.points = 50 * this.level;
        }else{
          this.health = 1;
          this.points = 50 + Brick.TYPES.indexOf(this.type) * 10;
        }
      }
    },

    type: {
      get: function(){ return this._type; },
      set: function(type){
        if(type && Brick.TYPES.indexOf(type) >= 0){
          this._type = type;
        }else{
          throw new Error("Invalid brick type: '" + type + "'");
        }
        return this;
      }
    },

    level: {
      get: function(){ return this._level; },
      set: function(level){
        if(level && !isNaN(Number(level))){
          this._level = Number(level);
        }else{
          throw new Error("Invalid level: '" + level + "'");
        }
        return this;
      }
    },

    points: {
      get: function(){ return this._points; },
      set: function(points){
        if(points && !isNaN(Number(points))){
          this._points = Number(points);
        }else{
          throw new Error("Invalid points value: '" + points + "'");
        }
        return this;
      }
    },

    health: {
      get: function(){ return this._health; },
      set: function(health){
        if(health && !isNaN(Number(health))){
          this._health = Number(health);
        }else{
          throw new Error("Invalid health value: '" + health + "'");
        }
        return this;
      }
    },

    hit: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        this.health--;
        return this.type === "I" || this.isDestroyed() ? this.points : 0;
      }
    },

    isDestroyed: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        return this.health <= 0;
      }
    }
  });

  Arkanoid.Brick = Brick;
})(window,undefined);