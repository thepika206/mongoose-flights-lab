import { Flight } from '../models/flight.js'


//* ============= Controller Functions ========================//

function newFlight(req,res){
  res.render('flights/new', {
    title: 'Add Flight',
    departureDefault: dateFromNow(365),
  })
}

function create(req,res){
  // remove empty properties
	for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
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

function createTicket (req,res){
  console.log('req.params.id', req.params.id)
  console.log('req.body', req.body)
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(()=> {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {//if there's an error console.log it and redirect home
    console.log(error, "create error")
    res.redirect('/')
  })
}

//* =============Utility functions======================//
// provide a date that is #days from today
function dateFromNow(days){
  let result = new Date()
  result.setDate(result.getDate() + days)
  result = result.toISOString().slice(0,16)
  return result
}




export{
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket
}