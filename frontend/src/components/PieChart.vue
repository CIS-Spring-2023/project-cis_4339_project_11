<script>
//removed unneccessary code with advice from chat gpt (x and y values) pie charts do not need
// done with Chatgpt help

import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  async mounted() {
    await this.renderChart()
  },
  watch: {
    // watches for any changes to the chart and updates it constantly so that it appears, coded with help from chatgpt
    chartData() {
      this.renderChart() //method the re render, coded with help from chatgpt
    }
  },
  methods: {
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    },
    async renderChart() {
      //updates the chart
      if (this.chart) {
        this.chart.destroy()
      }
      await this.$nextTick() // waits for data to change, re renders chart
      const backgroundColor = this.chartData.map(() => this.getColor())
      const borderColor = backgroundColor.map((e) =>
        e.replace(/[\d\.]+\)$/g, '1)')
      )
      this.chart = new Chart(this.$refs.AttendanceChart, {
        // new chart that replaces old one
        type: 'pie',
        data: {
          labels: this.label,
          datasets: [
            {
              borderWidth: 1,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              data: this.chartData
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          responsive: true,
          maintainAspectRatio: true
        }
      })
    }
  }
}
</script>

<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="AttendanceChart"></canvas>
  </div>
</template>
