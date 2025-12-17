const Log = require("../models/LOG.JS");

module.exports = (action) => {
  return async (req, res, next) => {
    await Log.create({
      action,
      user: req.user?.id || null
    });
    next();
  };
};
