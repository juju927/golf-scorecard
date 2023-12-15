function userCanAlter(docUser, reqUser) {
  return docUser.toString() === reqUser._id;
}

module.exports = userCanAlter;
