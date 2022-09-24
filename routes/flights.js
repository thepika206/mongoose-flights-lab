import { Router } from 'express'

const router = Router()

//import the controller functions
import * as flightsCtrl from '../controllers/flights.js'

// GET /flight render the index
router.get('/', flightsCtrl.index)

// GET /flights/new   -new flight form
router.get('/new', flightsCtrl.new)

// POST /flights .create a new flight
router.post('/', flightsCtrl.create)


export {
  router
}
