function validateUsername(username) {
  let validUsername = /^[a-zA-Z\d]{5,12}$/g.test(username); // username should be 5-12 characters long and contain letters and numbers
  return validUsername;
}
module.exports = validateUsername;
