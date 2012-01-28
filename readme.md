# Formed

A form builder, with default, but customisable markup, which displays validation and errors

The first argument is object, which can be anything, but should respond to the following methods

  .isNewRecord //has this object been persisted to the DB/Store?
  .__definition.name //the name of the model, i.e 'Product', 'Book'

and any attributes it might have like id, title etc..

# Adapter support

Currently, it is primarily designed, to work with Sequalize.js, a great MySQL ORM for Node.JS.

It should however, be trivial to plug support into another adapter and i'm more that willing to accept patches to make the form builder more agnostic