/* 
* @Author: Groza Sergiu
* @Date:   2014-04-18 11:03:16
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-24 01:57:35
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Brick = function(options){
    var configs = options || {};
    this.parent = configs["parent"];
    this.log_prefix = configs["log-prefix"] || "Brick | ";
    this.verbosity = configs["verbosity"] || Arkanoid.Logger.DEBUG;
    this.position = new Arkanoid.Vector({ parent: this, x: configs["x"], y: configs["y"] });
    this.width = configs["width"] || 32;
    this.height = configs["height"] || 16;
    this.type = configs["type"];
    this.level = configs["level"];
    this.canvas = configs["canvas"];
    this.init();
  };

  Brick.TYPES = ["W","O","C","G","R","B","V","Y","I","S"];
  Brick.COLORS = {
    "W": "#FFFFFF",
    "O": "#FF4000",
    "C": "#00BFFF",
    "G": "#04B404",
    "R": "#B40404",
    "B": "#08088A",
    "V": "#A901DB",
    "Y": "#FFFF00",
    "I": "#DBA901",
    "S": "#848484"
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
        return this;
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
        if(!isNaN(Number(level))){
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
        if(!isNaN(Number(points))){
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
        if(!isNaN(Number(health))){
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
    },

    position: {
      get: function(){ return this._position; },
      set: function(position){
        if(position && Arkanoid.Vector.prototype.isPrototypeOf(position)){
          this._position = position;
        }else{
          throw new Error("Invalid position: '" + position + "'");
        }
        return this;
      }
    },

    width: {
      get: function(){ return this._width; },
      set: function(width){
        if(!isNaN(Number(width))){
          this._width = width;
        }else{
          throw new Error("Invalid width: + '" + width + "'");
        }
        return this;
      }
    },

    height: {
      get: function(){ return this._height; },
      set: function(height){
        if(!isNaN(Number(height))){
          this._height = height;
        }else{
          throw new Error("Invalid height: + '" + height + "'");
        }
        return this;
      }
    },

    canvas: {
      get: function(){ return this._canvas; },
      set: function(canvas){
        if(canvas){
          if(typeof(canvas) === "string"){
            var element = $(canvas)[0];
            if(element){
              this._canvas = element;
            }else{
              throw new Error("Invalid canvas: '" + canvas + "'");
            }
          }else if(typeof(canvas) === "object"){
            this._canvas = canvas;
          }else{
            throw new Error("Invalid canvas: '" + canvas + "'");
          }
        }else{
          throw new Error("Invalid canvas: '" + canvas + "'");
        }
        return this;
      }
    },

    draw: { wirttable: false, configurable: false, enumerable: false,
      value: function(){
        var context = this.canvas.getContext("2d");
        context.fillStyle = Brick.COLORS[this.type];
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
        context.beginPath();
        context.strokeStyle = "#000000";
        context.lineWidth = 2.5;
        context.moveTo(this.position.x, this.position.y + this.height);
        context.lineTo(this.position.x + this.width, this.position.y + this.height);
        context.moveTo(this.position.x + this.width, this.position.y);
        context.lineTo(this.position.x + this.width, this.position.y + this.height);
        context.stroke();
      }
    }
  });

  Arkanoid.Brick = Brick;
})(window,undefined);