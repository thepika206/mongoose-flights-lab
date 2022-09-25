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
    res.redirect('/flights')
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect('/')
  })
}

// finds Flights, renders the index page, passing Flights to it
function index(req,res){
  Flight.find({})
  .then(flights => { //the returned array
    res.render('flights/index', {
      title: "All Flights",
      flights: flights
    })
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect('/')
  })
}

function show(req,res){
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show',{
      title: 'Flight Details',
      flight: flight,
    })
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect('/')
  })
}

function edit(req,res){
  Flight.findById(req.params.id)
  .then(flight=>{
    res.render('flights/edit', {
      title: 'Edit Flight',
      flight: flight,
    })
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect('/')
  })
}

function update(req,res){
  console.log('update')
  Flight.findByIdAndUpdate(req.params.id, req.body, 
    {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
}

// delete flight, redirect to index route
function deleteFlight(req,res){
  console.log(req.params.id)
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect('/')
  })
}

export{
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update
}