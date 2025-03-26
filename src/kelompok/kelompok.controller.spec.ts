import { Test, type TestingModule } from "@nestjs/testing";
import { KelompokController } from "./kelompok.controller";

describe("KelompokController", () => {
	let controller: KelompokController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [KelompokController],
		}).compile();

		controller = module.get<KelompokController>(KelompokController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
