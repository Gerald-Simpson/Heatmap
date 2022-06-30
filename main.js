/** @format */

let dataSource =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

fetch(dataSource)
	.then((data) => data.json())
	.then((jsonData) => {
		const padding = 90;
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
		let yearTicks = YEARS.filter((x) => x % 10 === 0);
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
		].reverse();

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

		let testColors = [
			"#a50026",
			"#d73027",
			"#f46d43",
			"#fdae61",
			"#fee090",
			"#ffffbf",
			"#e0f3f8",
			"#abd9e9",
			"#74add1",
			"#4575b4",
			"#313695",
		];

		const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		let COLOR = d3.scaleOrdinal().domain(keys).range(testColors.reverse());

		colorPicker = function (num) {
			if (num < 2.8) {
				return 1;
			} else if (num < 3.9) {
				return 2;
			} else if (num < 5) {
				return 3;
			} else if (num < 6.1) {
				return 4;
			} else if (num < 7.2) {
				return 5;
			} else if (num < 8.3) {
				return 6;
			} else if (num < 9.5) {
				return 7;
			} else if (num < 10.6) {
				return 8;
			} else if (num < 11.7) {
				return 9;
			} else if (num < 12.8) {
				return 10;
			} else {
				return 11;
			}
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
			.domain(MONTHS)
			.range([padding + h, padding]);

		const xAxis = d3.axisBottom(xScale).tickValues(yearTicks);
		const yAxis = d3.axisLeft(yScale);

		svg
			.append("g")
			.attr("id", "x-axis")
			.attr("transform", "translate(0, " + (h + padding) + ")")
			.call(xAxis);

		svg
			.append("g")
			.attr("id", "y-axis")
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis);

		svg
			.selectAll("rect")
			.data(jsonData.monthlyVariance)
			.enter()
			.append("rect")
			.attr("class", "cell")
			.attr("data-month", (d) => {
				return monthKey[d.month];
			})
			.attr("data-year", (d) => {
				return d.year;
			})
			.attr("data-temp", (d) => {
				return jsonData.baseTemperature + d.variance;
			})
			.attr("y", (d) => {
				return yScale(monthKey[d.month]);
			})
			.attr("x", (d) => {
				return xScale(d.year);
			})
			.attr("fill", (d) => {
				return COLOR(colorPicker(jsonData.baseTemperature + d.variance));
			})
			.attr("width", xScale.bandwidth())
			.attr("height", yScale.bandwidth())
			.on("mouseover", handleMouseOver)
			.on("mouseout", handleMouseOut);

		function handleMouseOver(event, d) {
			d3.select(this).attr("stroke", "black");
			d3.select("#tooltip")
				.attr("data-year", function () {
					return d.year;
				})
				.style("left", event.pageX + "px")
				.style("top", event.pageY + "px")
				.style("opacity", 0.8)
				.html(
					d.year +
						" - " +
						monthKey[d.month] +
						"<br>" +
						Math.round((d.variance + 8.66) * 10) / 10 +
						"℃<br>" +
						Math.round(d.variance * 10) / 10 +
						"℃"
				);
		}

		function handleMouseOut(event, d) {
			d3.select(this).attr("stroke", "none");
			d3.select("#tooltip").style("opacity", 0);
		}

		let tooltipDiv = d3
			.select("#chart")
			.append("div")
			.attr("id", "tooltip")
			.style("opacity", 0);

		svg
			.append("text")
			.attr("id", "yLabel")
			.attr("text-anchor", "end")
			.attr("x", -padding * 2)
			.attr("y", 5)
			.attr("dy", ".5em")
			.attr("transform", "rotate(-90)")
			.text("Months");

		svg
			.append("text")
			.attr("id", "xLabel")
			.attr("text-anchor", "end")
			.attr("x", padding + w / 2)
			.attr("y", padding + h + 35)
			.attr("dy", ".5em")
			.text("Years");
	});
