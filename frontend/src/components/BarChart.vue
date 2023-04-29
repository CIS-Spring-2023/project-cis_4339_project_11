<script>
//Done using the code I used for the PieChart in addition to chatGPT advice
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
    // Watch for changes to chartData and re-render the chart
    chartData() {
      this.renderChart()
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
      this.chart = new Chart(this.$refs.OtherChart, {
        // new chart that replaces old one
        type: 'bar',
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
          scales: {
            y: {
              ticks: {
                stepSize: 1
              }
            },
            x: {
              gridLines: {
                display: false
              }
            }
          },
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
    <canvas class="p-10" ref="OtherChart"></canvas>
  </div>
</template>
