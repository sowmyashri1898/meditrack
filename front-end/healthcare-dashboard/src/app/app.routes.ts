import { Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { BillingComponent } from './components/billing/billing.component';
import { ChatComponent } from './components/chat/chat.component';
import { ContactComponent } from './components/contact/contact.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
import { DoctorBillingComponent } from './components/doctor-billing/doctor-billing.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { DoctorMainComponent } from './components/doctor-main/doctor-main.component';
import { DoctorMessageComponent } from './components/doctor-message/doctor-message.component';
import { DoctorNavbarComponent } from './components/doctor-navbar/doctor-navbar.component';
import { DoctorNotificationComponent } from './components/doctor-notification/doctor-notification.component';
import { DoctorPriscriptionComponent } from './components/doctor-priscription/doctor-priscription.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorSidebarComponent } from './components/doctor-sidebar/doctor-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LabResultsComponent } from './components/lab-results/lab-results.component';
import { LoginComponent } from './components/login/login.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { MedRecordComponent } from './components/med-record/med-record.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { PrescriptionsMedicationsComponent } from './components/prescriptions-medications/prescriptions-medications.component';
import { ScheduleAppointmentComponent } from './components/schedule-appointment/schedule-appointment.component';
import { ServicesComponent } from './components/services/services.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignupComponent } from './components/signup/signup.component';
import { VideoChatComponent } from './components/video-chat/video-chat.component';
import { OldAgeHeaderComponent } from './components/old-age-header/old-age-header.component';
import { OldAgeHomeComponent } from './components/old-age-home/old-age-home.component';
import { SolutionComponent } from './components/solution/solution.component';
import { ImplementationComponent } from './components/implementation/implementation.component';
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component';
import { VirtualRealityDetailsComponent } from './components/virtual-reality-details/virtual-reality-details.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { FitnessProgramDetailsComponent } from './components/fitness-program-details/fitness-program-details.component';
import { GamingStationsDetailsComponent } from './components/gaming-stations-details/gaming-stations-details.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SmartScreensDetailsComponent } from './components/smart-screens-details/smart-screens-details.component';
import { ResidentDashboardComponent } from './components/resident-dashboard/resident-dashboard.component';
import { DoctorVisitComponent } from './components/doctor-visit/doctor-visit.component';
import { RepairWorkComponent } from './components/repair-work/repair-work.component';
import { PhysioComponent } from './components/physio/physio.component';
import { GamesComponent } from './components/games/games.component';
import { FamilyTimeComponent } from './components/family-time/family-time.component';
import { MedicationComponent } from './components/medication/medication.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { GuardianMainComponent } from './components/guardian-main/guardian-main.component';
import { GuardianDashboardComponent } from './components/guardian-dashboard/guardian-dashboard.component';
import { GuardianNavbarComponent } from './components/guardian-navbar/guardian-navbar.component';
import { GuardianSidebarComponent } from './components/guardian-sidebar/guardian-sidebar.component';
import { GuardianProfileComponent } from './components/guardian-profile/guardian-profile.component';
import { DoctorVisitCalendarComponent } from './components/doctor-visit-calendar/doctor-visit-calendar.component';
import { DoctorVisitFormComponent } from './components/doctor-visit-form/doctor-visit-form.component';
import { FamilyVisitComponent } from './components/family-visit/family-visit.component';
import { MainComponent } from './components/admin/main/main.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { HousekeepingRepairComponent } from './components/admin/housekeeping-repair/housekeeping-repair.component';
import { EntertainmentComponent } from './components/admin/entertainment/entertainment.component';
import { NotificationComponent } from './components/admin/notification/notification.component';
import { GuardianNotificationComponent } from './components/guardian-notification/guardian-notification.component';
import { HouseKeepingComponent } from './components/house-keeping/house-keeping.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MusicComponent } from './components/music/music.component';
import { YogaComponent } from './components/yoga/yoga.component';
import { CommunicationManagementComponent } from './components/admin/communication-management/communication-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main-home', pathMatch: 'full' },
  { path: 'main-home', component: MainHomeComponent },
  { path: 'chat', component: ChatComponent },
  {
    path: 'header',
    component: HeaderComponent,
    children: [
      { path: 'footer', component: FooterComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'register', component: PatientRegistrationComponent },
      { path: 'schedule-appointment', component: ScheduleAppointmentComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'notification', component: NotificationsComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'medRecord', component: MedRecordComponent },
      { path: 'labResults', component: LabResultsComponent },
      { path: 'medication', component: PrescriptionsMedicationsComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'video-chat', component: VideoChatComponent },
      { path: 'resident-dashboard', component: ResidentDashboardComponent },
      { path: 'doctor-visit', component: DoctorVisitComponent },
      { path: 'family-time', component: FamilyTimeComponent },
      { path: 'games', component: GamesComponent },
      { path: 'physio', component: PhysioComponent },
      { path: 'repair-work', component: RepairWorkComponent },
      { path: 'medications', component: MedicationComponent },
      { path: 'test-result', component: TestResultComponent },
      { path: 'house-keeping', component: HouseKeepingComponent },
      {
        path: 'virtual-reality-details',
        component: VirtualRealityDetailsComponent,
      },
      { path: 'yoga', component: YogaComponent },
      { path: 'music', component: MusicComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'communication-management', component: CommunicationManagementComponent },
      { path: 'old-age-header', component: OldAgeHeaderComponent },
      {
        path: 'old-age-home',
        component: OldAgeHomeComponent,
        children: [
          { path: 'solution', component: SolutionComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'implementation', component: ImplementationComponent },
          { path: 'testimonials', component: SuccessStoriesComponent },
          {
            path: 'fitness-program-details',
            component: FitnessProgramDetailsComponent,
          },
          {
            path: 'gaming-stations-details',
            component: GamingStationsDetailsComponent,
          },
          { path: 'privacy-policy', component: PrivacyPolicyComponent },
          {
            path: 'smart-screens-details',
            component: SmartScreensDetailsComponent,
          },
          { path: 'activity-details', component: ActivityDetailsComponent },
        ],
      },
    ],
  },
  {
    path: 'doctor-main',
    component: DoctorMainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'doctor-dashboard', component: DoctorDashboardComponent },
      { path: 'doctor-appointment', component: DoctorAppointmentComponent },
      { path: 'doctor-message', component: DoctorMessageComponent },
      { path: 'doctor-notification', component: DoctorNotificationComponent },
      { path: 'doctor-navbar', component: DoctorNavbarComponent },
      { path: 'doctor-profile', component: DoctorProfileComponent },
      { path: 'doctor-priscription', component: DoctorPriscriptionComponent },
      { path: 'doctor-billing', component: DoctorBillingComponent },
      { path: 'doctor-sidebar', component: DoctorSidebarComponent },
      { path: 'doctor-visit-form', component: DoctorVisitFormComponent },
      {
        path: 'doctor-visit-calendar ',
        component: DoctorVisitCalendarComponent,
      },
      { path: 'communication-management', component: CommunicationManagementComponent },

    ],
  },
  {
    path: 'guardian-main',
    component: GuardianMainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'guardian-dashboard', component: GuardianDashboardComponent },
      { path: 'guardian-navbar', component: GuardianNavbarComponent },
      { path: 'guardian-sidebar', component: GuardianSidebarComponent },
      { path: 'guardian-profile', component: GuardianProfileComponent },
      { path: 'family-visit', component: FamilyVisitComponent },
      {
        path: 'guardian-notification',
        component: GuardianNotificationComponent,
      },
    ],
  },
  {
    path: 'admin-main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'admin-dashboard', component: DashboardComponent },
      { path: 'admin-navbar', component: NavbarComponent },
      { path: 'admin-sidebar', component: SidebarComponent },
      { path: 'admin-profile', component: ProfileComponent },
      {
        path: 'admin-housekeeping-repair',
        component: HousekeepingRepairComponent,
      },
      { path: 'admin-entertainment', component: EntertainmentComponent },
      { path: 'admin-notification', component: NotificationComponent },
      { path: 'communication-management', component: CommunicationManagementComponent },
    ],
  },
];
