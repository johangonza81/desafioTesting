const app = require('./index');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`SERVER ON at http://localhost:${PORT}`);
});

module.exports = server;