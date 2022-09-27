import { Router } from 'express'

const router = Router()

//import the controller functions
import * as mealsCtrl from '../controllers/meals.js'

//================routes===============================


// GET meals/new   input form
router.get('/new', mealsCtrl.new)












//======================== export =======================
export {
  router
}
