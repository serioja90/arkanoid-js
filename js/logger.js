/* 
* @Author: Groza Sergiu
* @Date:   2014-05-01 00:37:39
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-01 04:06:48
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Logger = function(options){
    var configs = options || {};
    this.log_prefix = configs["log-prefix"] || "Arkanoid | ";
    this.verbosity = configs["verbosity"] || Logger.DEBUG;
  };

  Logger.ERROR = 0;
  Logger.WARN = 1;
  Logger.INFO = 2;
  Logger.LOG = 3;
  Logger.DEBUG = 4;

  Object.defineProperties(Logger.prototype,{
    debug: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        if(this.verbosity >= Logger.DEBUG){
          var timestamp = Arkanoid.Utils.timestamp();
          console.debug("[" + timestamp + "] " + this.log_prefix  + msg);
        }
        return this;
      }
    },

    log: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        if(this.verbosity >= Logger.LOG){
          console.log(this.log_prefix + msg);
        }
        return this;
      }
    },

    info: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        if(this.verbosity >= Logger.INFO){
          console.info(this.log_prefix + msg);
        }
        return this;
      }
    },

    warn: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        if(this.verbosity >= Logger.WARN){
          console.warn(this.log_prefix + msg);
        }
        return this;
      }
    },

    error: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        if(this.verbosity >= Logger.ERROR){
          console.error(this.log_prefix + msg);
        }
        return this;
      }
    },

    log_prefix: {
      get: function(){ return this._log_prefix; },

      set: function(log_prefix){
        if(log_prefix && typeof log_prefix === "string"){
          this._log_prefix = log_prefix;
        }else{
          new Error("Invalid log prefix: '" + log_prefix + "' (String expected)");
        }
        return this;
      }
    },

    verbosity: {
      get: function(){ return this._verbosity; },

      set: function(verbosity){
        if(verbosity && typeof verbosity === "number"){
          this._verbosity = verbosity;
        }else{
          new Error("Invalid verbosity: '" + verbosity + "' (Number expected)");
        }
        return this;
      }
    }
  });

  Arkanoid.Logger = Logger;
})(window,undefined);