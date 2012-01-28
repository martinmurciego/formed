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
    expect(form.start()).toBe("<form method=\"POST\" action=\"/users\" id=\"user_form\">");
  });
  
  it("should render an empty form start element with a hidden method", function() {
    var user = User.build();
    var form = new Formed(user, '/users', {method: 'delete'});
    expect(form.start()).toBe("<form method=\"POST\" action=\"/users\" >\n<input type=\"hidden\" name=\"_method\" value=\"delete\"/>");
  });
  
  it("should render an default label with minimal args", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.label('name')).toBe("<label for=\"user_name\" >Name</label>");
  });
  
  it("should render an default label with other args", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.label('name', 'Your Name', {class: 'name_label'})).toBe("<label for=\"user_name\" class=\"name_label\">Your Name</label>");
  });
  
  it("should render an input with minimal args", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.input('name', {})).toBe("<input name=\"name\" id=\"user_name\">");
  });
  
  it("should render an input with minimal-ish args", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.input('name', {type: 'text'})).toBe("<input name=\"name\" type=\"text\" id=\"user_name\">");
  });
  
  it("should render an input with a value if the object has one", function() {
    var user = User.build();
    user.name = "Alex Barlow";
    var form = new Formed(user, '/users');
    expect(form.input('name', {type: 'text'})).toBe("<input name=\"name\" type=\"text\" id=\"user_name\" value=\"Alex Barlow\">");
  });
  
  it("should render an input with optional args", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.input('name', {type: 'text', class: 'user_name_input'})).toBe("<input name=\"name\" type=\"text\" class=\"user_name_input\" id=\"user_name\">");
  });
  
  it("should render an input with optional args and value", function() {
    var user = User.build();
    user.name = "Alex Barlow";
    var form = new Formed(user, '/users');
    expect(form.input('name', {type: 'text', class: 'user_name_input'})).toBe("<input name=\"name\" type=\"text\" class=\"user_name_input\" id=\"user_name\" value=\"Alex Barlow\">");
  });
  
  it("should render an text area with minimal args", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.textarea('name')).toBe("<textarea name=\"name\" ></textarea>");
  });
  
  it("should render an text area with minimal args and value", function() {
    var user = User.build();
    user.name = "Some long sentance that will be in the textarea"
    var form = new Formed(user, '/users');
    expect(form.textarea('name')).toBe("<textarea name=\"name\" >Some long sentance that will be in the textarea</textarea>");
  });
  
  it("should render an text area with options", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.textarea('name', {class: 'name_textarea'})).toBe("<textarea name=\"name\" class=\"name_textarea\"></textarea>");
  });
  
  it("should render an text area with options and value", function() {
    var user = User.build();
    user.name = "Some long sentance that will be in the textarea"
    var form = new Formed(user, '/users');
    expect(form.textarea('name', {class: 'name_textarea'})).toBe("<textarea name=\"name\" class=\"name_textarea\">Some long sentance that will be in the textarea</textarea>");
  });
  
  it("should render a submit tag", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.submit('Submit')).toBe("<input type=\"submit\" value=\"Submit\" />");
  });
  
  it("should render a submit tag with opts", function() {
    var user = User.build();
    var form = new Formed(user, '/users');
    expect(form.submit('Submit', {class: 'submit_button', id: 'something'})).toBe("<input type=\"submit\" value=\"Submit\" class=\"submit_button\" id=\"something\"/>");
  });
  
  it("should render an form close tag", function() {
    var user = User.build();
    var form = new Formed(user, '/users', {id: 'user_form'});
    expect(form.end()).toBe("</form>");
  });
  
});