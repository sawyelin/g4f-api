function handleHealthCheck(req, res) {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}

module.exports = { handleHealthCheck };

