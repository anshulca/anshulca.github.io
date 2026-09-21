package com.studyfromnotes.dhun;

import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class ReminderReceiver extends BroadcastReceiver {

    private static final String[] MESSAGES = {
        "A few minutes of naam jap can quiet the whole day.",
        "Your mala is waiting. Begin with just one round.",
        "Return to the Name - even a single jap counts.",
        "The thread of practice holds when you hold it daily.",
        "Pause. Remember. Repeat. Your sadhana awaits.",
        "One mala, one breath at a time. Begin now.",
        "The Name remembers those who remember it."
    };

    @Override
    public void onReceive(Context context, Intent intent) {
        String body = MESSAGES[(int) (System.currentTimeMillis() % MESSAGES.length)];

        Intent tapIntent = new Intent(Intent.ACTION_VIEW,
            Uri.parse("https://jap.studyfromnotes.com/jap/"));
        tapIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent pending = PendingIntent.getActivity(context, 0, tapIntent,
            PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(
                context, DhunApplication.CHANNEL_REMINDERS)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle("Time for your sadhana")
            .setContentText(body)
            .setAutoCancel(true)
            .setContentIntent(pending)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        try {
            NotificationManagerCompat manager = NotificationManagerCompat.from(context);
            manager.notify(1002, builder.build());
        } catch (SecurityException ignored) {}
    }
}
