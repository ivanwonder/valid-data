const assert = require("assert");
const {ValidArray, ValidGroup, ValidValue} = require("../index");

describe("test valid-data", function() {
  it("test", function() {
    const data = {
      a: 1,
      array: [{a: 1}],
      arrayTwo: [1]
    };

    const valid = new ValidGroup({
      a: {
        validFun: function(value) {
          return value === 1;
        }
      },
      array: new ValidArray({
        a: {
          validFun: function(value) {
            return value === 1;
          }
        }
      }),
      arrayTwo: new ValidArray(new ValidValue({
        validFun: function(value) {
          return value === 1;
        }
      }))
    });
    valid.do(data);

    assert.deepEqual(valid.valid, true);
  });
});
