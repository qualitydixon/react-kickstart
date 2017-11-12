const path = require('path');
const express = require('express');

console.log('Starting server...');

var DIST_DIR = path.join(__dirname, '../dist'),
	PORT = 3000,
	app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

app.get('*', function(req, res) {
	res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}`)
);
