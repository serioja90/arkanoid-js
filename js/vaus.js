/* 
* @Author: Groza Sergiu
* @Date:   2014-04-18 11:08:07
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-24 02:51:51
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Vaus = function(options){
    var configs = options || {};
    this.parent = configs["parent"];
    this.log_prefix = configs["log-prefix"] || "Vaus | ";
    this.verbosity = configs["verbosity"] || Arkanoid.Logger.DEBUG;
    this.canvas = configs["canvas"];
    this.image = configs["image"];
    this.center = new Arkanoid.Vector({parent: this, x: configs["x"], y: configs["y"]});
    this.width = (this.canvas.width - (this.parent.border.verticalBorder.width * 2)) / 
                 this.parent.levelData.bricks[0].length * 2;
    this.height = this.width / 3;
    this.init();
  };

  Vaus.prototype = Object.create(Arkanoid.AbstractLogger);
  Object.defineProperties(Vaus.prototype,{
    init: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        var that = this;
        $(window).mousemove(function(e){
          that.center.x = e.pageX - that.canvas.offsetLeft;
          that.center = that.center;
        });
      }
    },

    image: {
      get: function(){ return this._image;},
      set: function(image){
        var element = $(image)[0];
        if(element && typeof(element) === "object"){
          this._image = element;
        }else{
          throw new Error("Invalid image: '" + image + "'");
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

    center: {
      get: function(){ return this._center; },
      set: function(center){
        var leftLimit = this.parent.border.verticalBorder.width + this.width / 2 - 2;
        var rightLimit = this.canvas.width - this.width / 2 - 2;
        if(center && Arkanoid.Vector.prototype.isPrototypeOf(center)){
          this._center = center;
          if(this.center.x < leftLimit){
            this._center.x = leftLimit;
          }else if(this.center.x > rightLimit){
            this._center.x = rightLimit;
          }
        }else{
          throw new Error("Invalid center: '" + center + "'");
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

    draw: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        var context = this.canvas.getContext("2d");
        context.drawImage(
          this.image,
          this.center.x - this.width / 2,
          this.center.y - this.height / 2,
          this.width,
          this.height
        );
        return this;
      }
    }
  });

  Arkanoid.Vaus = Vaus;
})(window,undefined);