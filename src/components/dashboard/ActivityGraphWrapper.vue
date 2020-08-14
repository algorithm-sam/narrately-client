<template>
  <div >
    <activity-graph :chart-data="datacollection" class="graph" :options="options"></activity-graph>
    <div class="has-text-centered" style="margin-top: 3px">
      <a class="is-pulled-left" @click.prevent="previousYear"><i class="fas fa-arrow-left fa-2x has-text-grey"></i></a>
      <span class="subtitle" >{{ this.year }}</span>
      <a class="is-pulled-right" @click.prevent="nextYear"><i class="fas fa-arrow-right fa-2x has-text-grey"></i></a>
    </div>
  </div>
</template>

<script>
  import ActivityGraph from './ActivityGraph'
  // import { mapGetters} from 'vuex';

  export default {
  	name: 'activity-graph-wrapper',
    components: {
      ActivityGraph
    },
    props: ['data', 'title', 'color', 'backgroundColor'],
    data () {
      return {
        datacollection: null,
        options: {
        	responsive: true,
        	maintainAspectRatio: false,
        	scales: {
  			    yAxes: [{
  			      scaleLabel: {
  			        display: true,
  			        labelString: 'no of ' + this.title 
  			      }
  			    }],
  			    xAxes: [{
  			      scaleLabel: {
  			        display: true,
  			        labelString: 'months'
  			      }
  			    }]
  			  }    
        },
        year: (new Date()).getFullYear()
      }
    },
    mounted(){
    	this.fillData()
    },
    methods: {
      fillData () {
      	// const conversions =  this.$store.state.user.Conversions;
        const rawData = this.data || [];

      	let data = {};

      	for (let month = 0; month < 12; month++) {
          data[month] = rawData.filter(({createdAt}) => {
              let date = new Date(createdAt);
              return date.getFullYear() === this.year && date.getMonth() === month;
          });
        }

      	let graphData = Object.values(data).map(item => item.length)

        this.datacollection = {
          labels: ["1","2","3","4","5","6","7","8","9","10","11","12"],
          datasets: [
            {
              label: this.title,
              data: graphData,
              backgroundColor: this.backgroundColor,
              color: this.color,
            }
          ]
        }
      },
      nextYear () {
        this.year += 1;
        this.$emit('changedYear', this.year);
        this.fillData();
      },
      previousYear () {
        this.year -= 1;
        this.$emit('changedYear', this.year);
        this.fillData();
      }
    },
    watch:{
    	data(){
	    	this.fillData();
    	}
    }
  }
</script>

<style scoped>
	.graph {
		position: relative; 
		height: 322px;
	}
	@media screen and (min-width: 768px){
        .graph{
			height: 342px;
		}
    }
</style>