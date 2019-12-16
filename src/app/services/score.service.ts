import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class ScoreService {
	scores = [];

	constructor() {}

	getScores(): any {
		return this.scores.sort((a, b) => b.mark + a.mark);
	}

	putScore(score: any) {
		return "";
	}

	getGrade(mark: number): string {
		return "";
	}
}
