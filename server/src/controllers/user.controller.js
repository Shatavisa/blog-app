const test = (req, res) => {
  try {
    res.send("Hello from test router");
  } catch (err) {
    console.log("err:", err);
  }
};

const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({ message: "signed out successfully" });
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
}
module.exports = { test, signOut }
