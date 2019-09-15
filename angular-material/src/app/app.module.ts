import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AutocompleteComponent } from './components/pages/autocomplete/autocomplete.component';
import { CheckboxComponent } from './components/pages/checkbox/checkbox.component';
import { DatepickerComponent } from './components/pages/datepicker/datepicker.component';
import { FormComponent } from './components/pages/form/form.component';

// Angular Material Components
import { MatCheckboxModule, MatNativeDateModule} from '@angular/material';
import { MatButtonModule} from '@angular/material';
import { MatBadgeModule} from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatInputModule} from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioModule} from '@angular/material/radio';
import { MatSelectModule} from '@angular/material/select';
import { MatSliderModule} from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { MatStepperModule} from '@angular/material/stepper';
import { MatTabsModule} from '@angular/material/tabs';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './components/pages/paginator/paginator.component';
import { SortHeaderComponent } from './components/pages/sort-header/sort-header.component';
import { CardComponent } from './components/pages/card/card.component';
import { ListComponent } from './components/pages/list/list.component';
import { TabsComponent } from './components/pages/tabs/tabs.component';
import { ButtonComponent } from './components/pages/button/button.component';
import { BadgeComponent } from './components/pages/badge/badge.component';
import { ChipsComponent } from './components/pages/chips/chips.component';
import { ProgressSpinnerComponent } from './components/pages/progress-spinner/progress-spinner.component';
import { ProgressBarComponent } from './components/pages/progress-bar/progress-bar.component';
import { BottomSheetComponent } from './components/pages/bottom-sheet/bottom-sheet.component';
import { DialogComponent } from './components/pages/dialog/dialog.component';
import { SnackbarComponent } from './components/pages/snackbar/snackbar.component';
import { TooltipComponent } from './components/pages/tooltip/tooltip.component';
import { BottomSheetDialogComponent } from './components/pages/bottom-sheet-dialog/bottom-sheet-dialog.component';
import { DialogExampleComponent } from './components/pages/dialog-example/dialog-example.component';
import { SnackbarExampleComponent } from './components/pages/snackbar-example/snackbar-example.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AutocompleteComponent,
    CheckboxComponent,
    DatepickerComponent,
    FormComponent,
    PaginatorComponent,
    SortHeaderComponent,
    CardComponent,
    ListComponent,
    TabsComponent,
    ButtonComponent,
    BadgeComponent,
    ChipsComponent,
    ProgressSpinnerComponent,
    ProgressBarComponent,
    BottomSheetComponent,
    DialogComponent,
    SnackbarComponent,
    TooltipComponent,
    BottomSheetDialogComponent,
    DialogExampleComponent,
    SnackbarExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatBottomSheetModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [Title,
    MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
