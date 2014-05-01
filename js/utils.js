/* 
* @Author: Groza Sergiu
* @Date:   2014-05-01 02:49:21
* @Last Modified by:   Groza Sergiu
* @Last Modified time: 2014-05-01 04:05:08
*/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};

  var Utils = Object.defineProperties({},{
    timestamp: { writtable: false, configurable: false, enumerable: false,
      value: function(format){
        var datetime = new Date();
        var now = format || "%Y-%m-%d %H:%M:%S.%Z";
        now = now.replace(/%Y/g,datetime.getFullYear());
        now = now.replace(/%y/g,datetime.getYear());
        now = now.replace(/%m/g,this.digits(datetime.getMonth() + 1,2));
        now = now.replace(/%d/g,this.digits(datetime.getDate(),2));
        now = now.replace(/%H/g,this.digits(datetime.getHours(),2));
        now = now.replace(/%M/g,this.digits(datetime.getMinutes(),2));
        now = now.replace(/%S/g,this.digits(datetime.getSeconds(),2));
        now = now.replace(/%Z/g,this.digits(datetime.getMilliseconds(),3));
        return now;
      }
    },

    digits: { writtable: false, configurable: false, enumerable: false,
      value: function(number,digits){
        var result = (number + '').replace(/-/g,"");
        if(!number && number !== 0){ throw new Error("Invalid number: '" + number + "'"); }
        if((!digits && digits !== 0) || typeof digits !== "number" || digits < 1){ 
          throw new Error("Invalid digits: '" + digits + "' (Number > 1 expected)");
        }
        if(result.length < digits){
          return (number < 0 ? '-' : '') + Array(digits - result.length + 1).join("0") + result;
        }
        return result;
      }
    }
  });

  Arkanoid.Utils = Utils;
})(window,undefined);