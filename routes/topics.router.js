const {
  createTopic,
  pinTopic,
  getTopicByUserId,
  getTopicByTopicId,
  getTopics,
  getTopicByCat,
  deleteTopic,
} = require('../controller/topic.controller');

const router = require('express').Router();
// const { checkToken } = require('../../auth/token_validation');

router.post('/create', createTopic);
// router.delete('/', deleteTopic);
// router.get('/id', getTopicByUserId);
// router.get('/:id', getTopicByTopicId);
router.get('/category/:cat', getTopicByCat);
router.get('/', getTopics);

module.exports = router;
