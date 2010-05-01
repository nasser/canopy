Canopy.Parser.extend({
  Sequence: new JS.Class(Canopy.Parser, {
    extend: {
      create: function() {
        return new this(Array.prototype.slice.call(arguments));
      }
    },
    
    initialize: function(parsers) {
      this._parsers = parsers;
    },
    
    consume: function(input, session) {
      var elements  = [],
          parsers   = this._parsers,
          textValue = '',
          offset    = session.offset,
          labelled  = {},
          n = parsers.length, i, node, label;
      
      for (i = 0; i < n; i++) {
        node = parsers[i].consume(input, session);
        if (!node) return null;
        
        if (label = parsers[i].label) labelled[label] = node;
        elements.push(node);
        
        input = input.substring(node.textValue.length);
        
        textValue      += node.textValue;
        session.offset  = offset + textValue.length;
      }
      return this._syntaxNode(textValue, offset, elements, labelled);
    }
  })
});
