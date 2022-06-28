/** @format */

let dataSource =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

fetch(dataSource)
	.then((data) => data.json())
	.then((jsonData) => {});
