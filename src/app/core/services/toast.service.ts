import { Injectable, signal } from '@angular/core';

export const TOAST_STATE = {
  success: 'success-toast',
  info: 'info-toast',
  warning: 'warning-toast',
  danger: 'danger-toast'
};

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public showsToast = signal(false);
  public toastMessage = signal('Default toast message');
  public toastState = signal(TOAST_STATE.success);

  constructor() { }
  private showToast(toastState: string, toastMessage: string): void {
    this.toastState.set(toastState);
    this.toastMessage.set(toastMessage);
    this.showsToast.set(true);

    setTimeout(()=> {
      this.dismiss();
    }, 3000);
  }

  sucess(toastMessage: string): void {
    this.showToast(TOAST_STATE.success, toastMessage);
  }

  info(toastMessage: string): void {
    this.showToast(TOAST_STATE.info, toastMessage);
  }

  error(toastMessage: string): void {
    this.showToast(TOAST_STATE.danger, toastMessage);
  }

  dismiss(): void {
    this.showsToast.set(false);
  }
}
