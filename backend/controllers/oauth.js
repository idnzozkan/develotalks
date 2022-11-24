const googleCallback = async (req, res) => {
  res.redirect(`${process.env.FRONTEND_BASE_PATH}/`)
}

const logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.sendStatus(200)
  })
}

const getMe = async (req, res) => {
  res.send(req.user)
}

module.exports = {
  googleCallback,
  logout,
  getMe,
}
