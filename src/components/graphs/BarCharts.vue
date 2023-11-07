<template>
  <div>
    <div ref="echarts" style="width: 100%; height: 42vh;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
	props: {
		records: {
			type: Object,
			required: true
		},
		options: {
			type: Object,
			required: true
		},
	},
	data() {
		return {
			myChart: null,
			perTeamStats: {
				xAxis: [],
				legend: [],
				series: [],
				local: {},
				visitor: {}
			},
			stats: {
				points: 'PTS',
				p1converted: '1PCONV',
				p2converted: '2PCONV',
				p3converted: '3PCONV',
			}
		};
	},
	watch: {
		records() {
			// La función watch se ejecutará cuando miVariable cambie
			this.getPerTeamStats();
			this.renderChart();
		},
	},
	methods: {
		getPerTeamStats() {
			this.clearPerTeamStats();
			this.perTeamStats.xAxis = Object.values(this.stats);
			const teams = ['equipolocal', 'equipovisitante'];	
			
			for (const item of teams) {
				this.perTeamStats.legend.push(this.records.estadisticas[item]);
			}

			for (const local of this.records.estadisticas.estadisticasequipolocal) {
				if (local.nombre === 'TOTALES') {
					for (const item in this.options) {
						this.perTeamStats.local[item] = local[item];
					}
					// this.perTeamStats.local.assists = local.asistencias;
					// this.perTeamStats.local.points = local.puntos;
					// this.perTeamStats.local.p1converted = local.canasta1p;
					// this.perTeamStats.local.p2converted = local.canasta2p;
					// this.perTeamStats.local.p3converted = local.canasta3p;
				}
			}

			for (const visitor of this.records.estadisticas.estadisticasequipovisitante) {
				if (visitor.nombre === 'TOTALES') {
					for (const item in this.options) {
						this.perTeamStats.visitor[item] = visitor[item];
					}
					// this.perTeamStats.visitor.assists = visitor.asistencias;
					// this.perTeamStats.visitor.points = visitor.puntos;
					// this.perTeamStats.visitor.p1converted = visitor.canasta1p;
					// this.perTeamStats.visitor.p2converted = visitor.canasta2p;
					// this.perTeamStats.visitor.p3converted = visitor.canasta3p;
				}
			}

			this.perTeamStats.series = this.getSeries();

		},
		getSeries() {
			let series = [];

			for (const item in this.options) {
				let object = {
					value: this.perTeamStats.local[item], name: this.options[item]
				};

				series.push(object);
			}

			return series;
		},
		getData(team) {
			let stats = Object.keys(this.stats);
			let serie = [];

			for (const stat of stats) {
				serie.push(this.perTeamStats[team][stat]);
			}

			return serie;
		},
		clearPerTeamStats() {
			this.perTeamStats = {
				xAxis: [],
				legend: [],
				series: [],
				local: {
					assists: 0, 
					points: 0,
					p1converted: 0,
					p2converted: 0,
					p3converted: 0,
				},
				visitor: {
					assists: 0, 
					points: 0,
					p1converted: 0,
					p2converted: 0,
					p3converted: 0,
				}
			};
		},
		renderChart() {

			const myChart = echarts.init(this.$refs.echarts);

			myChart.setOption({
				title: {
					text: this.perTeamStats.legend[0],
					subtext: 'Estadísticas por equipo',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left'
				},
				// series: this.perTeamStats.series
				series: [
					{
						name: 'Est. por equipo',
						type: 'pie',
						radius: '50%',
						// data: [
						// 	{ value: 1048, name: 'Search Engine' },
						// 	{ value: 735, name: 'Direct' },
						// 	{ value: 580, name: 'Email' },
						// 	{ value: 484, name: 'Union Ads' },
						// 	{ value: 300, name: 'Video Ads' }
						// ],
						data: this.perTeamStats.series,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			});

		}
	},
	mounted() {
		// Configura un gráfico de ejemplo
		this.getPerTeamStats();
		this.renderChart();
	}
};
</script>
