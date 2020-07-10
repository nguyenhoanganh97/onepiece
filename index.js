var createError = require('http-errors');
const express = require('express');
const app = express();
const port = 3000

//routers
const crawlerRouter = require('./routers/crawler');
const characterRouter = require('./routers/characters')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/onepiece-crawler', crawlerRouter);
// app.use('/users', usersRouter);
app.use('/characters', characterRouter)
    // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
app.listen(port, () => console.log(`this app listening on port ${port}!`))