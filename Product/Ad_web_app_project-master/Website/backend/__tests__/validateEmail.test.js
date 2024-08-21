const validateEmail = require("../controllers/validateEmail");

test("returns false for empty email", () => {
  expect(validateEmail("")).toBe(false);
});
test("returns false for email without @", () => {
  expect(validateEmail("t100trxu.students.oamk.fi")).toBe(false);
});
test("returns false for email without students.oamk.fi", () => {
  expect(validateEmail("t1trxu00")).toBe(false);
});
test("returns false for email without t100trxu", () => {
  expect(validateEmail("@students.oulu.fi")).toBe(false);
});
test("returns false for email without .com or .student", () => {
  expect(validateEmail("t1trxu00@students")).toBe(false);
});
test("returns true for email with letters, numbers, @", () => {
  expect(validateEmail("t1trxu00@gmail.com")).toBe(true);
});
test("returns true for email with optinal .com, .uk , .fi.. ", () => {
  expect(validateEmail("t1trxu00@students.oamk.fi")).toBe(true);
});
test("returns false for too short email with unacceptable symbol _  ", () => {
  expect(validateEmail("1@_.com")).toBe(false);
});
