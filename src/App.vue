<template>
	<div class="main-container">
		<div class="btn-container">
			<Button 
				label="Ingresar nuevos datos" 
				@click="$refs.newData.open(data)"
			/>
		</div>

		<LineCharts
			v-if="records && graphOptions.lineChart"
			:records="records"
			:options="options"
		/>

		<BarCharts
			v-if="records && graphOptions.pieChartLocal"
			:records="records"
			:options="options"
		/>

		<BarChartsVisitor
			v-if="records && graphOptions.pieChartVisitor"
			:records="records"
			:options="options"
		/>
			
	</div>

	<new-data 
		ref="newData"
		@save-records="saveRecords"
	/>
</template>

<script>
import newData from './components/modals/newData.vue';
import LineCharts from './components/graphs/LineCharts.vue';
import BarCharts from './components/graphs/BarCharts.vue';
import BarChartsVisitor from './components/graphs/BarChartsVisitor.vue';

export default {
	components: { newData, LineCharts, BarCharts, BarChartsVisitor },
	data() {
		return {
			records: null,
			options: null,
			graphOptions: null,
		};
	},
	methods: {
		saveRecords(data) {
			this.records = data.data;
			this.options = data.options;
			this.graphOptions = data.graphOptions;
		}
	},
};
</script>

<style lang="scss" scoped>
@import url('./assets/style.css');

.main-container {
	height: 100%;
	// background-color: var(--background);
	.btn-container {
		padding: 10px;
		display: flex;
		justify-content: end;
	}
	.bar-charts {
		border: 1px solid red;
		display: flex;
	}
}
</style>
