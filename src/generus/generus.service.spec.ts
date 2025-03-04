import { Test, type TestingModule } from "@nestjs/testing";
import { GenerusService } from "./generus.service";

describe("GenerusService", () => {
	let service: GenerusService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GenerusService],
		}).compile();

		service = module.get<GenerusService>(GenerusService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
