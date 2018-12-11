import React, {Component} from 'react'
import moment from 'moment'
import axios from 'axios'
import {Line} from 'react-chartjs-2'

Date.prototype.formatDate = function () {
  return (this.getMonth() + 1) +
    "/" + this.getDate() +
    "/" + this.getFullYear();
}

class SensorChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [],
      data: []
    }

    const {stationId} = this.props

    this.getData(stationId)
  }

  getData(stationID) {
    const mDate = moment().toDate()
    axios.post('/api/govdata/fetch/last30days', {
      stationID: stationID,
      date: mDate
    }).then((result) => {
      const data = result.data.data
      // Split result into labels and data
      for (let i = 0; i < data.length; i++) {
        let reading = data[i];
        let newLabels = this.state.labels.slice().concat(new Date(reading.date).formatDate());
        let newData = this.state.data.concat(reading.val)

        this.setState({
          labels: newLabels,
          data: newData
        })
      }
    });
  }

  render() {
    return (
      <div id='sensor_charts'>
        <Line data={{
          labels: this.state.labels,
          datasets: [{
            label: "Water Level",
            backgroundColor: 'rgb(33, 132, 224)',
            borderColor: 'rgb(33, 132, 224)',
            data: this.state.data,
          }]
        }}
        options={{
          title: {
            display: true,
            text: 'Water Level - last 30 days',
            fontSize: 16
          },
          scales: {
            Axes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Water level (m)'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }]
          }
        }}

        />
      </div>
    )
  }
}

export default SensorChart
