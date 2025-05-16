import { Test, type TestingModule } from "@nestjs/testing";
import { PresentionService } from "./presention.service";

describe("PresentionService", () => {
	let service: PresentionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PresentionService],
		}).compile();

		service = module.get<PresentionService>(PresentionService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
