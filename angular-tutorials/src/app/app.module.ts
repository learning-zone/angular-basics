import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ComponentInteractionComponent } from './nav/component/component-interaction/component-interaction.component';
import { DirectivesComponent } from './nav/component/directives/directives.component';
import { LifecyclesComponent } from './nav/component/lifecycles/lifecycles.component';
import { PipesComponent } from './nav/component/pipes/pipes.component';
import { PageNotFoundComponent } from './nav/page-not-found/page-not-found.component';
import { ReativeFormsComponent } from './nav/forms/reative-forms/reative-forms.component';
import { ObservablesComponent } from './nav/rxjs/observables/observables.component';
import { PromisesComponent } from './nav/rxjs/promises/promises.component';
import { DependencyInjectionComponent } from './nav/dependency-injection/dependency-injection/dependency-injection.component';
import { DiProvidersComponent } from './nav/dependency-injection/di-providers/di-providers.component';
import { RoutingComponent } from './nav/routing/routing/routing.component';
import { LazyLoadingComponent } from './nav/routing/lazy-loading/lazy-loading.component';
import { ServicesComponent } from './nav/routing/services/services.component';
import { ProvidersComponent } from './nav/routing/providers/providers.component';
import { AuthenticationComponent } from './nav/routing/authentication/authentication.component';
import { HttpclientComponent } from './nav/routing/httpclient/httpclient.component';
import { AnimationsComponent } from './nav/miscellaneous/animations/animations.component';
import { InternationalizationComponent } from './nav/miscellaneous/internationalization/internationalization.component';
import { DragDropComponent } from './nav/miscellaneous/drag-drop/drag-drop.component';
import { VirtualScrollingComponent } from './nav/miscellaneous/virtual-scrolling/virtual-scrolling.component';
import { ParentComponent } from './nav/component/component-interaction/parent/parent.component';
import { ChildComponent } from './nav/component/component-interaction/child/child.component';
import { AttributeDirectivesDirective } from './nav/component/directives/attribute-directives.directive';
import { StructuralDirectivesDirective } from './nav/component/directives/structural-directives.directive';
import { heroSwitchComponents } from './nav/component/directives/hero-switch.components';
import { UnlessDirective } from './nav/component/directives/unless.directive';
import { CustomPipe } from './nav/component/pipes/custom.pipe';
import { TemplateDrivenComponent } from './nav/forms/template-driven/template-driven.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimalDetailsComponent } from './nav/dependency-injection/di-providers/animal-details.component';
import { AnyAnimalComponent } from './nav/dependency-injection/di-providers/any-animal.component';
import { LionComponent } from './nav/dependency-injection/di-providers/lion.component';
import { CowComponent } from './nav/dependency-injection/di-providers/cow.component';
import { BookComponent } from './nav/dependency-injection/di-providers/book.component';
import { PreferredBookComponent } from './nav/dependency-injection/di-providers/preferred-book.component';
import { ComputerComponent } from './nav/dependency-injection/di-providers/computer.component';
import { GlobalErrorHandlerService } from './nav/dependency-injection/di-providers/service/global-error-handler.service';
import { DashboardComponent } from './nav/routing/lazy-loading/dashboard/dashboard.component';
import { HomeComponent } from './nav/routing/lazy-loading/home/home.component';
import { RightsComponent } from './nav/routing/lazy-loading/rights/rights.component';
import { UsersComponent } from './nav/routing/lazy-loading/users/users.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ComponentInteractionComponent,
    DirectivesComponent,
    LifecyclesComponent,
    PipesComponent,
    PageNotFoundComponent,
    ReativeFormsComponent,
    ObservablesComponent,
    PromisesComponent,
    DependencyInjectionComponent,
    DiProvidersComponent,
    RoutingComponent,
    LazyLoadingComponent,
    ServicesComponent,
    ProvidersComponent,
    AuthenticationComponent,
    HttpclientComponent,
    AnimationsComponent,
    InternationalizationComponent,
    DragDropComponent,
    VirtualScrollingComponent,
    ParentComponent,
    ChildComponent,
    AttributeDirectivesDirective,
    StructuralDirectivesDirective,
    heroSwitchComponents,
    UnlessDirective,
    CustomPipe,
    TemplateDrivenComponent,
    AnimalDetailsComponent,
    AnyAnimalComponent,
    LionComponent,
    CowComponent,
    BookComponent,
    PreferredBookComponent,
    ComputerComponent,
    DashboardComponent,
    HomeComponent,
    RightsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    GlobalErrorHandlerService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
