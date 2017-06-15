import {Component, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MailService {

  constructor(private http: Http) {
  }

  searchMails(query): Observable<any> {
    const searchUrl = 'http://jdev01:4580/sob/api/emails/search?q=1';
    return this.http.get(searchUrl, {search: query})
      .map((res) => {
        console.log(res);
        return (res.json());
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not retrieve mails'));
  }
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MailService]
})
export class AppComponent implements OnInit {

  ticketId: string;
  emails: any = {};
  mailHasNoAttachments: boolean;

  constructor(private mailService: MailService) {
  }

  ngOnInit() {
    this.retrieveMails();
  }

  retrieveMails(){
    this.ticketId = window.location.href.split("?ti=")[1];
    this.searchMails(this.ticketId);
  }

  searchMails(ticket: string) {
    this.mailService.searchMails(ticket).subscribe(
      success => {
        console.log(success);
        this.emails = success.List.pop();
        this.mailHasNoAttachments = (Object.keys(this.emails['Attached Files Outcomes']).length === 0) ? true : false;
      },
      error => {
        this.mailHasNoAttachments = true;
        console.log(error);
      }
    );
  }
}


