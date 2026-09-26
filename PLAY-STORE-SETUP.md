# Dhun: Naam Jap & Sadhana — Play Store Setup Guide

## What's Ready

- **Capacitor project** configured with `com.caanshulkarwa.dhun` package ID
- **Android project** at `android/` — opens in Android Studio
- **AdMob integration** with test ad IDs (banner + interstitial)
- **App icons** and splash screen using your mala icon
- **All 55+ pages** included with AdMob script
- **Ads hidden** on prayer/reading screens (jap, mala, timer, lekhan, stotra reading)
- **Target SDK 36** (current Play Store requirement)

## Steps to Build & Publish

### 1. Open in Android Studio

```bash
npm run build          # copies web assets to www/
npx cap sync android   # syncs to android project
npx cap open android   # opens in Android Studio
```

Or just open the `android/` folder in Android Studio.

### 2. Generate Proper Icons (in Android Studio)

1. Right-click `app/src/main/res` → New → Image Asset
2. Select your `assets/icon-512.png` as source
3. It will generate properly sized adaptive icons for all densities
4. Do the same for Round Icon

### 3. Create Your AdMob Account

1. Go to https://admob.google.com
2. Create an account with your Google Play developer account
3. Create a new app → "Dhun: Naam Jap & Sadhana"
4. Create ad units:
   - **Banner** (ADAPTIVE_BANNER) → copy the ad unit ID
   - **Interstitial** → copy the ad unit ID
5. Copy your **App ID** (starts with `ca-app-pub-`)

### 4. Replace Test Ad IDs with Real Ones

Update these files with your real AdMob IDs:

**`android/app/src/main/AndroidManifest.xml`** — replace the APPLICATION_ID:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-YOUR_REAL_APP_ID"/>
```

**`js/admob.js`** — replace the test ad unit IDs:
```javascript
var AD_CONFIG = {
    bannerId: 'ca-app-pub-YOUR_REAL_BANNER_ID',
    interstitialId: 'ca-app-pub-YOUR_REAL_INTERSTITIAL_ID'
};
```

Also set `initializeForTesting: false` in admob.js.

Then rebuild: `npm run build && npx cap sync android`

### 5. Generate Signed AAB

1. In Android Studio: Build → Generate Signed Bundle / APK
2. Choose **Android App Bundle**
3. Create a new keystore (SAVE THIS FILE — you need it for every update):
   - Key store path: somewhere safe (NOT in the repo)
   - Password: strong password (write it down)
   - Key alias: `dhun`
   - Key password: same or different
   - Name: CA Anshul Karwa
   - Organization: CA Anshul Karwa
4. Select **release** build type
5. Click **Finish** — AAB will be at `android/app/release/app-release.aab`

### 6. Play Store Listing

Create a new app in Google Play Console:

- **App name**: Dhun: Naam Jap Mala & Sadhana
- **Short description**: Digital mala, jap counter, chalisa & stotra library for daily Hindu devotional practice. By CA Anshul Karwa.
- **Full description**: 
  > Dhun is a calm, private digital companion for Naam Jap, Naam Lekhan, mantra practice and daily sadhana.
  > 
  > Features:
  > • 108-bead digital mala with haptic feedback
  > • Jap counter with voice pronunciation
  > • Jap timer for timed sessions  
  > • 30+ chalisas and stotras with Hindi text
  > • Text-to-speech for all devotional texts
  > • Naam Lekhan (writing practice)
  > • Daily sadhana tracker
  > • Journey dashboard with streaks and milestones
  > • Background ambient sounds (bells, nature, temple)
  > • Works offline — your practice stays on your device
  > 
  > By CA Anshul Karwa
- **Category**: Lifestyle
- **Content rating**: Complete the questionnaire (will be "Everyone")
- **Privacy policy**: https://jap.studyfromnotes.com/privacy/

### 7. Screenshots for Play Store

You need:
- **Phone screenshots**: 2-8 screenshots (1080x1920 or similar)
- **Feature graphic**: 1024x500 banner image
- **App icon**: 512x512 (your existing icon-512.png)

Take screenshots of key screens:
1. Home page
2. Jap counter with mala
3. Digital mala (108 beads)
4. Stotra library
5. Stotra reading page
6. Journey dashboard

### 8. Upload & Publish

1. Upload the AAB to Play Console
2. Fill in all store listing details
3. Complete the content rating questionnaire
4. Set pricing: **Free** (with ads)
5. Submit for review (usually 1-3 days)

## Monetization Summary

| Revenue Stream | Status |
|---|---|
| Banner ads (non-prayer screens) | Ready (test IDs) |
| Interstitial ads (every 5 page views) | Ready (test IDs) |
| Remove Ads in-app purchase | Prepared in code (needs Play Billing setup) |

## Commands Reference

```bash
npm run build           # Build www/ from source
npm run cap:sync        # Build + sync to Android
npm run cap:open        # Open Android Studio
npm run cap:run         # Run on connected device/emulator
```

## Important Files

| File | Purpose |
|---|---|
| `capacitor.config.json` | Capacitor configuration |
| `js/admob.js` | AdMob integration (web layer) |
| `scripts/build.js` | Copies web assets to www/ |
| `android/app/src/main/AndroidManifest.xml` | Android manifest with AdMob App ID |
| `android/app/build.gradle` | Android build config |
| `android/variables.gradle` | SDK version config |
