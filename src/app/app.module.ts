import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { RegisterComponent } from './components/register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { QuestionSetupComponent } from './components/question-setup/question-setup.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { QuestionOptionsComponent } from './components/question-options/question-options.component';
import { QuestionPickedComponent } from './components/question-picked/question-picked.component';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { ChangeInfoComponent } from './pages/change-info/change-info/change-info.component';

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'leaderboard',
    component: LeaderboardPageComponent,
  },
  {
    path: 'friends',
    component: FriendsPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'quiz',
    component: QuestionsPageComponent,
  },

  {
    path: 'changeuserinfo',
    component: ChangeInfoComponent,
  },

];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    StartPageComponent,
    RegisterComponent,
    NavigationComponent,
    LeaderboardComponent,
    ProfilePageComponent,
    LeaderboardPageComponent,
    FriendsPageComponent,
    QuestionSetupComponent,
    QuestionsPageComponent,
    QuestionOptionsComponent,
    QuestionPickedComponent,
    HomeButtonComponent,
    LeaderboardComponent,
    ChangeInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
