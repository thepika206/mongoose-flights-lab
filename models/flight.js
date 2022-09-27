import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0
  }
},{
  timestamps: true
})

	
const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest','United'],
    required: true,
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW','DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: oneYearFromNow()
  },
  tickets: [ticketSchema]
},{
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)


//* =============Utility functions======================//
// provide a date that is #days from today
function oneYearFromNow(){
  const dt = new Date()
  dt.setFullYear(dt.getFullYear()+1)
  return dt
}




export {
  Flight
}