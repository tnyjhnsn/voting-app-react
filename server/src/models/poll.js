const mongoose = require('mongoose')

const { Schema } = mongoose

const Poll = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  question: { type: String, required: true },
  answers: [
    {
      answer: { type: String },
      votes: { type: Number }
    }
  ]
}, {
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

class Virtuals {
  get totalVotes() {
    return this.answers.map(answer => answer.votes)
      .reduce((sum, value) => sum + value, 0)
  }
}

Poll.loadClass(Virtuals)

module.exports = mongoose.model('Poll', Poll)
