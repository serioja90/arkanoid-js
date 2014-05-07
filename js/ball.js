/* 
* @Author: Groza Sergiu
* @Date:   2014-04-18 11:02:49
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-07 03:16:54
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Ball = function(options){
    var configs = options || {};
    this.log_prefix = configs["log-prefix"] || "Ball | ";
    this.verbosity = configs["verbosity"] || Arkanoid.Logger.DEBUG;
  };

  Ball.prototype = Object.create(Arkanoid.AbstractLogger);
  Object.defineProperties(Ball.prototype,{});

  Arkanoid.Ball = Ball;
})(window,undefined);