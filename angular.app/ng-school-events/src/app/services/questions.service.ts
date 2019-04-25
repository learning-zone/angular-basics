import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class QuestionsService {
  questionUrl = "questions";
  answerUrl = "answers";
  includeAnswers = "filter[include]=answers";
  includeParent = "filter[include]=parent";
  includeTeacher = "filter[include]=teacher";

  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public getQuestions(courseId: any): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${this.questionUrl}?${
          this.includeAnswers
      }&${this.includeParent}&${this.includeTeacher}&filter[where][courseId]=${courseId}`
      )
      .map(res => res.json());
  }

  public getAnswersByQuestionId(questionId: any): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${this.answerUrl}?${this.includeParent}&${this.includeTeacher}&filter[where][questionId]=${questionId}`
      )
      .map(res => res.json());
  }

  public registerQuestion(question: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.questionUrl}`, question)
      .map(res => res.json());
  }

  public registerAnswer(answer: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.answerUrl}`, answer)
      .map(res => res.json());
  }

  public removeAnswer(id): Observable<any> {
    return this.http
      .delete(`${this.configSvc.backendUrl}/${this.answerUrl}/${id}`)
      .map(res => res.json());
  }
  
  public removeQuestion(id): Observable<any> {
    return this.http
      .delete(`${this.configSvc.backendUrl}/${this.questionUrl}/${id}`)
      .map(res => res.json());
  }

}
