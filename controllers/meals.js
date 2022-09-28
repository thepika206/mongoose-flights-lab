import { Meal } from '../models/meal.js'

//================functions===============




function newMeal(req,res){
  Meal.find({})
  .then(meals => {
    console.log(meals, 'meals array')
    res.render('meals/new', {
      meals: meals,
      title: 'Add Meal'
    })
  })
}

function create(req,res){
  console.log(req.body)
  Meal.create(req.body)
  .then(meal => {
    res.redirect('/meals/new')
  })
  .catch(err => {
    res.redirect('/flights')
  })
}








  //================export =================

export{
  newMeal as new,
  create
}