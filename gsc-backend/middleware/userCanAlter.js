function userCanAlter(document, user) {
  return document.user.toString() === user._id;
}

module.exports = userCanAlter;
