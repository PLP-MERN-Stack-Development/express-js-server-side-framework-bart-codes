const auth = (req, res, next) => {
  const apiKey = req.header('Authorization')?.replace('Bearer ', '') || req.header('X-API-Key');
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: { message: 'Unauthorized: Invalid API key' } });
  }
  next();
};

module.exports = auth;