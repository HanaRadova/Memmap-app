const express = require('express')

const PORT = 3000

const app = express();


app.get('/hello-world', (req, res) => {
    res.send('Im hungry');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});