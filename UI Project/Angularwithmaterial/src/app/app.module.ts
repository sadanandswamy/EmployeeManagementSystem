import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {EmployeeServiece} from './employee.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import{HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import {RouterModule,Routes} from "@angular/router";
import { LayoutModule } from '@angular/cdk/layout';
import{HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { WorldDataService } from './worldData.service';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,MatMenuModule } from '@angular/material';
import { MainMenuComponent } from './mainMenu/mainMenu.component';
import { ApolloTechnologyComponent } from './apollo-technology/apollo-technology.component';
import { MarketingServicesComponent } from './marketing-services/marketing-services.component';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { CreateEmployeeComponent } from './CreateEmpolyee/create-employee.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ListEmployeesComponent } from './employee/list-employees.component';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ConfirmEqualValidatorDirective} from './shared/custom-equal-validator.directive';
const approutes:Routes=[
  
   {path:'appolloTech',component:ApolloTechnologyComponent },
   {path:'marketingservices',component:MarketingServicesComponent },
   {path:'specialoffers',component:SpecialOffersComponent },
   {path:'list',component:ListEmployeesComponent },
   {path:'create',component:CreateEmployeeComponent },
   {path:'aboutus',component:AboutUsComponent },
   {path:'careers',component:CareersComponent },
   {path:'contact',component:ContactComponent },
   {path:'login',component:LoginComponent},
   {path:'register',component:RegisterComponent},
   {path:'update/:id',component:CreateEmployeeComponent}, 
   {path:'delete/:id',component:CreateEmployeeComponent},
   
   {path:'',redirectTo:'/appolloTech',pathMatch:'full' },
   
  
  ];
@NgModule({
  declarations: [
    AppComponent,
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
    RegisterComponent
   
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
    MatInputModule,
    MatCardModule,
     MatMenuModule,
     RouterModule.forRoot(approutes),
     LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  })
  ],
  schemas:[NO_ERRORS_SCHEMA ],
  providers: [EmployeeServiece,WorldDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
