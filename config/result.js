const https = require("https");
const REPO_FILE = "./repo.txt";
const UNIT_TEST_RESULT_PATH = "./results.json";
const SCORE_PATH = "./scores.json";

const scores = require(SCORE_PATH);
const unitTest = require(UNIT_TEST_RESULT_PATH);
const lineReader = require("line-reader");

const getCommitId = filePath => {
	return new Promise((resolve, reject) => {
		lineReader.eachLine(filePath, line => {
			resolve(line);
		});
	});
};

const postData = async () => {
	const repoName = await getCommitId(REPO_FILE);
	const { browsers, result } = unitTest;
	const { startTime, total, success } = browsers[
		Object.keys(browsers)[0]
	].lastResult;

	const summary = {
		date: new Date(startTime),
		total,
		success
	};
	const testCases = result[Object.keys(result)[0]].map(testCase => {
		let score = scores.scores.find(scoreObj => {
			return testCase.fullName == scoreObj.suite + " " + scoreObj.desc;
		});
		let testScore = 1;
		if (score) {
			testScore = score.score;
		}
		return {
			fullName: testCase.fullName,
			success: testCase.success,
			suite: testCase.suite,
			score: testScore
		};
	});
	const params = {
		repoName,
		unitTest: {
			summary,
			testCases
		}
	};
	return params;
};

const sendReportData = async () => {
	const data = await postData();
	const options = {
		hostname: "d3s6yky9vet5yl.cloudfront.net",
		path: "/assessments/report",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(JSON.stringify(data))
		}
	};

	const req = https.request(options, res => {});

	req.write(JSON.stringify(data));
	req.end();
};

sendReportData();
