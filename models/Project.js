const mongoose = require('mongoose')

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  industry: { type: String, required: true },
  category: { type: String, required: true },
  mainImage: { type: String, required: true },
  techStack: { type: [String], default: [] },
  implementation: { type: String, required: true },
  results: { type: [String], default: [] },
  carouselImages: { type: [String], default: [] },
  carouselVideos: {
    type: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ['youtube'], required: true },
      },
    ],
    default: [],
  },
  githubLink: { type: String },
})

module.exports = mongoose.model('Project', projectSchema)
