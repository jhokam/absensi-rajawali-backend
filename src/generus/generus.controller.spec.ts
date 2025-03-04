import { Test, type TestingModule } from "@nestjs/testing";
import { GenerusController } from "./generus.controller";

describe("GenerusController", () => {
	let controller: GenerusController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GenerusController],
		}).compile();

		controller = module.get<GenerusController>(GenerusController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
