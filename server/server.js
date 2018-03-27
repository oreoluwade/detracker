const server = require('./app');

const port = process.env.PORT || 8081;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
