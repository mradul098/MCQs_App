// required packages
const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;


// path variables
const pathPUBLIC = path.join(__dirname,`/public`);


// middlewares
app.use(express.static(pathPUBLIC));
app.use(express.json({ limit: '5mb' }));


app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})