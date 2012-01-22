var Formed = require('../lib/index');

var product = global.Product.build(req.body);
var form = Formed.createForm(fields, errors);

exports.create = function(req, res){
  var product = global.Product.build(req.body);
  var form = Formed.createForm(fields, data, errors);
  
  // product.save().success(function(product) {
  //   
  // }).error(function(errors) {
  //   console.log(errors);
  // });
};

errors = { 
  title: [ 'Invalid characters: title', 'String is empty: title' ],
  description: [ 'Invalid characters: description', 'String is empty: description' ],
  image: [ 'Invalid characters: image', 'String is empty: image' ] 
}