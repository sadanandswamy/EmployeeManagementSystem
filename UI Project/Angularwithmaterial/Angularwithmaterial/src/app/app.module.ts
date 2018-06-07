import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { EmployeeServiece } from './employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { WorldDataService } from './worldData.service';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MatTableModule, MatSort } from '@angular/material';
import { MainMenuComponent } from './mainMenu/mainMenu.component';
import { ApolloTechnologyComponent } from './apollo-technology/apollo-technology.component';
import { MarketingServicesComponent } from './marketing-services/marketing-services.component';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { CreateEmployeeComponent } from './CreateEmpolyee/create-employee.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmEqualValidatorDirective } from './shared/custom-equal-validator.directive';
import { SearchFilterPipe } from './searchFilter.pipe';
import { CreateEmployeeCanDeactivateGuardService } from './CreateEmpolyee/create-employee-can deactivateguard.service';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { MyHttpLogInterceptor } from './myhttpinterceptor.interceptor';
import { EmployeeListResolverService } from './shared/employeeList-resolver.service';
import { TableBasicExample } from './mat table example/table-basic.component';
const approutes: Routes = [

  { path: 'appolloTech', component: ApolloTechnologyComponent },
  { path: 'marketingservices', component: MarketingServicesComponent },
  { path: 'specialoffers', component: SpecialOffersComponent },
  { path: 'list', component: ListEmployeesComponent, resolve: { employeeList: EmployeeListResolverService } },
  {
    path: 'create',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'update/:id', component: CreateEmployeeComponent },
  { path: 'delete/:id', component: CreateEmployeeComponent },

  { path: '', redirectTo: '/appolloTech', pathMatch: 'full' },


];
@NgModule({
  declarations: [
    AppComponent,
    TableBasicExample,
    MainMenuComponent,
    ConfirmEqualValidatorDirective,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    ApolloTechnologyComponent,
    MarketingServicesComponent,
    SpecialOffersComponent,
    AboutUsComponent,
    CareersComponent,
    ContactComponent,
    LoginComponent,
    MatSort,
    RegisterComponent,
    SearchFilterPipe,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    MatRadioModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(approutes,{enableTracing:true}),

    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true },
    EmployeeServiece,
    WorldDataService,
    EmployeeListResolverService,
    CreateEmployeeCanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
