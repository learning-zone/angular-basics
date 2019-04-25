import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSidenavModule } from "@angular/material/sidenav";
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkAppSidebarComponent } from "./app-sidebar.component";
import { MockAppSidebarService } from "./../testing/app-sidebar.mock";
import { STARK_APP_SIDEBAR_SERVICE } from "./../services/app-sidebar.service.intf";

describe("AppSidebarComponent", () => {
	let fixture: ComponentFixture<StarkAppSidebarComponent>;
	let component: StarkAppSidebarComponent;

	beforeEach(async(() => {
		const mockLogger: MockStarkLoggingService = new MockStarkLoggingService();
		return TestBed.configureTestingModule({
			declarations: [StarkAppSidebarComponent],
			imports: [CommonModule, MatSidenavModule, NoopAnimationsModule],
			providers: [
				{ provide: STARK_LOGGING_SERVICE, useValue: mockLogger },
				{ provide: STARK_APP_SIDEBAR_SERVICE, useValue: new MockAppSidebarService() }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StarkAppSidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe("sidenavs opening features ", () => {
		it("left sidebar should be opened", () => {
			component.onOpenSideNav({
				sidebar: "left"
			});
			expect(component.appSidenavLeft.opened).toBe(true);
		});

		it("right sidebar should be opened", () => {
			component.onOpenSideNav({
				sidebar: "right"
			});
			expect(component.appSidenavRight.opened).toBe(true);
		});

		it("left sidebar should show the menu in menu mode", () => {
			component.onOpenSideNav({
				mode: "menu",
				sidebar: "left"
			});
			fixture.detectChanges();
			const sidenav: HTMLElement = fixture.nativeElement.querySelector(".stark-app-sidenav-menu");
			expect(sidenav).toBeTruthy();
		});

		it("left sidebar should hide the menu in regular mode", () => {
			component.onOpenSideNav({
				mode: "regular",
				sidebar: "left"
			});
			fixture.detectChanges();
			const sidenav: HTMLElement = fixture.nativeElement.querySelector(".stark-app-sidenav-menu");
			expect(sidenav).toBeFalsy();
		});
	});

	describe("sidenavs closing features ", () => {
		it("left sidebar should close", () => {
			component.onOpenSideNav({
				sidebar: "left"
			});
			component.onCloseSideNavs();
			expect(component.appSidenavLeft.opened).toBe(false);
		});

		it("right sidebar should close", () => {
			component.onOpenSideNav({
				sidebar: "right"
			});
			component.onCloseSideNavs();
			expect(component.appSidenavRight.opened).toBe(false);
		});
	});
});
