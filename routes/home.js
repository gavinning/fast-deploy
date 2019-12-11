const router = require('koa-router')()
const Home = require('../resolver/home')

router.get('/', Home.home)
router.post('/deploy', Home.deploy)

module.exports = router
