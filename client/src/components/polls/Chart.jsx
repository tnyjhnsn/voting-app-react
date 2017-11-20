import React from 'react'
import { Row, Col } from 'reactstrap'
import { Chart } from 'react-google-charts'

export default class PollChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        backgroundColor: '#f3f3f3',
        chartArea: { width: '96%', height: '96%' },
        legend: 'none',
        colors: ['#6740b4', '#2c98f0', '#f05830', '#febf2e', '#50ad55'],
        pieHole: 0.3
      },
      columns: [
        { type: 'string' },
        { type: 'number' }
      ],
      rows: []
    }
  }

  componentWillMount() {
    if (this.props.poll.totalVotes) {
      this.setState({
        rows: this.props.poll.answers.map(answer => {
          return [answer.answer, answer.votes]
        })
      })
    }
  }

  render() {
    if (!this.props.poll.totalVotes) {
      return null
    }
    return (
      <Row className="justify-content-center mt-2">
        <Col xs="12" sm="10" md="8" xl="5">
          <Chart
            chartType="PieChart"
            columns={this.state.columns}
            graph_id="PieChart"
            options={this.state.options}
            rows={this.state.rows}
            height="300px"
            width="100%"
          />
        </Col>
      </Row>
    )
  }
}
