import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterScheduledBeforeToday', standalone: false })
export class FilterScheduledBeforeTodayPipe implements PipeTransform {
    transform(notifications: any[]): any[] {
        const now = new Date();
        const todayYear = now.getFullYear();
        const todayMonth = now.getMonth();
        const todayDate = now.getDate();

        return notifications.filter(n => {
            const notifDate = new Date(n.scheduledAt);
            const notifYear = notifDate.getFullYear();
            const notifMonth = notifDate.getMonth();
            const notifDay = notifDate.getDate();

            // Only show notifications scheduled for today or earlier (local time)
            if (
                notifYear < todayYear ||
                (notifYear === todayYear && notifMonth < todayMonth) ||
                (notifYear === todayYear && notifMonth === todayMonth && notifDay <= todayDate)
            ) {
                return true;
            }
            return false;
        });
    }
}