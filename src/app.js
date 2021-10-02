const express = require('express');
const app = express();
const cors = require('cors');

const resize = require('./routes/resize');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors({
    allowedHeaders: ["x-access-token", "Content-Type"],
    origin: "*",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    optionsSuccessStatus: 200
  }),
);

app.use('/resize', resize);

module.exports = app;