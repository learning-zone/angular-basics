// ```
// base.js
// (c) 2015 David Newman
// david.r.niciforovic@gmail.com
// base.js may be freely distributed under the MIT license
// ```

// *base.js*

// This file contains the most basic functionality for server Socket.io
// functionality.

export default (io) => {

  io.sockets.on('connect', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', () => {

      console.log('a user disconnected');
    });
  });

};
