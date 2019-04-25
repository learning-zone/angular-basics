import { Subject } from "rxjs";
import { StarkAppSidebarOpenEvent, StarkAppSidebarService } from "@nationalbankbelgium/stark-ui";

/**
 * Mock class of the {@link StarkAppSidebarService|StarkAppSidebarService}.
 *
 * * `IMPORTANT:` This class just provides mocks (jasmine Spies) for all the methods of the actual service.
 * Therefore, it is up to you to define the return values of such spies according to your needs.
 *
 * You can use it in your unit tests by providing it while configuring the testing module in the TestBed. For example:
 * ```typescript
 * import { STARK_APP_SIDEBAR_SERVICE } from "@nationalbankbelgium/stark-ui";
 * import { MockAppSidebarService } from "@nationalbankbelgium/stark-ui/testing";
 *
 * describe("Some test", () => {
 *
 *     beforeEach(async(() => {
 *         return TestBed.configureTestingModule({
 *             imports: [...],
 *             declarations: [...],
 *             providers: [
 *                 // provide is as a value
 *                 { provide: STARK_APP_SIDEBAR_SERVICE, useValue: new MockAppSidebarService() },
 *                 // or as a class
 *                 { provide: STARK_APP_SIDEBAR_SERVICE, useClass: MockAppSidebarService }
 *             ]
 *         }).compileComponents();
 *     }));
 *
 * }
 * ```
 */
export class MockAppSidebarService implements StarkAppSidebarService {
	/**
	 * Observable subscribed by components to catch open events
	 */
	public openSidebar$: Subject<StarkAppSidebarOpenEvent> = new Subject<StarkAppSidebarOpenEvent>();

	/**
	 * Observable subscribed by components to catch close events
	 */
	public closeSidebar$: Subject<void> = new Subject<void>();

	/**
	 * Open sidebar's menu
	 */
	public openMenu: () => void = jasmine.createSpy("openMenu");

	/**
	 * Open the left sidebar
	 */
	public openLeft: () => void = jasmine.createSpy("openLeft");

	/**
	 * Open the right sidebar
	 */
	public openRight: () => void = jasmine.createSpy("openRight");

	/**
	 * Close all sidebars
	 */
	public close: () => void = jasmine.createSpy("close");
}
