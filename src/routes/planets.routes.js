const router = require('express').Router();
const { planetsController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { planets },
} = require('../validations');  

router.get('/', validate(planets.list), planetsController.list);
router.get('/:id([0-9a-f]{24})', validate(planets.get), planetsController.get);
router.get('/:name([a-zA-Z\s]*$)', validate(planets.getByName), planetsController.getByName);
router.post('/', validate(planets.create), planetsController.create);
router.put('/:id', validate(planets.update), planetsController.update);
router.delete('/:id', validate(planets.destroy), planetsController.destroy);

module.exports.planets = router;
