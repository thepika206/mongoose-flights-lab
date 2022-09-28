import { Router } from 'express'

const router = Router()

//import the controller functions
import * as mealsCtrl from '../controllers/meals.js'

//================routes===============================


// GET /meals/new   input form
router.get('/new', mealsCtrl.new)

// POST /meals

router.post ('/', mealsCtrl.create)











//======================== export =======================
export {
  router
}
