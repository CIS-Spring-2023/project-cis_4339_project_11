<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    chartData: {
      type: Array,
      default: () => [
        //Array of data to be tested on the chart
        { client: 'Client 1', zip: '10001' }, // format is for the client, by zip
        { client: 'Client 2', zip: '10001' },
        { client: 'Client 3', zip: '10002' }
      ]
    }
  },
  async mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor())
    const borderColor = backgroundColor.map((e) =>
      e.replace(/[\d\.]+\)$/g, '1)')
    )
    await new Chart(this.$refs.attendanceChart, {
      type: 'pie', // switched the type from bar to pie
      data: {
        datasets: [
          {
            borderWidth: 1,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: this.chartData.map((item) => item.zip)
          }
        ]
      },
      options: {
        // removed the x/y because pie charts to not need x and y
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    })
  },
  methods: {
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    }
  }
}
</script>
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>
