var Formed = require('../lib/index');

describe("Formed", function() {
  
  it("should render an empty form without any fields", function() {
    var form = Formed.createForm();
    expect(form).toBe("<form>\n</form>\n");
  });
  
});