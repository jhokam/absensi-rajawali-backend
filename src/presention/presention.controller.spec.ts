import { Test, type TestingModule } from "@nestjs/testing";
import { PresentionController } from "./presention.controller";

describe("PresentionController", () => {
	let controller: PresentionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PresentionController],
		}).compile();

		controller = module.get<PresentionController>(PresentionController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
