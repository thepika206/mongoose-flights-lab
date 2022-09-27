import { Router } from 'express'

const router = Router()

//import the controller functions
import * as flightsCtrl from '../controllers/flights.js'

// GET flights/ render the index
router.get('/', flightsCtrl.index)

// GET flights/new   flight form
router.get('/new', flightsCtrl.new)

// GET flights/:id
router.get('/:id', flightsCtrl.show)

// GET flights/:id/edit
router.get('/:id/edit', flightsCtrl.edit)

// POST flights/
router.post('/', flightsCtrl.create)

// POST flights/:id/tickets
router.post('/:id/tickets', flightsCtrl.createTicket)

// DELETE flights/:id
router.delete('/:id', flightsCtrl.delete )

// DELETE flights/:id/tickets/:ticketId
router.delete('/:id/tickets/:ticketId', flightsCtrl.deleteTicket)

// PUT flight/:id override ?_method=PUT
router.put('/:id/', flightsCtrl.update)


export {
  router
}
