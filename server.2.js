const express = require('express');

const app = express();

/// Body parser
app.use(express.json());

/// Routes
app.use('/', (req, res) => {
  res.send('HELLO');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
