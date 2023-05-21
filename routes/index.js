const { Router } = require("express");
const router = Router();

router.use("/login", require('./login'));
router.use("/items", require('./items'));
router.use("/orders", require('./orders'));

// Error handling middleware here
router.use((err, req, res, next) => {
    // if (err.name === 'CastError') {
    //   return res.status(400).json({ error: 'Invalid note id' });
    // }    

    console.log("err is: " + err);
    console.log("err.stack is: " + err.stack);

    res.status(500).json({ message: err.message });    
  });

module.exports = router;