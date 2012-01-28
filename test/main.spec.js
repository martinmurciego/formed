Sequelize = require('sequelize');
sequelize = new Sequelize('formed_test', 'root', '', {
  host: 'localhost',
  port: 3306
})

var Formed = require('../lib/index');
var User = require('./user');

describe("Formed", function() {
  
  it("should render an empty form start element", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.start()).toBe("<form method=\"POST\" action=\"/users\" >");
  });
  
  it("should render an empty form start element with args", function() {
    var user = User.build();
    var form = new Formed(user, '/users', {id: 'user_form'});
    expect(form.start()).toBe("<form method=\"POST\" action=\"/users\" id=\"user_form\" >");
  });
  
  it("should render an empty form start element with a hidden method", function() {
    var user = User.build();
    var form = new Formed(user, '/users', {method: 'delete'});
    expect(form.start()).toBe("<form method=\"POST\" action=\"/users\" >\n<input type=\"hidden\" name=\"_method\" value=\"delete\" />");
  });
  
  it("should render an default label with minimal args", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.label('name')).toBe("<label for=\"name\">Name</label>");
  });
  
  it("should render an form close tag", function() {
    var user = User.build();
    var form = new Formed(user, '/users', {id: 'user_form'});
    expect(form.end()).toBe("</form>");
  });
  
});