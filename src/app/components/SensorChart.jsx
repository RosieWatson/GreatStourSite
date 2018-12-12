import React, {Component} from 'react'
import axios from 'axios'
import {Line} from 'react-chartjs-2'
import { Table } from 'antd'

Date.prototype.formatDate = function () {
  return this.getDate() +
    "/" + (this.getMonth() + 1) +
    "/" + this.getFullYear();
}

const columns = [{
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
}, {
  title: 'River Height',
  dataIndex: 'val',
  key: 'val',
}]

class SensorChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [],
      data: [],
      fullData: []
    }

    const {stationId} = this.props

    this.getData(stationId)
  }

  getData(stationID) {
    const date = new Date()
    axios.post('api/govdata/fetch/last30days', {
      stationID: stationID,
      date: date
    }).then((result) => {
      const data = result.data.data
      // Split result into labels and data
      for (let i = 0; i < data.length; i++) {
        let reading = data[i];
        let newLabels = this.state.labels.concat(new Date(reading.date).formatDate());
        let newData = this.state.data.concat(reading.val)
        reading.date = new Date(reading.date).formatDate()

        this.setState({
          labels: newLabels,
          data: newData
        })
      }
      this.setState({
        fullData: data
      })
    })
  }

  render() {
    return (
      <div>
        { !this.props.tableView && <div id='sensor_charts'>
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
        </div> }
        { this.props.tableView && <Table dataSource={this.state.fullData} columns={columns} />}
      </div>
    )
  }
}

export default SensorChart
