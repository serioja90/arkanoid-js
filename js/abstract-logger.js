/* 
* @Author: Groza Sergiu
* @Date:   2014-05-01 00:49:17
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-01 02:44:45
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var AbstractLogger = Object.defineProperties({},{
    debug: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        this.parent.debug(this.log_prefix + msg);
        return this;
      }
    },

    log: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        this.parent.log(this.log_prefix + msg);
        return this;
      }
    },

    info: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        this.parent.info(this.log_prefix + msg);
        return this;
      }
    },

    warn: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        this.parent.warn(this.log_prefix + msg);
        return this;
      }
    },

    error: { writtable: false, configurable: false, enumerable: true,
      value: function(msg){
        this.parent.error(this.log_prefix + msg);
        return this;
      }
    },

    parent: {
      get: function(){
        if(!this._parent){
          this._parent = new Arkanoid.Logger({"verbosity": this.verbosity});
        }
        return this._parent;
      },

      set: function(parent){
        if(parent && typeof parent === "object"){
          this._parent = parent;
          if(this.verbosity){
            this._parent.verbosity = this.verbosity;
          }
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
          if(this._parent){
            this.parent.verbosity = this.verbosity;
          }
        }else{
          new Error("Invalid verbosity: '" + verbosity + "' (Number expected)");
        }
        return this;
      }
    }
  });

  Arkanoid.AbstractLogger = AbstractLogger;
})(window,undefined);