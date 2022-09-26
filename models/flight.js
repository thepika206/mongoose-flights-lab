import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema({

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
    default: dateFromNow(365)
  },
},{
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)


//* =============Utility functions======================//
// provide a date that is #days from today
function dateFromNow(days){
  let result = new Date()
  result.setDate(result.getDate() + days)
  result = result.toISOString().slice(0,16) 
  return result
}



export {
  Flight
}