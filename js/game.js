/* 
* @Author: Groza Sergiu
* @Date:   2014-04-18 10:50:42
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-24 01:40:03
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Game = function(options){
    var configs = options || {};
    this.parent = configs["parent"];
    this.width = configs["width"] || 224;
    this.height = configs["height"] || 256;
    this.headerHeight = 0;
    this.bricks = [];
    this.log_prefix = configs["log-prefix"] || "Game | ";
    this.verbosity = configs["verbosity"] || Arkanoid.Logger.DEBUG;
    this.canvas = configs["canvas"];
    this.level = configs["level"] || 1;
    this.init();
  };

  Game.prototype = Object.create(Arkanoid.AbstractLogger);
  Object.defineProperties(Game.prototype,{
    init: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        this.border = new Arkanoid.Border({
          "parent": this,
          "verbosity": this.verbosity,
          "margin-top": this.headerHeight,
          "canvas": this.canvas,
          "left-corner": "#corner-left",
          "right-corner": "#corner-right",
          "horizontal-border": "#horizontal-border",
          "vertical-border": "#vertical-border"
        });
        this.generateBricks();
        this.draw();
        return this;
      }
    },
    draw: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        for(var i=0; i < this.canvas.width / this.background.width; i++){
          for(var j=0; j < this.canvas.height / this.background.height; j++ ){
            this.context.drawImage(
              this.background,
              2 + i * this.background.width,
              2 + j * this.background.height + this.headerHeight,
              Math.min(this.background.width,this.canvas.width - i * this.background.width - 4),
              this.background.height
            );
          }
        }
        this.drawBricks();
        this.border.draw();
        return this;
      }
    },

    drawBricks: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        for(var i=0; i < this.bricks.length; i++){
          this.bricks[i].draw();
        }
      }
    },

    border: {
      get: function(){ return this._border; },
      set: function(border){
        if(border && typeof(border) === "object"){
          this._border = border;
        }else{
          throw new Error("Invalid border value: '" + border + "'");
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
    
    level: {
      get: function(){ return this._level; },
      set: function(level){
        var temp;
        var found = false;
        if(!isNaN(Number(level))){
          this._level = Number(level);
          for(var i in Arkanoid.Levels){
            temp = Arkanoid.Levels[i];
            if(temp.level === level){
              this.levelData = temp;
              found = true;
              break;
            }
          }
          if(!found){
            throw new Error("Level not found: '" + level + "'");
          }
        }else{
          throw new Error("Invalid level: '" + level + "'");
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
              this.setCanvasSize(this.width,this.height);
              this.context = this.canvas.getContext("2d");
            }else{
              throw new Error("Invalid canvas: '" + canvas + "'");
            }
          }else if(typeof(canvas) === "object"){
            this._canvas = canvas;
            this.setCanvasSize(this.width,this.height);
            this.context = this.canvas.getContext("2d");
          }else{
            throw new Error("Invalid canvas: '" + canvas + "'");
          }
        }else{
          throw new Error("Invalid canvas: '" + canvas + "'");
        }
        return this;
      }
    },

    setCanvasSize: { writtable: false, configurable: false, enumerable: false,
      value: function(width,height){
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.canvas.width = width;
        this.canvas.height = height;
      }
    },

    context: {
      get: function(){ return this._context; },
      set: function(context){
        if(context && typeof(context) === "object"){
          this._context = context;
        }else{
          throw new Error("Invalid context: '" + context + "'");
        }
        return this;
      }
    },

    levelData: {
      get: function(){ return this._levelData; },
      set: function(levelData){
        if(levelData && typeof(levelData) === "object"){
          this._levelData = levelData;
          this.background = this.levelData.background;
          this.init();
        }else{
          throw new Error("Invalid level data: '" + levelData + "'");
        }
        return this;
      }
    },

    generateBricks: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        var row, brick;
        var rows = this.levelData.bricks.length;
        var brickWidth = (this.canvas.width - (this.border.verticalBorder.width * 2)) / this.levelData.bricks[0].length;
        var brickHeight = brickWidth / 2;
        this.bricks = [];
        for(var i=0; i < rows; i++){
          row = this.levelData.bricks[i].split("");
          for(var j=0; j < row.length; j++){
            if(row[j] != " "){
              brick = new Arkanoid.Brick({
                parent: this,
                type: row[j],
                level: this.level,
                x: this.border.verticalBorder.width + j * brickWidth,
                y: this.headerHeight + i * brickHeight,
                width: brickWidth,
                height: brickHeight,
                canvas: this.canvas
              });
              this.bricks.push(brick);
            }
          }
        }
      }
    },

    background: {
      get: function(){ return this._background; },
      set: function(background){
        var that = this;
        var image = $(background)[0];
        if(image){
          this._background = image;
        }else{
          throw new Error("Invalid backround value: '" + backround + "'");
        }
        return this;
      }
    }
  });

  Arkanoid.Game = Game;
})(window,undefined);