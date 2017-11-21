const PollsController = require('./controllers/polls-controller')

module.exports = (app) => {
  app.get(
    '/api/polls',
    PollsController.getPolls
  )

  // NOT USED
  //
  // app.get(
  //   '/polls/:userId',
  //   PollsController.getMine
  // )
  //
  // app.get(
  //   '/poll/:pollId',
  //   PollsController.getPoll
  // )

  app.post(
    '/api/poll',
    PollsController.createPoll
  )

  app.delete(
    '/api/poll/:pollId',
    PollsController.deletePoll
  )

  app.put(
    '/api/poll',
    PollsController.updatePoll
  )

  app.put(
    '/api/poll/:answerId',
    PollsController.incrementVote
  )
}
