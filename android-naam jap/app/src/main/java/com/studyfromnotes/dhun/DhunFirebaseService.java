package com.studyfromnotes.dhun;

import android.app.PendingIntent;
import android.content.Intent;
import android.net.Uri;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class DhunFirebaseService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(RemoteMessage message) {
        super.onMessageReceived(message);

        String title = "Time for your sadhana";
        String body = "A few minutes of naam jap can quiet the whole day.";

        if (message.getNotification() != null) {
            title = message.getNotification().getTitle() != null
                ? message.getNotification().getTitle() : title;
            body = message.getNotification().getBody() != null
                ? message.getNotification().getBody() : body;
        }

        showNotification(title, body);
    }

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        // Send token to your server if needed for targeted push
    }

    private void showNotification(String title, String body) {
        Intent intent = new Intent(Intent.ACTION_VIEW,
            Uri.parse("https://jap.studyfromnotes.com/jap/"));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent pending = PendingIntent.getActivity(this, 0, intent,
            PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(
                this, DhunApplication.CHANNEL_REMINDERS)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(body)
            .setAutoCancel(true)
            .setContentIntent(pending)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setStyle(new NotificationCompat.BigTextStyle().bigText(body));

        try {
            NotificationManagerCompat manager = NotificationManagerCompat.from(this);
            manager.notify(1001, builder.build());
        } catch (SecurityException ignored) {
            // POST_NOTIFICATIONS permission not granted
        }
    }
}
