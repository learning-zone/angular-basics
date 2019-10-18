## Angular Unit Testing Interview Questions and Answers

#### Q. How do you mock a service to inject in a unit test?
**Resolving via TestBed**  
The `TestBed` acts as a dummy Angular Module and we can configure it like one including with a set of providers like so:
```typescript
TestBed.configureTestingModule({
  providers: [AuthService]
});
```
We can then ask the `TestBed` to resolve a token into a dependency using it’s internal injector, like so:
```typescript
testBedService = TestBed.get(AuthService);
```
If most of our test specs need the same dependency mocked the same way we can resolve it once in the `beforeEach` function and mock it it there.

**Resolving via the inject function**  
```typescript
it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([AuthService], (injectService: AuthService) => {
      expect(injectService).toBe(testBedService);
    })
);
```
The `inject` function wraps the test spec function but lets us also inject dependencies using the parent injector in the `TestBed`.
```typescript
inject(
  [token1, token2, token2],
  (dep1, dep2, dep3) => { }
)
```
The first param is an array of tokens we want to resolve dependencies for, the second parameter is a function whose arguments are the resolved dependencies.

Using the `inject` function:

* Makes it clear what dependencies each spec function uses.
* If each test spec requires different mocks and spys this is a better solution that resolving it once per test suite.

**Overriding the components providers**  
Before we create a component via the `TestBed` we can override it’s providers. Lets imagine we have a mock `AuthService` like so:
```typescript
class MockAuthService extends AuthService {
  isAuthenticated() {
    return 'Mocked';
  }
}
```
We can override the components providers to use this mocked `AuthService` like so.
```typescript
TestBed.overrideComponent(
    LoginComponent,
    {set: {providers: [{provide: AuthService, useClass: MockAuthService}]}}
);
```
The syntax is pretty specific, it’s called a `MetaDataOverride` and it can have the properties `set`, `add` and `remove`. We use `set` to completely replace the providers array with the values we’ve set.

**Resolving via the component injector**  
When the component is created since it has it’s own injector it will resolve the AuthService itself and not forward the request to it’s parent TestBed injector.

If we wanted to get the same instance of dependency that was passed to the component constructor we need to resolve using the component injector, we can do that through the component fixture like so:
```typescript
componentService = fixture.debugElement.injector.get(AuthService);
```

**Listing**  
login.component.spec.ts
```typescript
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from "./auth.service";

class MockAuthService extends AuthService {
    isAuthenticated() {
        return 'Mocked';
    }
}

describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let testBedService: AuthService;
    let componentService: AuthService;

    beforeEach(() => {

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AuthService]
        });

        // Configure the component with another set of Providers
        TestBed.overrideComponent(
            LoginComponent,
            { set: { providers: [{ provide: AuthService, useClass: MockAuthService }] } }
        );

        // create component and test fixture
        fixture = TestBed.createComponent(LoginComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

        // AuthService provided to the TestBed
        testBedService = TestBed.get(AuthService);

        // AuthService provided by Component, (should return MockAuthService)
        componentService = fixture.debugElement.injector.get(AuthService);
    });

    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
        inject([AuthService], (injectService: AuthService) => {
            expect(injectService).toBe(testBedService);
        })
    );

    it('Service injected via component should be and instance of MockAuthService', () => {
        expect(componentService instanceof MockAuthService).toBeTruthy();
    });
});
```
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

#### Q. What Is Karma? What Is the Use in Angular?
#### Q. What Is Jasmine? What Is the Use in Angular? 
#### Q. What is Unit Test in Angular?
#### Q. What Is Integration Testing in Angular?
#### Q. What is End-to-End Testing in Angular?
#### Q. How to Test a components inputs as well as its outputs?
#### Q. How to Interact with a components view?