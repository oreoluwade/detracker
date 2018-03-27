require("babel-core/register");
require("babel-polyfill");

import server from './app';

const port = process.env.PORT || 8081;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

