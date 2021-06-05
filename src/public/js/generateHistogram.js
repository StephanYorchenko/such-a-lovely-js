async function updateChart(chart, id){
	// eslint-disable-next-line no-undef
	const data = await sendRequest('getSurveyHistogramData', {id: id});
	chart.data.datasets.pop();
	chart.data.datasets.push({
		label: 'Количество голосов',
		data: data.dataset
	});
	chart.update('none');
}

async function generateHistogram(id) {
	const canvas = document.getElementById('histogramContainer');
	// eslint-disable-next-line no-undef
	const data = await sendRequest('getSurveyHistogramData', {id: id});
	// eslint-disable-next-line no-undef
	const barChart = new Chart(canvas, {
		type: 'bar',
		data: {
			labels: data.labels,
			datasets: [{
				label: 'Количество голосов',
				data: data.dataset
			}]
		}
	});
	setInterval(async () => await updateChart(barChart, id), 1000);
}

generateHistogram(window.location.pathname.slice(8));