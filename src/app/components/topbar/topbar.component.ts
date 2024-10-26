import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

const DEFAULT_AVATAR = "assets/images/default-avatar.png";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  baseUrl = "http://localhost:3001/";
  fullscreen?: boolean;
  fullscreenSubscription?: Subscription;
  userName: string;
  avatarSrc = DEFAULT_AVATAR;
  userSubscription: Subscription;

  constructor(private uiService: UiService, private authService: AuthService) {
    this.fullscreenSubscription = this.uiService.onToggleFullscreen().subscribe(value => {
      this.fullscreen = value;
    });
    this.userSubscription = this.authService.getUserInfo().subscribe(data => {
      if (data && data._id) {
        this.userName = data.firstName;
        this.avatarSrc = data.avatar ? `${this.baseUrl}api/employees/image/${data.avatar}` : DEFAULT_AVATAR;
      }
    });
  }

  ngOnInit(): void {
  }

  toggleFullscreen(): void {
    this.uiService.toggleFullscreen();
  }

  @HostListener('document:fullscreenchange', ['$event'])
  handleFullscreenEvent(event: Event) {
    if (!document.fullscreenElement) {
      this.uiService.resetFullscreenState();
    }
  }

  logout(): void {
    this.authService.logout();
  }

}
