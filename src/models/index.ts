import { ModelDefined } from 'sequelize';
import { ConfigurationModel } from './configuration.model';
import { UserProjectModel } from './userProject.model';
import { DocumentModel } from './document.model';
import { TeamModel } from './team.model';
import { TeamProjectsModel } from './teamProject.model';
import { AirportPickupModel } from './airportPickup.model';
import { LaundryModel } from './laundry.model';
import { UserModel } from './user.model';
import { SiteVisitRequestModel } from './siteVisitRequest.model';
import { CleaningModel } from './cleaningDetails.model';
import { EmergencyContactModel } from './emergencyContact.model';
import { ProjectProgressModel } from './projectProgress.model';
import { CatamaranModel } from './catamaran.model';
import { WelcomeVideoModel } from './welcomeVideo.model';
import { VcareUserModel } from './vcareuser.model';
import { BookAStayModel } from './bookAStay.model';
import { SurveySubmittingModel } from './surveySubmitting.model';
import { CatamaranConfigModel } from './catamaranConfig.model';
import { SurveySubmittingAnswerModel } from './surveySubmittingAnswer.model';
import { SurveyQuestionModel } from './surveyQuestion.model';
import { UnitModel } from './unit.model';
import { PlanModel } from './plan.model';
import { FeedbackModel } from './feedback.model';
import { ServiceRequestModel } from './serviceRequest.model';
import { ComplaintModel } from './complaint.model';
import { DemandModel } from './demand.model';
import { InventoryModel } from './inventory.model';
import { NotificationModel } from './notification.model';
import { TestimonialModel } from './testimonial.model';
import { TransactionModel } from './transaction.model';
import { ProjectModel } from './project.model';

export interface DBModels {
  ConfigurationModel?: ModelDefined<any, any>;
  UserProjectModel?: ModelDefined<any, any>;
  DocumentModel?: ModelDefined<any, any>;
  TeamModel?: ModelDefined<any, any>;
  TeamProjectsModel?: ModelDefined<any, any>;
  AirportPickupModel?: ModelDefined<any, any>;
  LaundryModel?: ModelDefined<any, any>;
  UserModel?: ModelDefined<any, any>;
  SiteVisitRequestModel?: ModelDefined<any, any>;
  CleaningModel?: ModelDefined<any, any>;
  EmergencyContactModel?: ModelDefined<any, any>;
  ProjectProgressModel?: ModelDefined<any, any>;
  WelcomeVideoModel?: ModelDefined<any, any>;
  VcareUserModel?: ModelDefined<any, any>;
  BookAStayModel?: ModelDefined<any, any>;
  CatamaranConfigModel?: ModelDefined<any, any>;
  surveySubmittingModel?: ModelDefined<any, any>;
  SurveySubmittingAnswerModel?: ModelDefined<any, any>;
  surveyQuestionModel?: ModelDefined<any, any>;
  UnitModel?: ModelDefined<any, any>;
  SurveySubmittingModel?: ModelDefined<any, any>;
  SurveyQuestionModel?: ModelDefined<any, any>;
  PlanModel?: ModelDefined<any, any>;
  FeedbackModel?: ModelDefined<any, any>;
  CatamaranModel?: ModelDefined<any, any>;
  ServiceRequestModel?: ModelDefined<any, any>;
  ComplaintModel?: ModelDefined<any, any>;
  FurnishPropertyModel?: ModelDefined<any, any>;
  DemandModel?: ModelDefined<any, any>;
  InventoryModel?: ModelDefined<any, any>;
  NotificationModel?: ModelDefined<any, any>;
  TestimonialModel?: ModelDefined<any, any>;
  TransactionModel?: ModelDefined<any, any>;
  ProjectModel?: ModelDefined<any, any>;
}

export default {
  ConfigurationModel,
  UserProjectModel,
  DocumentModel,
  TeamModel,
  TeamProjectsModel,
  AirportPickupModel,
  LaundryModel,
  UserModel,
  SiteVisitRequestModel,
  CleaningModel,
  EmergencyContactModel,
  ProjectProgressModel,
  WelcomeVideoModel,
  VcareUserModel,
  BookAStayModel,
  SurveyQuestionModel,
  SurveySubmittingModel,
  CatamaranConfigModel,
  SurveySubmittingAnswerModel,
  UnitModel,
  PlanModel,
  FeedbackModel,
  CatamaranModel,
  ServiceRequestModel,
  ComplaintModel,
  DemandModel,
  InventoryModel,
  NotificationModel,
  TestimonialModel,
  TransactionModel,
  ProjectModel,
};
