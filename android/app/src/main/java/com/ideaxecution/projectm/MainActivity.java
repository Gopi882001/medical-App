package com.ideaxecution.projectm;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.auth.api.identity.BeginSignInRequest;
import com.google.android.gms.auth.api.identity.BeginSignInResult;
import com.google.android.gms.auth.api.identity.Identity;
import com.google.android.gms.auth.api.identity.SignInClient;
import com.google.android.gms.auth.api.identity.SignInCredential;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.messaging.FirebaseMessaging;

import org.devio.rn.splashscreen.SplashScreen;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

public class MainActivity extends ReactActivity {

  private static final String TAG = "MainActivity";
  public static Object sDataLock = new Object();
  private static MainActivity mHandler = null;
  private boolean showOneTapUI = true;
  private static final int REQ_ONE_TAP = 2;
  SignInClient oneTapClient;
  BeginSignInRequest signInRequest;
  private FirebaseAnalytics mFirebaseAnalytics;

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Project M";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util
   * class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and
   * Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e.
        // React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
    );
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    mHandler = this;

    //SplashScreen.show(this); // here
    oneTapClient = Identity.getSignInClient(MainActivity.getContext());
    signInRequest = BeginSignInRequest.builder()
        .setGoogleIdTokenRequestOptions(BeginSignInRequest.GoogleIdTokenRequestOptions.builder()
            .setSupported(true)
            // Your server's client ID, not your Android client ID.
            // .setServerClientId("32716027270-hqkn5gjvmmiotru18t9mfnh4qs66419g.apps.googleusercontent.com")//beta-stage
            .setServerClientId("898956443938-ut7k6et7s1u1mi153cs73a1s3p71uefh.apps.googleusercontent.com")// prod
            // Only show accounts previously used to sign in.
            .setFilterByAuthorizedAccounts(false)

            .build())
        // Automatically sign in when exactly one credential is retrieved.
        .setAutoSelectEnabled(false)
        .build();
    // ReactInstanceManager mReactInstanceManager = this.getReactInstanceManager();
    // ReactApplicationContext context = (ReactApplicationContext)
    // mReactInstanceManager.getCurrentReactContext();
    // mReactInstanceManager.addReactInstanceEventListener(new
    // ReactInstanceManager.ReactInstanceEventListener() {
    // public void onReactContextInitialized(ReactContext validContext) {
    // // Use validContext here
    // reactContext = mReactInstanceManager.getCurrentReactContext();
    // }
    // });

    // Obtain the FirebaseAnalytics instance.
    mFirebaseAnalytics = FirebaseAnalytics.getInstance(this);

  }

  @Override
  protected void onStart() {
    super.onStart();
    // Log.d(TAG, "On Start ");
    // Utils.dumpIntent(getIntent());
    String jsonString = getIntent().getStringExtra("data");
    if (jsonString != null && jsonString.length() > 0) {
      try {
        JSONObject obj = new JSONObject(jsonString);

        String eventId = obj.getString("event_id");
        if (eventId != null && eventId.length() > 0) {
          // Log.d(TAG, "S E I " + eventId);
          SharedPreferences preferences = MainActivity.getContext().getSharedPreferences(AppConstants.PREF_ID,
              Activity.MODE_PRIVATE);
          preferences.edit().putString("auto_event_id", eventId).apply();
        }
      } catch (JSONException e) {
        // e.printStackTrace();
      }

    }

  }

  @Override
  protected void onResume() {
    super.onResume();

    // Utils.dumpIntent(getIntent());
    String jsonString = getIntent().getStringExtra("data");
    // Log.d(TAG, "On Resume " + jsonString);
    if (jsonString != null && jsonString.length() > 0) {
      try {
        JSONObject obj = new JSONObject(jsonString);

        String eventId = obj.getString("event_id");
        if (eventId != null && eventId.length() > 0) {
          // Log.d(TAG, "S E I " + eventId);
          SharedPreferences preferences = MainActivity.getContext().getSharedPreferences(AppConstants.PREF_ID,
              Activity.MODE_PRIVATE);
          preferences.edit().putString("auto_event_id", eventId).apply();
        }
      } catch (JSONException e) {
        // e.printStackTrace();
      }

    }
  }

  @Override
  protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
    super.onRestoreInstanceState(savedInstanceState);
  }

  public void sendEvent(String eventName,
      @Nullable WritableMap params) {

    runOnUiThread(new Runnable() {
      public void run() {
        boolean retry = true;
        Log.d(TAG, eventName + ":" + params);
        ReactInstanceManager rim = getReactInstanceManager();
        if (rim != null) {
          ReactContext rc = rim.getCurrentReactContext();
          if (rc != null) {
            rc.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
            retry = false;
            Log.d(TAG, eventName + " was sent from native successfully");
          }
        }
        if (retry) {
          new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
              sendEvent(eventName, params);
            }
          }, 5000);
        }
      }
    });

  }

  public void logEvent(String eventName,
      String parameters) {
    runOnUiThread(new Runnable() {
      public void run() {

        if (eventName != null) {
          Bundle params = new Bundle();
          if (parameters != null && parameters.length() > 0) {
            try {
              JSONObject obj = new JSONObject(parameters);
              Iterator iterator = obj.keys();
              while (iterator.hasNext()) {
                String keyName = (String) iterator.next();
                String value = obj.getString(keyName);
                params.putString(keyName, value);
              }
            } catch (JSONException e) {
            }
          }
          Log.d(TAG, "eventName:" + eventName + "---and Params" + params.toString());
          mFirebaseAnalytics.logEvent(eventName, params);

        }
      }
    });
  }

  public static MainActivity getContext() {
    return mHandler;
  }

  public void getPushToken() {
    FirebaseMessaging.getInstance().getToken()
        .addOnCompleteListener(new OnCompleteListener<String>() {
          @Override
          public void onComplete(@NonNull Task<String> task) {
            if (!task.isSuccessful()) {
              Log.w(TAG, "Fetching FCM registration token failed", task.getException());
              return;
            }

            // Get new FCM registration token
            String token = task.getResult();

            WritableMap params = Arguments.createMap();
            params.putString("device_push_token", token);
            sendEvent("DEVICE_PUSH_TOKEN", params);
          }
        });
  }

  public void startGoogleSignIn() {

    runOnUiThread(new Runnable() {
      public void run() {
        googleSignInAction();
      }
    });

  }

  public void startGoogleSignOut() {
    runOnUiThread(new Runnable() {
      public void run() {
        oneTapClient.signOut();
      }
    });
  }

  private void googleSignInAction() {
    Log.i(TAG, "trying google sign in");

    SharedPreferences preferences = this.getSharedPreferences(AppConstants.PREF_ID, Activity.MODE_PRIVATE);
    String val = preferences.getString("env", "");
    if (val != null && val.length() > 0) {
      int env = Integer.parseInt(val);
      if (env < 2) {
        signInRequest = BeginSignInRequest.builder()
            .setGoogleIdTokenRequestOptions(BeginSignInRequest.GoogleIdTokenRequestOptions.builder()
                .setSupported(true)
                // Your server's client ID, not your Android client ID.
                .setServerClientId("32716027270-hqkn5gjvmmiotru18t9mfnh4qs66419g.apps.googleusercontent.com")// beta-stage
                // .setServerClientId("898956443938-ut7k6et7s1u1mi153cs73a1s3p71uefh.apps.googleusercontent.com")//prod
                // Only show accounts previously used to sign in.
                .setFilterByAuthorizedAccounts(false)

                .build())
            // Automatically sign in when exactly one credential is retrieved.
            .setAutoSelectEnabled(false)
            .build();
      }
    }

    oneTapClient.beginSignIn(signInRequest)
        .addOnSuccessListener(this, new OnSuccessListener<BeginSignInResult>() {
          @Override
          public void onSuccess(BeginSignInResult result) {
            Log.i(TAG, "onSuccess(BeginSignInResult result)");
            try {
              startIntentSenderForResult(
                  result.getPendingIntent().getIntentSender(), REQ_ONE_TAP,
                  null, 0, 0, 0);
            } catch (IntentSender.SendIntentException e) {
              Log.e(TAG, "Couldn't start One Tap UI: " + e.getLocalizedMessage());
              WritableMap googleSignInData = Arguments.createMap();
              googleSignInData.putString("error", "Error in Google sign in");
              sendEvent("GOOGLE_SIGN_IN", googleSignInData);

            } catch (Exception e) {
              Log.e(TAG, e.getLocalizedMessage());
              WritableMap googleSignInData = Arguments.createMap();
              googleSignInData.putString("error", "Error in Google sign in");
              sendEvent("GOOGLE_SIGN_IN", googleSignInData);
            }

          }
        })
        .addOnFailureListener(this, new OnFailureListener() {
          @Override
          public void onFailure(@NonNull Exception e) {
            // No saved credentials found. Launch the One Tap sign-up flow, or
            // do nothing and continue presenting the signed-out UI.
            Log.d(TAG, e.getLocalizedMessage());
            WritableMap googleSignInData = Arguments.createMap();
            googleSignInData.putString("error", "Error in Google sign in");
            sendEvent("GOOGLE_SIGN_IN", googleSignInData);
          }
        });
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    Log.i(TAG, "onActivityResult with requestCode:" + requestCode);
    switch (requestCode) {
      case REQ_ONE_TAP:
        try {
          SignInCredential credential = oneTapClient.getSignInCredentialFromIntent(data);
          String idToken = credential.getGoogleIdToken();

          if (idToken != null) {
            // Got an ID token from Google. Use it to authenticate
            // with your backend.
            Log.d(TAG, "Got ID token.");
            WritableMap googleSignInData = Arguments.createMap();
            googleSignInData.putString("userID", credential.getId());

            WritableMap googleProfileData = Arguments.createMap();
            googleProfileData.putString("email", credential.getId());
            googleProfileData.putString("name", credential.getDisplayName());
            googleProfileData.putString("givenName", credential.getGivenName());
            googleProfileData.putString("familyName", credential.getFamilyName());

            if (credential.getProfilePictureUri() != null) {
              googleProfileData.putString("imageUrl", credential.getProfilePictureUri().toString());
              googleProfileData.putBoolean("hasImage", true);
            } else {
              googleProfileData.putBoolean("hasImage", false);
            }
            googleSignInData.putMap("profile", googleProfileData);

            WritableMap googleAuthData = Arguments.createMap();
            googleAuthData.putString("idToken", credential.getGoogleIdToken());
            googleAuthData.putString("platform", "android");

            googleSignInData.putMap("authData", googleAuthData);
            sendEvent("GOOGLE_SIGN_IN", googleSignInData);
          } else {
            WritableMap googleSignInData = Arguments.createMap();
            googleSignInData.putString("error", "Error in Google sign in");
            sendEvent("GOOGLE_SIGN_IN", googleSignInData);
          }
        } catch (ApiException e) {
          WritableMap googleSignInData = Arguments.createMap();
          googleSignInData.putString("error", "Error in Google sign in");

          switch (e.getStatusCode()) {
            case CommonStatusCodes.CANCELED:
              Log.d(TAG, "One-tap dialog was closed.");
              // Don't re-prompt the user.
              showOneTapUI = false;
              break;
            case CommonStatusCodes.NETWORK_ERROR:
              Log.d(TAG, "One-tap encountered a network error.");
              // Try again or just ignore.
              sendEvent("GOOGLE_SIGN_IN", googleSignInData);
              break;
            default:
              Log.d(TAG, "Couldn't get credential from result."
                  + e.getLocalizedMessage());
              sendEvent("GOOGLE_SIGN_IN", googleSignInData);
              break;
          }
        }
        break;
    }
  }

  public String getEventIdOnLinking() {
    SharedPreferences preferences = MainActivity.this.getSharedPreferences("event_id_on_linking",
        Activity.MODE_PRIVATE);
    String url = preferences.getString("event_id_on_linking", "");
    preferences.edit().putString("event_id_on_linking", null).apply();// "No name defined" is the default value.
    return url;
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }
}
