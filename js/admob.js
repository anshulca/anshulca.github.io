/* =========================================================================
   DHUN · AdMob Integration (Capacitor)
   Shows banner ads on non-prayer screens. Hides during active jap/reading.
   Uses Google test ad IDs — replace before publishing to Play Store.
   ========================================================================= */
(function (global) {
  'use strict';

  var isNative = global.Capacitor && global.Capacitor.isNativePlatform && global.Capacitor.isNativePlatform();
  if (!isNative) return;

  var AD_CONFIG = {
    bannerId: 'ca-app-pub-3940256099942544/6300978111',
    interstitialId: 'ca-app-pub-3940256099942544/1033173712'
  };

  var ADS_REMOVED_KEY = 'nj:ads-removed';
  var interstitialCount = 0;
  var INTERSTITIAL_EVERY = 5;

  function adsRemoved() {
    try { return global.localStorage.getItem(ADS_REMOVED_KEY) === '1'; } catch (e) { return false; }
  }

  function isQuietPage() {
    var path = global.location.pathname;
    return path.indexOf('/naam-jap/') >= 0 ||
           path.indexOf('/digital-mala/') >= 0 ||
           path.indexOf('/jap-timer/') >= 0 ||
           path.indexOf('/custom-naam-jap/') >= 0 ||
           path.indexOf('/naam-lekhan/') >= 0 ||
           path.indexOf('/custom-naam-lekhan/') >= 0 ||
           (path.indexOf('/stotra/') >= 0 && path.indexOf('/stotra/') < path.length - 7);
  }

  function initAdMob() {
    if (adsRemoved()) return;

    var AdMob = global.Capacitor.Plugins.AdMob;
    if (!AdMob) return;

    AdMob.initialize({
      initializeForTesting: true
    }).then(function () {
      if (!isQuietPage()) {
        showBanner(AdMob);
      }
    }).catch(function () {});

    global.NJ_ADS = {
      showBanner: function () { if (!adsRemoved()) showBanner(AdMob); },
      hideBanner: function () { AdMob.removeBanner().catch(function () {}); },
      showInterstitial: function () {
        if (adsRemoved()) return;
        interstitialCount++;
        if (interstitialCount % INTERSTITIAL_EVERY !== 0) return;
        AdMob.prepareInterstitial({ adId: AD_CONFIG.interstitialId })
          .then(function () { return AdMob.showInterstitial(); })
          .catch(function () {});
      },
      removeAds: function () {
        try { global.localStorage.setItem(ADS_REMOVED_KEY, '1'); } catch (e) {}
        AdMob.removeBanner().catch(function () {});
      }
    };
  }

  function showBanner(AdMob) {
    AdMob.showBanner({
      adId: AD_CONFIG.bannerId,
      adSize: 'ADAPTIVE_BANNER',
      position: 'BOTTOM_CENTER',
      margin: 0
    }).catch(function () {});
  }

  if (global.document.readyState === 'loading') {
    global.document.addEventListener('DOMContentLoaded', initAdMob);
  } else {
    initAdMob();
  }

})(typeof window !== 'undefined' ? window : this);
