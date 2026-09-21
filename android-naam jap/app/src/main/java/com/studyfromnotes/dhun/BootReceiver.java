package com.studyfromnotes.dhun;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import java.util.Calendar;

public class BootReceiver extends BroadcastReceiver {

    private static final String PREFS = "dhun_prefs";
    private static final String KEY_REMINDER_HOUR = "reminder_hour";
    private static final String KEY_REMINDER_MIN = "reminder_min";
    private static final String KEY_REMINDER_ON = "reminder_on";

    @Override
    public void onReceive(Context context, Intent intent) {
        if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
            rescheduleReminder(context);
        }
    }

    public static void scheduleReminder(Context context, int hour, int minute) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        prefs.edit()
            .putInt(KEY_REMINDER_HOUR, hour)
            .putInt(KEY_REMINDER_MIN, minute)
            .putBoolean(KEY_REMINDER_ON, true)
            .apply();

        setAlarm(context, hour, minute);
    }

    public static void cancelReminder(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        prefs.edit().putBoolean(KEY_REMINDER_ON, false).apply();

        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (am != null) {
            am.cancel(getPendingIntent(context));
        }
    }

    private static void rescheduleReminder(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        if (!prefs.getBoolean(KEY_REMINDER_ON, false)) return;

        int hour = prefs.getInt(KEY_REMINDER_HOUR, 6);
        int minute = prefs.getInt(KEY_REMINDER_MIN, 0);
        setAlarm(context, hour, minute);
    }

    private static void setAlarm(Context context, int hour, int minute) {
        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, hour);
        cal.set(Calendar.MINUTE, minute);
        cal.set(Calendar.SECOND, 0);

        if (cal.getTimeInMillis() <= System.currentTimeMillis()) {
            cal.add(Calendar.DAY_OF_YEAR, 1);
        }

        am.setRepeating(
            AlarmManager.RTC_WAKEUP,
            cal.getTimeInMillis(),
            AlarmManager.INTERVAL_DAY,
            getPendingIntent(context)
        );
    }

    private static PendingIntent getPendingIntent(Context context) {
        Intent intent = new Intent(context, ReminderReceiver.class);
        return PendingIntent.getBroadcast(context, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }
}
