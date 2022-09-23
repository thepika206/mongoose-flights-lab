import { Flight } from '../models/flight.js'

function newFlight(req,res){
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req,res){
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect('/flights/new')
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect('/')
  })
}


export{
  newFlight as new,
  create,
}