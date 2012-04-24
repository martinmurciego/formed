# Formed

A form builder, with default, but customisable markup, which displays validation and errors

[![Build Status](https://secure.travis-ci.org/arbarlow/formed.png)](http://travis-ci.org/arbarlow/formed)

# A Note

Formed, currently works with Sequalize.JS (though can easily be made to work with any ORM). It is however, really a pre cursor to my module Iron, which is a ORM with easier validation and more javascript like DSL

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

``` erb
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

Which would render the following..

``` html
<div>
<form method="POST" action="/products" id="new_product_form">
  <div><label for="product_title" >Title</label></div>
  <div><input name="title" type="text" id="product_title"></div>
  <div><label for="product_description" >Description</label></div>
  <div><textarea name="description" ></textarea></div>
  <div><label for="product_image" >Image</label></div>
  <div><input name="image" type="file" id="product_image"></div>
  <div><input type="submit" value="Save" /></div>
</form>
</div>
```

Notice how Formed has no opinion of markup, it only renders the form elements, you are responsible for the wrapping elements, lists, divs etc

# Validation

Whilst Formed does not handle any validation by itself, it does include support for rendering errors to the client..

Consider a create action that fails using model validations..


``` javascript
// models.Product is a Sequelize.js model definition
var product = models.Product.build(req.body);
var errors = product.validate();
if (!errors) {
  // Hurray, the form and data is fine, lets save and take them home
  product.save().success(function(new_product) {
    res.redirect('/products');
  });
}else{
  // oh noes, let re render the form and ad pass in a hash of errors..
  var form = new Formed(product, '/products', {id: 'new_product_form'}, errors);
  res.render('products/new', {form: form});
};
```

In your view..

``` erb
<div>
<%- form.start() %>
  <%- form.error('title') %>
  <div><%- form.label('title') %></div>
  <div><%- form.input('title', {type: 'text'}) %></div>

  <%- form.error('description') %>
  <div><%- form.label('description') %></div>
  <div><%- form.textarea('description') %></div>

  <%- form.error('image') %>
  <div><%- form.label('image') %></div>
  <div><%- form.input('image', {type: 'file'}) %></div>

  <div><%- form.submit('Save') %></div>
<%- form.end() %>
</div>
```

Would output the following..

``` html
<div>
<form method="POST" action="/products" id="new_product_form">
  <div class="error">Invalid characters: title</div>
  <div class="error">String is empty: title</div>

  <div><label for="product_title">Title</label></div>
  <div><input name="title" type="text" id="product_title" class="errors"></div>
  
  <div class="error">Invalid characters: description</div>
  <div class="error">String is empty: description</div>

  <div><label for="product_description">Description</label></div>
  <div><textarea name="description" id="product_description" class="errors"></textarea></div>
  
  <div class="error">Invalid characters: image</div>
  <div class="error">String is empty: image</div>

  <div><label for="product_image">Image</label></div>
  <div><input name="image" type="file" id="product_image" class="errors"></div>
  
  <div><input type="submit" value="Save"></div>
</form>
</div>
```

Notice how form.error can print out multiple errors..

The error object passed in, would look something like this..

``` javascript
  { 
    name: [ 'Invalid characters: name', 'String is empty: name' ],
    description: [ 'Invalid characters: description', 'String is empty: description' ],
    image: [ 'Invalid characters: image', 'String is empty: image' ],
  }
```

# Adapter support

Currently, it is primarily designed, to work with Sequelize.js, a great MySQL ORM for Node.JS.

It should however, be trivial to plug support into another adapter and i'm more that willing to accept patches to make the form builder more agnostic

# Todo

Still needs a good way of defining selects, checkboxes and similar items..