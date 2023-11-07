<template>
	<div>
		<div ref="echarts" style="width: 97%; height: 42vh;"></div>
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
				asistencias: 'ASIST',
				puntos: 'PTS',
				canasta1p: '1PCONV',
				canasta2p: '2PCONV',
				canasta3p: '3PCONV',
			}
		};
	},
	watch: {
		records() {
			this.getPerTeamStats();
			this.renderChart();
		},
	},
	methods: {
		getPerTeamStats() {
			this.clearPerTeamStats();
			this.perTeamStats.xAxis = Object.values(this.options);
			const teams = ['equipolocal', 'equipovisitante'];	
			
			for (const item of teams) {
				this.perTeamStats.legend.push(this.records.estadisticas[item]);
			}

			for (const local of this.records.estadisticas.estadisticasequipolocal) {
				if (local.nombre === 'TOTALES') {
					for (const item in this.options) {
						this.perTeamStats.local[item] = local[item];
					}
				}
			}

			for (const visitor of this.records.estadisticas.estadisticasequipovisitante) {
				if (visitor.nombre === 'TOTALES') {
					for (const item in this.options) {
						this.perTeamStats.visitor[item] = visitor[item];
					}
				}
			}

			this.perTeamStats.series = this.getSeries();

		},
		getSeries() {
			let series = [];

			let serieLocal = {
				name: this.perTeamStats.legend[0],
				type: 'bar',
				data: this.getData('local')
			};

			series.push(serieLocal);

			let serieVisitor = {
				name: this.perTeamStats.legend[1],
				type: 'bar',
				data: this.getData('visitor')
			};

			series.push(serieVisitor);

			return series;
		},
		getData(team) {

			let stats = Object.keys(this.options);

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
				local: {},
				visitor: {}
			};
		},
		renderChart() {
			const myChart = echarts.init(this.$refs.echarts);

			myChart.setOption({
				title: {
					text: this.records.estadisticas.equipolocal + ' vs ' + this.records.estadisticas.equipovisitante,
					subtext: this.records.estadisticas.Competicion
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: this.perTeamStats.legend
				},
				toolbox: {
					show: true,
					feature: {
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ['line', 'bar'] },
						saveAsImage: { show: true }
					}
				},
				calculable: true,
				xAxis: [
					{
						type: 'category',
						data: this.perTeamStats.xAxis
					}
				],
				yAxis: [
					{
						type: 'value'
					}
				],
				series: this.perTeamStats.series
				// series: [
				// 	{
				// 		name: 'Rainfall',
				// 		type: 'bar',
				// 		data: [
				// 			2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
				// 		],
				// 		markPoint: {
				// 			data: [
				// 				{ type: 'max', name: 'Max' },
				// 				{ type: 'min', name: 'Min' }
				// 			]
				// 		},
				// 		markLine: {
				// 			data: [{ type: 'average', name: 'Avg' }]
				// 		}
				// 	},
				// 	{
				// 		name: 'Evaporation',
				// 		type: 'bar',
				// 		data: [
				// 			2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
				// 		],
				// 		markPoint: {
				// 			data: [
				// 				{ name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
				// 				{ name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
				// 			]
				// 		},
				// 		markLine: {
				// 			data: [{ type: 'average', name: 'Avg' }]
				// 		}
				// 	}
				// ]
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
