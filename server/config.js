module.exports = {
  mongoURI: process.env.MONGODB,
  options: {
    useNewurlPraser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  secretOrKey: process.env.SECRET_OR_KEY,
};
