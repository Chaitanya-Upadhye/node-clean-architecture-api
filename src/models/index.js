import mongoose from "mongoose";
import { v1 } from "uuid";
const { Schema } = mongoose;

const personSchema = {
  firstName: String,
  lastName: String,
  dob: Date,
  contactInfo: {
    phone: String,
    email: String,
  },
};

//TODO: Add Validations
const eventSchema = new Schema({
  _id: { type: String, default: () => v1() },
  name: String,
  type: String,
  description: String,
  subjectUsers: [
    {
      firstName: String,
      lastName: String,
      dob: Date,
      contactInfo: {
        phone: String,
        email: String,
      },
    },
  ],
  contactPersons: [
    {
      firstName: String,
      lastName: String,
      dob: Date,
      contactInfo: {
        phone: String,
        email: String,
      },
    },
  ],
  eventManagerId: String,
  date: Date,
  venueId: String,
});

const eventManagerSchema = {
  _id: { type: String, default: () => uuid.v1() },
  ...personSchema,
};

export default {
  eventModel: mongoose.model(
    "event",
    mongoose.Schema(eventSchema, { timestamps: true })
  ),
  eventManagerModel: mongoose.model(
    "eventManager",
    mongoose.Schema(eventManagerSchema, { timestamps: true })
  ),
};
