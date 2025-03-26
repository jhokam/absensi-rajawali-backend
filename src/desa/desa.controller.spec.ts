import { Test, type TestingModule } from "@nestjs/testing";
import { DesaController } from "./desa.controller";

describe("DesaController", () => {
	let controller: DesaController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DesaController],
		}).compile();

		controller = module.get<DesaController>(DesaController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
