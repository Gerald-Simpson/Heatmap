/** @format */

let dataSource =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

fetch(dataSource)
	.then((data) => data.json())
	.then((jsonData) => {
		const padding = 55;
		const bottomPadding = 150;
		const w = 1500;
		const h = 600;
		let YEARS = [
			...new Set(
				jsonData.monthlyVariance.map(function (d) {
					return d.year;
				})
			),
		];
		const MONTHS = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const monthKey = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December",
		};

		const svg = d3
			.select("#chart")
			.append("svg")
			.attr("width", padding + w + padding)
			.attr("height", padding + h + bottomPadding);

		const xScale = d3
			.scaleBand()
			.domain(
				jsonData.monthlyVariance.map(function (d) {
					return d.year;
				})
			)
			.range([padding, w + padding]);

		const yScale = d3
			.scaleBand()
			.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
			.range([padding, h + padding]);

		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale);

		svg
			.append("g")
			.attr("id", "x-axis")
			.attr("transform", "translate(0, " + (h - padding) + ")")
			.call(xAxis);

		svg
			.append("g")
			.attr("id", "y-axis")
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis);

		const rect = svg
			.selectAll("rect")
			.data(jsonData.monthlyVariance)
			.enter()
			.append("rect")
			.attr("x", (d, i) => {
				xScale(d.year);
			})
			.attr("y", (d, i) => {
				yScale(d.month);
			})
			.attr("width", xScale.bandwidth())
			.attr("height", yScale.bandwidth());
	});
