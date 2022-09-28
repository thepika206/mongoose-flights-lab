import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'



function newFlight(req,res){
  const newFlight = new Flight()
  //access the default date and convert to string as needed by the input
  const departs = newFlight.departs.toISOString().slice(0,16)
  res.render('flights/new', {
    title: 'Add Flight',
    departureDefault: departs,
  })
}

function create(req,res){
  // remove empty properties
	for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then(flight => {
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
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show',{
        title: 'Flight Details',
        flight: flight,
        meals: meals,
      })
    })
    .catch(error => {//if there's an error console.log it and redirect home
      console.log(error, "create error")
      res.redirect('/')
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
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
  Flight.findByIdAndUpdate(req.params.id, req.body, 
    {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
}

// delete flight, redirect to index route
function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect('/')
  })
}

function createTicket (req,res){
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(()=> {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {//if there's an error console.log it and redirect home
      console.log(error, "create error")
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect('/')
  })
}

function deleteTicket (req,res){
  Flight.findById(req.params.id)//find the parent document
  .then(flight=>{
    flight.tickets.id(req.params.ticketId).remove()//remove the child from the parent
    flight.save()
    .then(()=> {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {//if there's an error console.log it and redirect home
      console.log(error, "create error")
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect(`/flights`)
  })
}

//=================export======================

export{
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  deleteTicket,
}