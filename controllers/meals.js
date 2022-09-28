import { Meal } from '../models/meal.js'

//================functions===============




function newMeal(req,res){
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      meals: meals,
      title: 'Add Meal'
    })
  })
}

function create(req,res){
  // console.log(req.body)
  Meal.create(req.body)
  .then(meal => {
    res.redirect('/meals/new')
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