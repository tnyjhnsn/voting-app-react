const PollsController = require('./controllers/polls-controller')

module.exports = (app) => {
  app.get(
    '/polls',
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
    '/poll',
    PollsController.createPoll
  )

  app.delete(
    '/poll/:pollId',
    PollsController.deletePoll
  )

  app.put(
    '/poll',
    PollsController.updatePoll
  )

  app.put(
    '/poll/:answerId',
    PollsController.incrementVote
  )
}
