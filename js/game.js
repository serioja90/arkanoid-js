/* 
* @Author: Groza Sergiu
* @Date:   2014-04-18 10:50:42
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-21 02:52:38
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Game = function(options){
    var configs = options || {};
    this.parent = configs["parent"];
    this.width = configs["width"] || 224;
    this.height = configs["height"] || 256;
    this.headerHeight = this.height / 100 * 8;
    this.bricks = [];
    this.log_prefix = configs["log-prefix"] || "Game | ";
    this.verbosity = configs["verbosity"] || Arkanoid.Logger.DEBUG;
    this.level = configs["level"] || 1;
    this.canvas = configs["canvas"];
    this.render();
  };

  Game.prototype = Object.create(Arkanoid.AbstractLogger);
  Object.defineProperties(Game.prototype,{
    constructor: Game,
    render: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        this.drawBackground(this.levelData.background);
        this.drawBorder();
        this.generateBricks();
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
        var brickWidth = Math.ceil((this.canvas.width-16) / this.levelData.bricks[0].length);
        var brickHeight = Math.ceil(brickWidth / 2);
        this.bricks = [];
        for(var i=0; i < rows; i++){
          row = this.levelData.bricks[i].split("");
          for(var j=0; j < row.length; j++){
            if(row[j] != " "){
              brick = new Arkanoid.Brick({
                parent: this,
                type: row[j],
                level: this.level,
                x: 8 + j * brickWidth,
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

    drawBackground: { writtable: false, configurable: false, enumerable: false,
      value: function(src){
        var that = this;
        if(!src){
          throw new Error("Invalid image source: '" + src + "'");
        }
        var img = new Image();
        img.onload = function(){
          for(var i=0; i < that.canvas.width / img.width; i++){
            for(var j=0; j < that.canvas.height / img.height; j++ ){
              that.context.drawImage(
                img,
                i*img.width,
                j*img.height + that.headerHeight,
                img.width,
                img.height
              );
            }
          }
          that.drawBricks();
        }
        img.src = src;
        return this;
      }
    },

    drawBorder: { writtable: false, configurable: false, enumerable: false,
      value: function(){
        var that = this;
        var leftCorner = new Image();
        var rightCorner = new Image();
        var tube = new Image();
        var leftCorner = new Image();
        var vertical = new Image();
        leftCorner.onload = function(){
          that.context.drawImage(
            leftCorner,
            0,
            that.headerHeight - leftCorner.height/2,
            leftCorner.width,
            leftCorner.height
          );

          rightCorner.onload = function(){
            that.context.drawImage(
              rightCorner,
              that.canvas.width - rightCorner.width,
              that.headerHeight - rightCorner.height/2,
              rightCorner.width,
              rightCorner.height
            );

            tube.onload = function(){
              that.context.drawImage(
                tube,
                leftCorner.width,
                that.headerHeight - tube.height/2,
                that.canvas.width - rightCorner.width - leftCorner.width,
                tube.height
              );
            };
            tube.src = "img/horizontal-tube.png";
          };
          rightCorner.src = "img/corner-right.png";

          vertical.onload = function(){
            var base = that.headerHeight + leftCorner.height / 2;
            for(var i = 0; i < (that.canvas.height - base) / vertical.height; i++){
              that.context.drawImage(
                vertical,
                0,
                i * vertical.height + base,
                vertical.width,
                vertical.height
              );
              that.context.drawImage(
                vertical,
                that.canvas.width - vertical.width,
                i * vertical.height + base,
                vertical.width,
                vertical.height
              );
            }
          };
          vertical.src = "img/vertical-border.png";
        };
        leftCorner.src = "img/corner-left.png";
        return this;
      }
    }
  });

  Arkanoid.Game = Game;
})(window,undefined);