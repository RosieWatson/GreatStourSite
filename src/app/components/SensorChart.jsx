import React, {Component} from 'react'
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
  }

  getData(stationID) {
    axios.post('/api/govdata/fetch/avg30days', {
      stationID: stationID,
      date: '10/12/2018'
    }).then((result) => {
      const data = result.data
      // Split result into labels and data
      for (let i = 0; i < data.length; i++) {
        let reading = data[i];

        let newLabels = this.state.labels.concat(new Date(reading.date).formatDate());
        let newData = this.state.data.concat(reading.val)

        this.setState({
          labels: newLabels,
          data: newData
        })
      }

      console.log(this.state.data);
    });
  }

  render() {
    const {stationId} = this.props
    this.getData(stationId);

    return (
      <div id='sensor_charts'>
        <Line data={{
          labels: this.state.labels,
          datasets: [{
            label: "Last 30 Days",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: this.state.data,
          }]
        }}/>
      </div>
    )
  }
}

export default SensorChart
