const testPost = require('../functions/fn-post')

test("returns false for empty field", () => {
    expect(testPost("")).toBe(false)
  })
  test("returns false for fields without letters", () => {
    expect(testPost("0123456789")).toBe(false)
  })
  test("returns false for fields without numbers", () => {
    expect(testPost("abcdefghijklmnopqrstuvwxyz")).toBe(false)
  })