/* 
* @Author: Groza Sergiu
* @Date:   2014-05-23 01:06:24
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-24 00:25:32
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Border = function(options){
    var configs = options || {};
    this.parent = configs["parent"];
    this.log_prefix = configs["log-prefix"] || "Border | ";
    this.verbosity = configs["verbosity"] || Arkanoid.Logger.DEBUG;
    this.marginTop = configs["margin-top"];
    this.canvas = configs["canvas"];
    this.leftCorner = configs["left-corner"];
    this.rightCorner = configs["right-corner"];
    this.horizontalBorder = configs["horizontal-border"];
    this.verticalBorder = configs["vertical-border"];
    this.pieces = [];
    this.init();
  };

  Border.prototype = Object.create(Arkanoid.AbstractLogger);
  Object.defineProperties(Border.prototype,{
    init: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        var that = this;
        this.pieces.push(new Arkanoid.BorderPiece({
          parent: this,
          x: 0,
          y: this.marginTop,
          image: this.leftCorner
        }));
        this.pieces.push(new Arkanoid.BorderPiece({
          parent: this,
          x: this.canvas.width - this.rightCorner.width,
          y: this.marginTop,
          image: this.rightCorner
        }));

        this.pieces.push(new Arkanoid.BorderPiece({
          parent: this,
          x: this.leftCorner.width,
          y: this.marginTop,
          width: this.canvas.width - this.leftCorner.width - this.rightCorner.width,
          image: this.horizontalBorder
        }));
        var count = (this.canvas.height - this.marginTop) / this.verticalBorder.height;
        for(var i=0; i < count; i++){
          this.pieces.push(new Arkanoid.BorderPiece({
            parent: this,
            x: 0,
            y: this.marginTop + (i * this.verticalBorder.height) + this.horizontalBorder.height,
            image: this.verticalBorder
          }));
          this.pieces.push(new Arkanoid.BorderPiece({
            parent: this,
            x: this.canvas.width - this.verticalBorder.width,
            y: this.marginTop + (i * this.verticalBorder.height) + this.horizontalBorder.height,
            image: this.verticalBorder
          }));
        }
      }
    },

    marginTop: {
      get: function(){ return this._marginTop; },
      set: function(margin){
        if(!isNaN(Number(margin))){
          this._marginTop = Number(margin);
        }else{
          throw new Error("Invalid margin top: '" + margin + "'");
        }
        return this;
      }
    },

    canvas: {
      get: function(){ return this._canvas; },
      set: function(canvas){
        var element = $(canvas)[0];
        if(element){
          this._canvas = element;
        }else{
          this.error("Canvas element not found: '" + canvas + "'");
        }
        return this;
      }
    },

    leftCorner: {
      get: function(){ return this._leftCorner; },
      set: function(image){
        var element = $(image)[0];
        if(element){
          this._leftCorner = element;
        }else{
          this.error("Image element not found: '" + image + "'");
        }
        return this;
      }
    },

    rightCorner: {
      get: function(){ return this._rightCorner; },
      set: function(image){
        var element = $(image)[0];
        if(element){
          this._rightCorner = element;
        }else{
          this.error("Image element not found: '" + image + "'");
        }
        return this;
      }
    },

    horizontalBorder: {
      get: function(){ return this._horizontalBorder; },
      set: function(image){
        var element = $(image)[0];
        if(element){
          this._horizontalBorder = element;
        }else{
          this.error("Image element not found: '" + image + "'");
        }
        return this;
      }
    },

    verticalBorder: {
      get: function(){ return this._verticalBorder; },
      set: function(image){
        var element = $(image)[0];
        if(element){
          this._verticalBorder = element;
        }else{
          this.error("Image element not found: '" + image + "'");
        }
        return this;
      }
    },

    draw: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        var piece;
        var context = this.canvas.getContext("2d");
        for(var i=0; i < this.pieces.length; i++){
          piece = this.pieces[i];
          context.drawImage(piece.image,piece.x,piece.y,piece.width,piece.height);
        }
      }
    }
  });

  Arkanoid.Border = Border;
})(window,undefined);