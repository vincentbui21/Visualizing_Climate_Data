function validateEmail(email) {
  let validEmail =
    /^([a-zA-Z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,9})(\.[a-z]{2,9})?$/g.test(email);
  return validEmail;
}
module.exports = validateEmail;
