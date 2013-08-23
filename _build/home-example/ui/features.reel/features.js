var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component;

exports.Features = Montage.create(Component, {

    hasTemplate: {
        value: true
    },

    convert: {
      value:function(v) {
        return Number(Math.round(v)).toString()
      }
    },
    
    // TODO this is a lossy revert, which is not a good idea
    // but it gets this example working as expected
    revert: {
      value:function(v) {
        return Number(Math.round(v)).toString()
      }
    }

});
