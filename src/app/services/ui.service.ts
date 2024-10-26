import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private fullscreen = false;
  private fullscreenSubject = new Subject<any>();

  constructor() { }

  toggleFullscreen(): void {
    if (!this.fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen()
    }

    this.fullscreen = !this.fullscreen;
    this.fullscreenSubject.next(this.fullscreen);
  }

  onToggleFullscreen(): Observable<any> {
    return this.fullscreenSubject.asObservable();
  }

  resetFullscreenState(): void {
    this.fullscreen = false;
    this.fullscreenSubject.next(this.fullscreen);
  }
}
