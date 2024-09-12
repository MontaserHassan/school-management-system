import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackModel, FeedbackType } from '../../enums/feedback';
import { SnackBarComponent } from '../../component/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class AsyncFeedbackService {
  constructor(private snackBar: MatSnackBar) { }

  public showFeedback(feedback: FeedbackModel) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: feedback.message,
        icon: feedback.type === FeedbackType.Success ? 'check_box' : feedback.type === FeedbackType.Failure ? 'error' : 'warning',
        url: feedback.url,
        urlText: feedback.urlText,
      },
      duration: feedback.duration ? feedback.duration : 5000,
      panelClass:
        feedback.type === FeedbackType.Failure ? ['snack-bar-error'] : feedback.type === FeedbackType.Warning ? ['snack-bar-warring'] : [],
    });
  }

  public showFailureMessage(message: string, url: string|null = null, urlText: string|null = null) {
    this.showFeedback(new FeedbackModel(FeedbackType.Failure, message, null, url, urlText));
  }

  public showSuccessMessage(message: string, url: string|null = null, urlText: string|null = null) {
    this.showFeedback(new FeedbackModel(FeedbackType.Success, message, null, url, urlText));
  }

  public showWarningMessage(message: string, url: string|null = null, urlText: string|null = null) {
    this.showFeedback(new FeedbackModel(FeedbackType.Warning, message, null, url, urlText));
  }
}
