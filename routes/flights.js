import { Router } from 'express'

const router = Router()

//import the controller functions
import * as flightCtrl from '../controllers/flights.js'

// GET /flights/new   -new flight form
router.get('/new', flightCtrl.new)


export {
  router
}
