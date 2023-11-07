<template>
	<Dialog
		v-model:visible="display"
		icon="pi pi-refresh"
		:style="{ width: '50%' }"
		class="flex justify-content-center card-detalle"
		:draggable="false"
		header="Panel de control de datos"
    >
		<div class="text-area">
			<span class="p-float-label">
				<Textarea 
					v-model="records" 
					rows="5" 
					cols="60"
				/>
				<label>Ingrese los datos</label>
			</span>
		</div>

		<div class="graph-option">
			<div class="options">
				<h3>Gráficos</h3>
				<div 
					v-for="category of graphOptions.options" 
					:key="category.key" 
					class="graph-options"
				>
					<Checkbox 
						v-model="selectedGraphOptions" 
						:inputId="category.key" 
						name="category" 
						:value="[category]" 
					/>
					<label 
						:for="category.key"
						class="graph-options-label"
					>
						{{ category.name }}
					</label>
				</div>
			</div>
			<div class="options">
				<h3>Parámetros</h3>
				<div 
					v-for="category of barChartsByTeam.options" 
					:key="category.key" 
					class="graph-options"
				>
					<Checkbox 
						v-model="selectedCategories" 
						:inputId="category.key" 
						name="category" 
						:value="[category]" 
					/>
					<label 
						:for="category.key"
						class="graph-options-label"
					>
						{{ category.name }}
					</label>
				</div>
			</div>
        </div>

		<div class="submit-btn">
			<Button 
				label="Generar gráficos" 
				@click="saveRecords()"
				:disabled="disabledSaveButton"
			/>
		</div>
	</Dialog>
</template>

<script>
export default {
	data() {
		return {
			display: false,
			records: null,
			barChartsByTeamValue: false,
			selectedCategories: [],
			selectedGraphOptions: [],
			barChartsByTeam: {
				title: 'Opciones',
				options: [
					{name: 'Puntos', key: 'puntos'},
					{name: 'Conv. 1P', key: 'canasta1p'},
					{name: 'Inten. 1P', key: 'tiro1p'},
					{name: 'Conv. 2P', key: 'canasta2p'},
					{name: 'Inten. 2P', key: 'tiro2p'},
					{name: 'Conv. 3P', key: 'canasta3p'},
					{name: 'Inten. 3P', key: 'tiro3p'},
					{name: 'Asist.', key: 'asistencias'},
					{name: 'Pérd.', key: 'perdidas'},
					{name: 'Rec.', key: 'recuperaciones'},
					{name: 'Faltas com.', key: 'faltascometidas'},
					{name: 'Faltas rec.', key: 'faltasrecibidas'},
				]
			},
			graphOptions: {
				title: 'Opciones',
				options: [
					{name: 'Gráfico de líneas', key: 'lineChart'},
					{name: 'Gráfico de torta - Local', key: 'pieChartLocal'},
					{name: 'Gráfico de torta - Visitante', key: 'pieChartVisitor'},
				]
			}
				
		};
	},
	computed: {
		disabledSaveButton() {
			return this.records === null || this.records === '' || this.selectedCategories.length === 0 || this.selectedGraphOptions.length === 0 ? true : false;
		}
	},
	methods: {
		open() {
			this.display = true;
		},
		saveRecords() {
			let data = {};
			data.data = JSON.parse(this.records);
			let options = [];
			for (const category of this.selectedCategories) {
				options.push(category[0]);
			}

			const keyValueObject = options.reduce((acc, item) => {
				acc[item.key] = item.name;
				return acc;
			}, {});

			data.options = keyValueObject;



			let graphOptions = [];
			for (const category of this.selectedGraphOptions) {
				graphOptions.push(category[0]);
			}

			const arrayGraphOptions = graphOptions.reduce((acc, item) => {
				acc[item.key] = item.name;
				return acc;
			}, {});

			data.graphOptions = arrayGraphOptions;

			console.log('data');
			console.log(data);

			this.$emit('saveRecords', data);
			this.display = false;
		},
		changeBarChartsByTeamValue() {
			if (this.barChartsByTeamValue) {
				for (const item of this.barChartsByTeam.options) {
					item.disabled = false;
				}
			} else {
				this.selectedCategories = [];
				for (const item of this.barChartsByTeam.options) {
					item.disabled = true;
				}
			}
		}
	},
};
</script>

<style lang="scss" scoped>
.text-area {
	padding-top: 20px;
	display: flex;
	justify-content: center;	
}
.submit-btn {
	margin-top: 20px;
	display: flex;
	justify-content: end;	
}
.graph-option {
	border: 1px solid #ebebeb;
	display: flex;
	margin: auto;
	.options-graph {
		border: 1px solid red;
		margin: auto;
	}
	.options {
		margin: auto;
		.main-graph-option {
			margin: 5px 0px 0px 5px;
			.graph-options-label {
				margin-left: 5px;
			}
		}
		.graph-options {
			margin: 5px 0px 5px 25px;
			.graph-options-label {
				margin-left: 5px;
			}
		}
	}
}
</style>