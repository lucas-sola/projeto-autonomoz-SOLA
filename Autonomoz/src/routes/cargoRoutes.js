const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');

router.get('/', cargoController.getAll.bind(cargoController));
router.get('/:id', cargoController.getById.bind(cargoController));
router.post('/', cargoController.create.bind(cargoController));
router.patch('/:id', cargoController.update.bind(cargoController));
router.delete('/:id', cargoController.delete.bind(cargoController));

module.exports = router;