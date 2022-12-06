import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { RegisterComponent } from './register/register.component';
import { CandidateComponent } from './candidate/candidate.component';
import { MatChipsModule } from '@angular/material/chips';
import { SearchPipe } from './search.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatSelectModule} from '@angular/material/select';
import { SearchModalComponent } from './search-modal/search-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HomeComponent,
    LoginComponent,
    BoardComponent,
    RegisterComponent,
    CandidateComponent,
    SearchPipe,
    SearchModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    NgbModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatChipsModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    MatSliderModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
