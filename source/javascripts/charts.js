function load_chart(id, target) {
	if(!id.match(/^#/)) {
		id = '#' + id;
	}
	if(target === undefined) {
		target = id;
	}
	var data_calls = [
		's280',
		's280-minus-supertweeters',
		's411',
		's508',
		's508-minus-supertweeters'
	]
	Promise.all(_.map(data_calls,function(x){return jitp_data(x);})).then(function(data) {
		_.each(data, function(v, i){
			if(!window.DataRepository.has(data_calls[i])) {
				try {
					window.DataRepository.set(data_calls[i],JSON.parse(v));
				} catch(err) {
					window.DataRepository.set(data_calls[i],v);
				}
			}
		});
		var s280 = window.DataRepository.get('s280'),
			s280_wo_st = window.DataRepository.get('s280-minus-supertweeters'),
			s411 = window.DataRepository.get('s411'),
			s508 = window.DataRepository.get('s508'),
			s508_wo_st = window.DataRepository.get('s508-minus-supertweeters');
			var charts = {
				'#figure1': {
					'chart_var': nv.models.discreteBarChart()
									.x(function(d) { return d.label })
									.y(function(d) { return d.value })
									.staggerLabels(true)
									.showValues(true),
					'data': [{
										key: 'Expected v. Actual',
										values: [
											{
												label: 'Expected #s280 (Women)',
												value: (s280['presenters']['female'] / (s280['presenters']['female'] + s280['presenters']['male'] )) * (s280['female_tweeter']['female_presenter_named'] + s280['male_tweeter']['female_presenter_named'] + s280['female_tweeter']['male_presenter_named'] + s280['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s280 (Women)',
												value: s280['female_tweeter']['female_presenter_named'] + s280['male_tweeter']['female_presenter_named']
											},
											{
												label: 'Expected #s280 (Men)',
												value: (s280['presenters']['male'] / (s280['presenters']['female'] + s280['presenters']['male'] )) * (s280['female_tweeter']['female_presenter_named'] + s280['male_tweeter']['female_presenter_named'] + s280['female_tweeter']['male_presenter_named'] + s280['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s280 (Men)',
												value: s280['female_tweeter']['male_presenter_named'] + s280['male_tweeter']['male_presenter_named']
											},
											{
												label: 'Expected #s411 (Women)',
												value: (s411['presenters']['female'] / (s411['presenters']['female'] + s411['presenters']['male'] )) * (s411['female_tweeter']['female_presenter_named'] + s411['male_tweeter']['female_presenter_named'] + s411['female_tweeter']['male_presenter_named'] + s411['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s411 (Women)',
												value: s411['female_tweeter']['female_presenter_named'] + s411['male_tweeter']['female_presenter_named']
											},
											{
												label: 'Expected #s411 (Men)',
												value: (s411['presenters']['male'] / (s411['presenters']['female'] + s411['presenters']['male'] )) * (s411['female_tweeter']['female_presenter_named'] + s411['male_tweeter']['female_presenter_named'] + s411['female_tweeter']['male_presenter_named'] + s411['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s411 (Men)',
												value: s411['female_tweeter']['male_presenter_named'] + s411['male_tweeter']['male_presenter_named']
											},
											{
												label: 'Expected #s508 (Women)',
												value: (s508['presenters']['female'] / (s508['presenters']['female'] + s508['presenters']['male'] )) * (s508['female_tweeter']['female_presenter_named'] + s508['male_tweeter']['female_presenter_named'] + s508['female_tweeter']['male_presenter_named'] + s508['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s508 (Women)',
												value: s508['female_tweeter']['female_presenter_named'] + s508['male_tweeter']['female_presenter_named']
											},
											{
												label: 'Expected #s508 (Men)',
												value: (s508['presenters']['male'] / (s508['presenters']['female'] + s508['presenters']['male'] )) * (s508['female_tweeter']['female_presenter_named'] + s508['male_tweeter']['female_presenter_named'] + s508['female_tweeter']['male_presenter_named'] + s508['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s508 (Men)',
												value: s508['female_tweeter']['male_presenter_named'] + s508['male_tweeter']['male_presenter_named']
											}
									
										]
									}]
				},
				'#figure2': {
					'chart_var': nv.models.discreteBarChart()
									.x(function(d) { return d.label })
									.y(function(d) { return d.value })
									.staggerLabels(true)
									.showValues(true),
					'data': [{
										key: 'Expected v. Actual',
										values: [
											{
												label: 'Expected #s280 (Women)',
												value: (s280_wo_st['presenters']['female'] / (s280_wo_st['presenters']['female'] + s280_wo_st['presenters']['male'] )) * (s280_wo_st['female_tweeter']['female_presenter_named'] + s280_wo_st['male_tweeter']['female_presenter_named'] + s280_wo_st['female_tweeter']['male_presenter_named'] + s280_wo_st['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s280 (Women)',
												value: s280_wo_st['female_tweeter']['female_presenter_named'] + s280_wo_st['male_tweeter']['female_presenter_named']
											},
											{
												label: 'Expected #s280 (Men)',
												value: (s280_wo_st['presenters']['male'] / (s280_wo_st['presenters']['female'] + s280_wo_st['presenters']['male'] )) * (s280_wo_st['female_tweeter']['female_presenter_named'] + s280_wo_st['male_tweeter']['female_presenter_named'] + s280_wo_st['female_tweeter']['male_presenter_named'] + s280_wo_st['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s280 (Men)',
												value: s280_wo_st['female_tweeter']['male_presenter_named'] + s280_wo_st['male_tweeter']['male_presenter_named']
											},
											{
												label: 'Expected #s411 (Women)',
												value: (s411['presenters']['female'] / (s411['presenters']['female'] + s411['presenters']['male'] )) * (s411['female_tweeter']['female_presenter_named'] + s411['male_tweeter']['female_presenter_named'] + s411['female_tweeter']['male_presenter_named'] + s411['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s411 (Women)',
												value: s411['female_tweeter']['female_presenter_named'] + s411['male_tweeter']['female_presenter_named']
											},
											{
												label: 'Expected #s411 (Men)',
												value: (s411['presenters']['male'] / (s411['presenters']['female'] + s411['presenters']['male'] )) * (s411['female_tweeter']['female_presenter_named'] + s411['male_tweeter']['female_presenter_named'] + s411['female_tweeter']['male_presenter_named'] + s411['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s411 (Men)',
												value: s411['female_tweeter']['male_presenter_named'] + s411['male_tweeter']['male_presenter_named']
											},
											{
												label: 'Expected #s508 (Women)',
												value: (s508_wo_st['presenters']['female'] / (s508_wo_st['presenters']['female'] + s508_wo_st['presenters']['male'] )) * (s508_wo_st['female_tweeter']['female_presenter_named'] + s508_wo_st['male_tweeter']['female_presenter_named'] + s508_wo_st['female_tweeter']['male_presenter_named'] + s508_wo_st['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s508 (Women)',
												value: s508_wo_st['female_tweeter']['female_presenter_named'] + s508_wo_st['male_tweeter']['female_presenter_named']
											},
											{
												label: 'Expected #s508 (Men)',
												value: (s508_wo_st['presenters']['male'] / (s508_wo_st['presenters']['female'] + s508_wo_st['presenters']['male'] )) * (s508_wo_st['female_tweeter']['female_presenter_named'] + s508_wo_st['male_tweeter']['female_presenter_named'] + s508_wo_st['female_tweeter']['male_presenter_named'] + s508_wo_st['male_tweeter']['male_presenter_named'])
											},
											{
												label: 'Actual #s508 (Men)',
												value: s508_wo_st['female_tweeter']['male_presenter_named'] + s508_wo_st['male_tweeter']['male_presenter_named']
											}
									
										]
									}]
				},
				'#figure3': {
					'chart_var': nv.models.discreteBarChart()
									.x(function(d) { return d.label })		//Specify the data accessors.
									.y(function(d) { return d.value })
									.staggerLabels(true)		//Too many bars and not enough room? Try staggering labels.
									.showValues(true),
					'data': [{
										key: 'Expected v. Actual',
										values: [
											{
												label: 'Women Mention Women',
												value: s280['female_tweeter']['female_non-presenter_named'] + s411['female_tweeter']['female_non-presenter_named'] + s508['female_tweeter']['female_non-presenter_named']
											},
											{
												label: 'Men Mention Men',
												value: s280['male_tweeter']['male_non-presenter_named'] + s411['male_tweeter']['male_non-presenter_named'] + s508['male_tweeter']['male_non-presenter_named']
											},
											{
												label: 'Women Mention Men',
												value: s280['female_tweeter']['male_non-presenter_named'] + s411['female_tweeter']['male_non-presenter_named'] + s508['female_tweeter']['male_non-presenter_named']
											},
											{
												label: 'Men Mention Women',
												value: s280['male_tweeter']['female_non-presenter_named'] + s411['male_tweeter']['female_non-presenter_named'] + s508['male_tweeter']['female_non-presenter_named']
											},
									
										]
									}]
				},
				'#figure4': {
					'chart_var': nv.models.discreteBarChart()
									.x(function(d) { return d.label })		//Specify the data accessors.
									.y(function(d) { return d.value })
									.staggerLabels(true)		//Too many bars and not enough room? Try staggering labels.
									.showValues(true),
					'data': [{
										key: 'Expected v. Actual',
										values: [
											{
												label: 'Women Mention Women',
												value: s280_wo_st['female_tweeter']['female_non-presenter_named'] + s411['female_tweeter']['female_non-presenter_named'] + s508_wo_st['female_tweeter']['female_non-presenter_named']
											},
											{
												label: 'Men Mention Men',
												value: s280_wo_st['male_tweeter']['male_non-presenter_named'] + s411['male_tweeter']['male_non-presenter_named'] + s508_wo_st['male_tweeter']['male_non-presenter_named']
											},
											{
												label: 'Women Mention Men',
												value: s280_wo_st['female_tweeter']['male_non-presenter_named'] + s411['female_tweeter']['male_non-presenter_named'] + s508_wo_st['female_tweeter']['male_non-presenter_named']
											},
											{
												label: 'Men Mention Women',
												value: s280_wo_st['male_tweeter']['female_non-presenter_named'] + s411['male_tweeter']['female_non-presenter_named'] + s508_wo_st['male_tweeter']['female_non-presenter_named']
											},
									
										]
									}]
				},
				'#figure5': {
					'chart_var': nv.models.pieChart()
						        .x(function(d) { return d.label })
						        .y(function(d) { return d.value })
						        .showLabels(false),
					'data': [
									{
										label: 'Metacomment',
										value: s280['female_tweeter']['metacomment'] + s411['female_tweeter']['metacomment'] + s508['female_tweeter']['metacomment']
									},
									{
										label: 'Summary or Quotation',
										value: s280['female_tweeter']['summary_or_quotation'] + s411['female_tweeter']['summary_or_quotation'] + s508['female_tweeter']['summary_or_quotation']
									},
									{
										label: 'Citation',
										value: s280['female_tweeter']['citation'] + s411['female_tweeter']['citation'] + s508['female_tweeter']['citation']
									},
									{
										label: 'Response or Question',
										value: s280['female_tweeter']['response_or_question'] + s411['female_tweeter']['response_or_question'] + s508['female_tweeter']['response_or_question']
									},
									{
										label: 'Room Climate',
										value: s280['female_tweeter']['room_climate'] + s411['female_tweeter']['room_climate'] + s508['female_tweeter']['room_climate']
									}
								]
				},
				'#figure6': {
					'chart_var': nv.models.pieChart()
						        .x(function(d) { return d.label })
						        .y(function(d) { return d.value })
						        .showLabels(false),
					'data': [
									{
										label: 'Metacomment',
										value: s280_wo_st['female_tweeter']['metacomment'] + s411['female_tweeter']['metacomment'] + s508_wo_st['female_tweeter']['metacomment']
									},
									{
										label: 'Summary or Quotation',
										value: s280_wo_st['female_tweeter']['summary_or_quotation'] + s411['female_tweeter']['summary_or_quotation'] + s508_wo_st['female_tweeter']['summary_or_quotation']
									},
									{
										label: 'Citation',
										value: s280_wo_st['female_tweeter']['citation'] + s411['female_tweeter']['citation'] + s508_wo_st['female_tweeter']['citation']
									},
									{
										label: 'Response or Question',
										value: s280_wo_st['female_tweeter']['response_or_question'] + s411['female_tweeter']['response_or_question'] + s508_wo_st['female_tweeter']['response_or_question']
									},
									{
										label: 'Room Climate',
										value: s280_wo_st['female_tweeter']['room_climate'] + s411['female_tweeter']['room_climate'] + s508_wo_st['female_tweeter']['room_climate']
									}
								]
				},
				'#figure7': {
					'chart_var': nv.models.pieChart()
						        .x(function(d) { return d.label })
						        .y(function(d) { return d.value })
						        .showLabels(false),
					'data': [
									{
										label: 'Metacomment',
										value: s280['male_tweeter']['metacomment'] + s411['male_tweeter']['metacomment'] + s508['male_tweeter']['metacomment']
									},
									{
										label: 'Summary or Quotation',
										value: s280['male_tweeter']['summary_or_quotation'] + s411['male_tweeter']['summary_or_quotation'] + s508['male_tweeter']['summary_or_quotation']
									},
									{
										label: 'Citation',
										value: s280['male_tweeter']['citation'] + s411['male_tweeter']['citation'] + s508['male_tweeter']['citation']
									},
									{
										label: 'Response or Question',
										value: s280['male_tweeter']['response_or_question'] + s411['male_tweeter']['response_or_question'] + s508['male_tweeter']['response_or_question']
									},
									{
										label: 'Room Climate',
										value: s280['male_tweeter']['room_climate'] + s411['male_tweeter']['room_climate'] + s508['male_tweeter']['room_climate']
									}
								]
				},
				'#figure8': {
					'chart_var': nv.models.pieChart()
						        .x(function(d) { return d.label })
						        .y(function(d) { return d.value })
						        .showLabels(false),
					'data': [
									{
										label: 'Metacomment',
										value: s280_wo_st['male_tweeter']['metacomment'] + s411['male_tweeter']['metacomment'] + s508_wo_st['male_tweeter']['metacomment']
									},
									{
										label: 'Summary or Quotation',
										value: s280_wo_st['male_tweeter']['summary_or_quotation'] + s411['male_tweeter']['summary_or_quotation'] + s508_wo_st['male_tweeter']['summary_or_quotation']
									},
									{
										label: 'Citation',
										value: s280_wo_st['male_tweeter']['citation'] + s411['male_tweeter']['citation'] + s508_wo_st['male_tweeter']['citation']
									},
									{
										label: 'Response or Question',
										value: s280_wo_st['male_tweeter']['response_or_question'] + s411['male_tweeter']['response_or_question'] + s508_wo_st['male_tweeter']['response_or_question']
									},
									{
										label: 'Room Climate',
										value: s280_wo_st['male_tweeter']['room_climate'] + s411['male_tweeter']['room_climate'] + s508_wo_st['male_tweeter']['room_climate']
									}
								]
				},
				'#figure9': {
					'chart_var': nv.models.pieChart()
						        .x(function(d) { return d.label })
						        .y(function(d) { return d.value })
						        .showLabels(false),
					'data': [
									{
										label: 'Female Presenter',
										value: s280['female_tweeter']['female_presenter_named'] + s411['female_tweeter']['female_presenter_named'] + s508['female_tweeter']['female_presenter_named']
									},
									{
										label: 'Male Presenter',
										value: s280['female_tweeter']['male_presenter_named'] + s411['female_tweeter']['male_presenter_named'] + s508['female_tweeter']['male_presenter_named']
									},
									{
										label: 'Female Non-Presenter',
										value: s280['female_tweeter']['female_non-presenter_named'] + s411['female_tweeter']['female_non-presenter_named'] + s508['female_tweeter']['female_non-presenter_named']
									},
									{
										label: 'Male Non-Presenter',
										value: s280['female_tweeter']['male_non-presenter_named'] + s411['female_tweeter']['male_non-presenter_named'] + s508['female_tweeter']['male_non-presenter_named']
									},
									{
										label: 'No Person',
										value: s280['female_tweeter']['no_person_named'] + s411['female_tweeter']['no_person_named'] + s508['female_tweeter']['no_person_named']
									}
								]
				},
				'#figure10': {
					'chart_var': nv.models.pieChart()
						        .x(function(d) { return d.label })
						        .y(function(d) { return d.value })
						        .showLabels(false),
					'data': [
									{
										label: 'Female Presenter',
										value: s280_wo_st['female_tweeter']['female_presenter_named'] + s411['female_tweeter']['female_presenter_named'] + s508_wo_st['female_tweeter']['female_presenter_named']
									},
									{
										label: 'Male Presenter',
										value: s280_wo_st['female_tweeter']['male_presenter_named'] + s411['female_tweeter']['male_presenter_named'] + s508_wo_st['female_tweeter']['male_presenter_named']
									},
									{
										label: 'Female Non-Presenter',
										value: s280_wo_st['female_tweeter']['female_non-presenter_named'] + s411['female_tweeter']['female_non-presenter_named'] + s508_wo_st['female_tweeter']['female_non-presenter_named']
									},
									{
										label: 'Male Non-Presenter',
										value: s280_wo_st['female_tweeter']['male_non-presenter_named'] + s411['female_tweeter']['male_non-presenter_named'] + s508_wo_st['female_tweeter']['male_non-presenter_named']
									},
									{
										label: 'No Person',
										value: s280_wo_st['female_tweeter']['no_person_named'] + s411['female_tweeter']['no_person_named'] + s508_wo_st['female_tweeter']['no_person_named']
									}
								]
				},
				'#figure11': {
					'chart_var': nv.models.pieChart()
						        .x(function(d) { return d.label })
						        .y(function(d) { return d.value })
						        .showLabels(false),
					'data': [
									{
										label: 'Female Presenter',
										value: s280['male_tweeter']['female_presenter_named'] + s411['male_tweeter']['female_presenter_named'] + s508['male_tweeter']['female_presenter_named']
									},
									{
										label: 'Male Presenter',
										value: s280['male_tweeter']['male_presenter_named'] + s411['male_tweeter']['male_presenter_named'] + s508['male_tweeter']['male_presenter_named']
									},
									{
										label: 'Female Non-Presenter',
										value: s280['male_tweeter']['female_non-presenter_named'] + s411['male_tweeter']['female_non-presenter_named'] + s508['male_tweeter']['female_non-presenter_named']
									},
									{
										label: 'Male Non-Presenter',
										value: s280['male_tweeter']['male_non-presenter_named'] + s411['male_tweeter']['male_non-presenter_named'] + s508['male_tweeter']['male_non-presenter_named']
									},
									{
										label: 'No Person',
										value: s280['male_tweeter']['no_person_named'] + s411['male_tweeter']['no_person_named'] + s508['male_tweeter']['no_person_named']
									}
								]
				},
				'#figure12': {
					'chart_var': nv.models.pieChart()
						        .x(function(d) { return d.label })
						        .y(function(d) { return d.value })
						        .showLabels(false),
					'data': [
									{
										label: 'Female Presenter',
										value: s280_wo_st['male_tweeter']['female_presenter_named'] + s411['male_tweeter']['female_presenter_named'] + s508_wo_st['male_tweeter']['female_presenter_named']
									},
									{
										label: 'Male Presenter',
										value: s280_wo_st['male_tweeter']['male_presenter_named'] + s411['male_tweeter']['male_presenter_named'] + s508_wo_st['male_tweeter']['male_presenter_named']
									},
									{
										label: 'Female Non-Presenter',
										value: s280_wo_st['male_tweeter']['female_non-presenter_named'] + s411['male_tweeter']['female_non-presenter_named'] + s508_wo_st['male_tweeter']['female_non-presenter_named']
									},
									{
										label: 'Male Non-Presenter',
										value: s280_wo_st['male_tweeter']['male_non-presenter_named'] + s411['male_tweeter']['male_non-presenter_named'] + s508_wo_st['male_tweeter']['male_non-presenter_named']
									},
									{
										label: 'No Person',
										value: s280_wo_st['male_tweeter']['no_person_named'] + s411['male_tweeter']['no_person_named'] + s508_wo_st['male_tweeter']['no_person_named']
									}
								]
				}
			}
		nv.addGraph(function() {
			d3.select(target + ' svg').datum(charts[id]['data']).call(charts[id]['chart_var']);
			nv.utils.windowResize(charts[id]['chart_var']);
			return charts[id]['chart_var'];
		});
	});
}