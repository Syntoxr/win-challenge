const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const apiRoutes = require('./api');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
// Fix the static file serving path
app.use(express.static(path.join(__dirname, '../')));
app.use('/api', apiRoutes);

io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('toggleCheckbox', (data) => {
        // Broadcast to all other clients
        socket.broadcast.emit('checkboxUpdated', data);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});