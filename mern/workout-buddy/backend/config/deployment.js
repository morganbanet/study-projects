const express = require('express');
const path = require('path');

const router = express.Router();

if (process.env.NODE_ENV === 'production') {
  router.use(express.static(path.join(__dirname, '..', '..', 'frontend/dist')));

  router.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', '..', 'frontend', 'dist', 'index.html')
    );
  });
} else {
  router.get('/', (req, res) => {
    res.send('API running...');
  });
}

module.exports = router;
