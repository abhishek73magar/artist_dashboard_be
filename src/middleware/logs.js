module.exports = (req, res, next) => {
  const method = req.method
  const url = req.url.split('?')[0]
  const date = new Date()
  console.log(method, '-', url, '-', date)
  if(Object.keys(req.query).length > 0) console.log(req.query)
  
  return next()
}
