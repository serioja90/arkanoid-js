/* 
* @Author: Groza Sergiu
* @Date:   2014-04-18 10:50:42
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-01 00:37:25
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Game = function(options){
    var config = options || {};
  };

  var GamePrototype = Object.defineProperties({},{
    constructor: Game,
    start: {
      writtable: false,
      configurable: false,
      enumerable: false,
      value: function(){

      }
    }
  });

  Game.prototype = GamePrototype;

  Arkanoid.Game = Game;
})(window,undefined);