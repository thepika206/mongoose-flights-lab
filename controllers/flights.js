import { Flight } from '../models/flight.js'

function newFlight(req,res){
  res.render('flights/new', {
    title: 'Add Flight',
    departureDefault: dateFromNow(365),
    // departureDefault: '2023-12-25T01:55'
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
  .then(flights => { //the returned array sorted acend by date
    flights.sort((a,b) => {
      return a.departs - b.departs
    })
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

// provide a date that is #days from today
function dateFromNow(days){
  let result = new Date()
  result.setDate(result.getDate() + days)
  result = result.toISOString().slice(0,10) + 'T00:00' //default date 1 from now,time 12:00am
  return result
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