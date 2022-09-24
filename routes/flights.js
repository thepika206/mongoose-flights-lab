import { Router } from 'express'

const router = Router()

//import the controller functions
import * as flightsCtrl from '../controllers/flights.js'

// GET flights/ render the index
router.get('/', flightsCtrl.index)

// GET flights/new   flight form
router.get('/new', flightsCtrl.new)

// POST flights .create a new flight from form
router.post('/', flightsCtrl.create)

// POST flights/:id override ?_method=DELETE
router.post('/:id', flightsCtrl.delete )

export {
  router
}
