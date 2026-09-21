# Dhun: Naam Jap Mala & Sadhana — Android Setup

## Prerequisites
- Android Studio (latest stable)
- JDK 17+
- Firebase project created at https://console.firebase.google.com

## Steps

### 1. Firebase Setup
1. Go to Firebase Console → Create project "Dhun"
2. Add Android app with package: `com.studyfromnotes.dhun`
3. Download `google-services.json` → place in `app/` folder
4. Enable Cloud Messaging in Firebase Console

### 2. Keystore
Generate a release keystore:
```bash
keytool -genkey -v -keystore dhun-release.jks -keyalias dhun -keyalg RSA -keysize 2048 -validity 10000
```
Place `dhun-release.jks` in `app/` and update `app/build.gradle` signing config.

### 3. Digital Asset Links (TWA Verification)
Get your SHA-256 fingerprint:
```bash
keytool -list -v -keystore dhun-release.jks -alias dhun
```
Create `/.well-known/assetlinks.json` on your web server (jap.studyfromnotes.com):
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.studyfromnotes.dhun",
    "sha256_cert_fingerprints": ["YOUR_SHA256_HERE"]
  }
}]
```

### 4. Build
```bash
cd "android-naam jap"
./gradlew assembleRelease    # produces AAB
./gradlew bundleRelease      # AAB for Play Store upload
```

### 5. Play Store Listing
- **App name**: Dhun: Naam Jap Mala & Sadhana
- **Package**: com.studyfromnotes.dhun
- **Category**: Lifestyle → Spirituality
- **Content rating**: Everyone
- **Privacy policy**: https://jap.studyfromnotes.com/privacy/

### 6. Daily Reminder Setup
The app uses AlarmManager for local daily reminders. To enable FCM for server-pushed notifications:
1. Set up Firebase Cloud Functions or a server
2. Use FCM topics: subscribe users to `daily_sadhana`
3. Send scheduled notifications via Firebase Console or cron

### Project Structure
```
app/src/main/
├── java/com/studyfromnotes/dhun/
│   ├── DhunApplication.java      — App init, notification channels
│   ├── DhunFirebaseService.java   — FCM message handler
│   ├── ReminderReceiver.java      — Local daily reminder
│   ├── BootReceiver.java          — Re-schedule reminders on reboot
│   └── widget/
│       └── JapWidgetProvider.java — Home screen widget
├── res/
│   ├── layout/widget_jap.xml     — Widget layout
│   ├── xml/widget_jap_info.xml   — Widget metadata
│   ├── drawable/                  — Icons, backgrounds
│   └── values/                    — Strings, colors, themes
└── AndroidManifest.xml
```
