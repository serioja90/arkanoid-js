/* 
* @Author: Groza Sergiu
* @Date:   2014-04-18 11:03:16
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-07 03:17:22
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Brick = function(options){
    var configs = options || {};
  };
  
  Brick.prototype = Object.create(Arkanoid.AbstractLogger);
  Object.defineProperties(Brick.prototype,{});

  Arkanoid.Brick = Brick;
})(window,undefined);