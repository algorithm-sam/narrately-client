<script>
	import { Line, mixins } from 'vue-chartjs'
 
	export default {
		name: 'activity-graph',
		extends: Line,
		mixins: [mixins.reactiveProp],
		props: ['chartData', 'options'],
		mounted () {
		    this.renderChart(this.chartData, this.options)
		}
	}
</script>