import { StarkAppSidebarServiceImpl } from "./app-sidebar.service";
import { StarkAppSidebarOpenEvent } from "./app-sidebar-open-event.intf";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import createSpy = jasmine.createSpy;

describe("AppSidebarService", () => {
	let service: StarkAppSidebarServiceImpl;
	beforeEach(() => {
		const mockLogger: MockStarkLoggingService = new MockStarkLoggingService();
		service = new StarkAppSidebarServiceImpl(mockLogger);
	});

	it("openMenu() should raise the correct event", () => {
		service.openSidebar$.subscribe((event: StarkAppSidebarOpenEvent) => {
			expect(event).toEqual({ mode: "menu", sidebar: "left" });
		});
		service.openMenu();
	});

	it("openLeft() should raise the correct event", () => {
		service.openSidebar$.subscribe((event: StarkAppSidebarOpenEvent) => {
			expect(event).toEqual({ mode: "regular", sidebar: "left" });
		});
		service.openLeft();
	});

	it("openRight() should raise the correct event", () => {
		service.openSidebar$.subscribe((event: StarkAppSidebarOpenEvent) => {
			expect(event).toEqual({ sidebar: "right" });
		});
		service.openRight();
	});

	it("close() should raise an event", () => {
		const closeSidebars: jasmine.Spy = createSpy("closeSidebarsSpy");
		service.closeSidebar$.subscribe(() => {
			closeSidebars();
		});
		service.close();
		expect(closeSidebars).toHaveBeenCalledTimes(1);
	});
});
