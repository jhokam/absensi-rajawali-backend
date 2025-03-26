import { Test, type TestingModule } from "@nestjs/testing";
import { DesaService } from "./desa.service";

describe("DesaService", () => {
	let service: DesaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DesaService],
		}).compile();

		service = module.get<DesaService>(DesaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
