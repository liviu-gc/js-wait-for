var waitFor = (function(){
  
  var id = 0;
  
  return function (p1, p2, p3) {
    
    if (!new.target) { throw 'waitFor Error: must be called with *new waitFor(...)*'; }
    
    var t = this, _t = {
      id: ++id,
      T: null,
      iti: 250,
      fnCondition:null,
      fnCallback:null,
      cancelable: true,
      stop: false
    };
    
    if (typeof p1 === 'undefined')
      throw 'waitFor Error: missing parameters';
    
    if (typeof p1 === 'function' && typeof p2 === 'function') {
      
      _t.fnCondition = p1;
      _t.fnCallback = p2;
      
      if (typeof p3 === 'number')
        _t.iti = p3;
        
    } else if (typeof p1 === 'object' && p1.cond && p1.call) {
      
      _t.fnCondition = p1.cond;
      _t.fnCallback = p1.call;
      
      if (typeof p1.iti === 'number')
        _t.iti = p1.iti;
      
      if (typeof p1.cancelable !== 'undefined')
        _t.cancelable = Boolean(p1.cancelable);
     
    }
    
    if (!_t.fnCondition || !_t.fnCallback)
      throw 'waitFor Error: missing parameters';
    
    _t.T = setInterval( function() {
      if (_t.fnCondition( t.getId() )) {
        clearInterval( _t.T );
        if (t._stop)
          return false;
        _t.fnCallback( t.getId() );
      }
    }, _t.iti);
    
    t.getId = function() {
      return _t.id;
    }
    
    t.cancel = function(){
      if (!_t.cancelable)
        return false;
      
      _t.stop = true;
      clearInterval( _t.T );
    }
    
    return t;
  };

})();
