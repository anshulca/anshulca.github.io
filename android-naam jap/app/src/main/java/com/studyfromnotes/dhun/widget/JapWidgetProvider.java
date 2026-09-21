package com.studyfromnotes.dhun.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.widget.RemoteViews;

import com.studyfromnotes.dhun.R;

public class JapWidgetProvider extends AppWidgetProvider {

    private static final String ACTION_TAP = "com.studyfromnotes.dhun.widget.TAP";

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        for (int id : ids) {
            updateWidget(context, manager, id);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (ACTION_TAP.equals(intent.getAction())) {
            Intent launch = new Intent(Intent.ACTION_VIEW,
                Uri.parse("https://jap.studyfromnotes.com/jap/"));
            launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(launch);
        }
    }

    private void updateWidget(Context context, AppWidgetManager manager, int id) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_jap);

        // Open app on tap
        Intent tapIntent = new Intent(context, JapWidgetProvider.class);
        tapIntent.setAction(ACTION_TAP);
        PendingIntent pending = PendingIntent.getBroadcast(context, 0, tapIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_root, pending);

        views.setTextViewText(R.id.widget_title, "Dhun");
        views.setTextViewText(R.id.widget_subtitle, "Tap to begin jap");

        manager.updateAppWidget(id, views);
    }

    public static void refreshAll(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        int[] ids = manager.getAppWidgetIds(
            new ComponentName(context, JapWidgetProvider.class));
        if (ids.length > 0) {
            Intent intent = new Intent(context, JapWidgetProvider.class);
            intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
            context.sendBroadcast(intent);
        }
    }
}
