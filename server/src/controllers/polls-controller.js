const Poll = require('../models/poll')

module.exports = {

  async createPoll(req, res) {
    await Poll.create(req.body, (error) => {
      if (error) {
        return res.status(400).send('Cannot create poll')
      }
      return res.status(200).send('OK')
    })
  },

  async getAll(req, res) {
    await Poll.find({}, (error, polls) => {
      if (error) {
        return res.status(500).send('Cannot retrieve all polls')
      }
      return res.status(200).send({
        polls
      })
    })
  },

  async getMine(req, res) {
    await Poll.find({ owner: req.params.userId }, (error, polls) => {
      if (error) {
        return res.status(500).send('Cannot retrieve user polls')
      }
      return res.status(200).send({
        polls
      })
    })
  },

  async getPoll(req, res) {
    await Poll.findById(req.params.pollId, (error, poll) => {
      if (error) {
        return res.status(500).send('Cannot retrieve poll')
      }
      return res.status(200).send({
        poll
      })
    })
  },

  async incrementVote(req, res) {
    await Poll.findOneAndUpdate(
      { 'answers._id': req.params.answerId },
      { $inc: { 'answers.$.votes': 1 } }, (error, poll) => {
        if (error) {
          return res.status(500).send('Cannot increment vote')
        }
        return res.status(200).send({
          poll
        })
      }
    )
  },

  async updatePoll(req, res) {
    await Poll.findOneAndUpdate(
      /* eslint-disable no-underscore-dangle */
      { _id: req.body._id },
      req.body,
      { new: true, upsert: true, setDefaultsOnInsert: true }, (error, poll) => {
        if (error) {
          return res.status(500).send('Cannot update poll')
        }
        return res.status(200).send({
          poll
        })
      }
    )
  },

  async deletePoll(req, res) {
    await Poll.findByIdAndRemove(req.params.pollId, (error) => {
      if (error) {
        return res.status(500).send('Cannot delete poll')
      }
      return res.status(200).send('OK')
    })
  }
}
