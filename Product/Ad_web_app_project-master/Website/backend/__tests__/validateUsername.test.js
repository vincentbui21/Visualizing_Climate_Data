const validateUsername = require("../controllers/validateUsername");

test("returns false for empty username", () => {
  expect(validateUsername("")).toBe(false);
});
test("returns false for username with less than 5 characters", () => {
  expect(validateUsername("aksj")).toBe(false);
});
test("returns false for username without numbers and less than 5 characters", () => {
  expect(validateUsername("1251")).toBe(false);
});
test("returns false for username with numbers, letters, < 5 characters", () => {
  expect(validateUsername("a1")).toBe(false);
});
test("returns false for username with numbers, letters, > 12 characters", () => {
  expect(validateUsername("a12959jlfajkjljglj")).toBe(false);
});
test("returns true for username with numbers, uppercase letters, and >= 5 characters, and <= 12 characters", () => {
  expect(validateUsername("xtran123")).toBe(true);
});
// test("returns true for password with numbers, uppercase and lowercase letters, and >= 8 characters ", () => {
//   expect(validateUsername("12512ASDasdfasd")).toBe(true)
// })
