async function generateHistogram(id) {
	const canvas = document.getElementById('histogramContainer');
	// eslint-disable-next-line no-undef
	const data = await sendRequest('api', 'getSurveyHistogramData', {id: id});
	// eslint-disable-next-line no-undef, no-unused-vars
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
}

generateHistogram(window.location.pathname.slice(8));