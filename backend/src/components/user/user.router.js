const express = require('express');
const userRouter = express.Router();

userRouter.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`got id: ${userId}`);
});





module.exports = userRouter;
