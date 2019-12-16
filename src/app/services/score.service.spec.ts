import { TestBed } from "@angular/core/testing";
import { ScoreService } from "./score.service";

describe("ScoreService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: ScoreService = TestBed.get(ScoreService);
		expect(service).toBeTruthy();
	});

	it("should validate object parameters", () => {
		const service: ScoreService = TestBed.get(ScoreService);
		let item = {
			marks: 100,
			fullName: "Test"
		};

		let result = service.putScore(item);

		expect(result).toBe("Invalid object parameters");
	});

	it("should be able to add score item", () => {
		const service: ScoreService = TestBed.get(ScoreService);
		let item = {
			mark: 100,
			name: "Test"
		};
		service.putScore(item);
		let scores = service.getScores();
		expect(scores[0].mark).toEqual(item.mark);
		expect(scores[0].name).toEqual(item.name);
	});

	it("should validate values which are greater than 100", () => {
		const service: ScoreService = TestBed.get(ScoreService);

		let result = service.getGrade(101);

		expect(result).toBe("Mark cannot be greater than 100");
	});

	it("should return A", () => {
		const service: ScoreService = TestBed.get(ScoreService);

		let result = service.getGrade(75);

		expect(result).toBe("A");
	});

	it("should return B", () => {
		const service: ScoreService = TestBed.get(ScoreService);

		let result = service.getGrade(35);

		expect(result).toBe("B");
	});

	it("should return S", () => {
		const service: ScoreService = TestBed.get(ScoreService);

		let result = service.getGrade(34);

		expect(result).toBe("S");
	});

	it("should validate values which are less than 0", () => {
		const service: ScoreService = TestBed.get(ScoreService);

		let result = service.getGrade(-1);

		expect(result).toBe("Mark cannot be less than 0");
	});

	it("leaderboard should be sorted by marks descending", () => {
		const service: ScoreService = TestBed.get(ScoreService);
		let item = {
			mark: 60,
			name: "Test"
		};
		service.putScore(item);
		let item2 = {
			mark: 100,
			name: "Test2"
		};
		service.putScore(item2);
		let scores = service.getScores();
		expect(scores[0].mark).toEqual(item2.mark);
	});
});
