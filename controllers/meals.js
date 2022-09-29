import { Meal } from '../models/meal.js'

//================functions===============

function newMeal(req,res){
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      meals: meals,
      title: 'Add Meal',
      mealMessage: ''
    })
  })
}

//! Bonus challenge display an error to the user if they enter a meal that exists
function create(req,res){
  Meal.findOne({ name: req.body.name})
  .then(meal => {
    if (meal) {
      Meal.find({})
      .then(meals => {
        res.render('meals/new', {
          meals: meals,
          title: 'Add Meal',
          mealMessage: `Error: ${meal.name} already exists, enter a different meal.`
        })
      })
    } else {
      Meal.create(req.body)
      .then(meal => {
        res.redirect('/meals/new')
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/meals/new')
  })
}








  //================export =================

export{
  newMeal as new,
  create
}