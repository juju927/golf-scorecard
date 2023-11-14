function userCanAlter(docUser, reqUser) {
  console.log(docUser.toString(), reqUser._id)
  return docUser.toString() === reqUser._id;
}

module.exports = userCanAlter;
