# Formed

A form builder, with default, but customisable markup, which displays validation and errors

[![Build Status](https://secure.travis-ci.org/arbarlow/formed.png)](http://travis-ci.org/arbarlow/formed)

The first argument is object, which can be anything, but should respond to the following methods

``` javascript
.isNewRecord //has this object been persisted to the DB/Store?
.__factory.name //the name of the model, i.e 'Product', 'Book'
```
and any attributes it might have like id, title etc..

# Example

If you were for example using the [Express](http://expressjs.com/ "Express.js") framework, your new action may look like this..

``` javascript
// models.Product is a Sequelize.js model definition
var product = models.Product.build();
var form = new Formed(product, '/products');
res.render('products/new', {form: form});
```

And in your EJS view..

``` html
<div>
<%- form.start() %>
  <div><%- form.label('title') %></div>
  <div><%- form.input('title', {type: 'text'}) %></div>
  <div><%- form.label('description') %></div>
  <div><%- form.textarea('description') %></div>
  <div><%- form.label('image') %></div>
  <div><%- form.input('image', {type: 'file'}) %></div>
  <div><%- form.submit('Save') %></div>
<%- form.end() %>
</div>
```

Notice how Formed has no opinion of markup, it only renders the form elements, you are responsible for the wrapping elements, lists, divs etc

# Adapter support

Currently, it is primarily designed, to work with Sequelize.js, a great MySQL ORM for Node.JS.

It should however, be trivial to plug support into another adapter and i'm more that willing to accept patches to make the form builder more agnostic