package com.studyfromnotes.dhun;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

public class DhunApplication extends Application {

    public static final String CHANNEL_REMINDERS = "dhun_sadhana_reminders";

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannels();
    }

    private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_REMINDERS,
                "Sadhana Reminders",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("Daily reminders for your naam jap sadhana");
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{0, 200, 100, 200});

            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }
}
