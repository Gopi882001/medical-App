/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.ideaxecution.projectm;

import android.app.Activity;
import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * NOTE: There can only be one service in each app that receives FCM messages. If multiple
 * are declared in the Manifest then the first one will be chosen.
 *
 * In order to make this Java sample functional, you must remove the following from the Kotlin messaging
 * service in the AndroidManifest.xml:
 *
 * <intent-filter>
 *   <action android:name="com.google.firebase.MESSAGING_EVENT" />
 * </intent-filter>
 */
public class BFCMService extends FirebaseMessagingService {

    private static final String TAG = "BFCMService";

    /**
     * Called when message is received.
     *
     * @param remoteMessage Object representing the message received from Firebase Cloud Messaging.
     */
    // [START receive_message]
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // [START_EXCLUDE]
        // There are two types of messages data messages and notification messages. Data messages
        // are handled
        // here in onMessageReceived whether the app is in the foreground or background. Data
        // messages are the type
        // traditionally used with GCM. Notification messages are only received here in
        // onMessageReceived when the app
        // is in the foreground. When the app is in the background an automatically generated
        // notification is displayed.
        // When the user taps on the notification they are returned to the app. Messages
        // containing both notification
        // and data payloads are treated as notification messages. The Firebase console always
        // sends notification
        // messages. For more see: https://firebase.google.com/docs/cloud-messaging/concept-options
        // [END_EXCLUDE]

        // TODO(developer): Handle FCM messages here.
        // Not getting messages here? See why this may be: https://goo.gl/39bRNJ
        
        // Check if message contains a data payload.
        if (remoteMessage.getData().size() > 0) {
            
            String jsonString = remoteMessage.getData().get("data");
            if(jsonString!=null && jsonString.length()>0) {
                try {
                    JSONObject obj = new JSONObject(jsonString);
    
                    WritableMap params = Arguments.createMap();
                    String eventId = obj.getString("event_id");
                    if(eventId!=null&&eventId.length()>0) {
    
                        params.putString("event_id", eventId);
                        SharedPreferences preferences = MainActivity.getContext().getSharedPreferences(AppConstants.PREF_ID, Activity.MODE_PRIVATE);
                        preferences.edit().putString("auto_event_id", eventId).apply();
                        Log.d(TAG, "S E I " + eventId);
                        if (remoteMessage.getNotification() != null) {
                            params.putString("message", remoteMessage.getNotification().getBody());
                            preferences.edit().putString("auto_event_message", remoteMessage.getNotification().getBody()).apply();
                            Log.d(TAG, "S E M");
                        }
                        MainActivity.getContext().sendEvent("PUSH_EVENT_ID", params);
                    }
                } catch (JSONException e) {
//                    e.printStackTrace();
                }
                
            }
            
        }

        
        // Also if you intend on generating your own notifications as a result of a received FCM
        // message, here is where that should be initiated. See sendNotification method below.
    }
    // [END receive_message]


    // [START on_new_token]
    /**
     * There are two scenarios when onNewToken is called:
     * 1) When a new token is generated on initial app startup
     * 2) Whenever an existing token is changed
     * Under #2, there are three scenarios when the existing token is changed:
     * A) App is restored to a new device
     * B) User uninstalls/reinstalls the app
     * C) User clears app data
     */
    @Override
    public void onNewToken(String token) {
        Log.d(TAG, "Refreshed token: " + token);

        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // FCM registration token to your app server.
        sendRegistrationToServer(token);
    }
    // [END on_new_token]

    

    /**
     * Handle time allotted to BroadcastReceivers.
     */
    private void handleNow() {
        Log.d(TAG, "Short lived task is done.");
    }

    /**
     * Persist token to third-party servers.
     *
     * Modify this method to associate the user's FCM registration token with any
     * server-side account maintained by your application.
     *
     * @param token The new token.
     */
    private void sendRegistrationToServer(String token) {
        // TODO: Implement this method to send token to your app server.
  
      WritableMap params = Arguments.createMap();
      params.putString("device_push_token", token);
      MainActivity.getContext().sendEvent("DEVICE_PUSH_TOKEN", params);
    }

    /**
     * Create and show a simple notification containing the received FCM message.
     *
     * @param messageBody FCM message body received.
     */
    private void sendNotification(String messageBody) {
        // Intent intent = new Intent(this, MainActivity.class);
        // intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        // PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 /* Request code */, intent,
        //         PendingIntent.FLAG_ONE_SHOT);

        // String channelId = getString(R.string.default_notification_channel_id);
        // Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        // NotificationCompat.Builder notificationBuilder =
        //         new NotificationCompat.Builder(this, channelId)
        //                 .setSmallIcon(R.drawable.ic_stat_ic_notification)
        //                 .setContentTitle(getString(R.string.fcm_message))
        //                 .setContentText(messageBody)
        //                 .setAutoCancel(true)
        //                 .setSound(defaultSoundUri)
        //                 .setContentIntent(pendingIntent);

        // NotificationManager notificationManager =
        //         (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        // // Since android Oreo notification channel is needed.
        // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        //     NotificationChannel channel = new NotificationChannel(channelId,
        //             "Channel human readable title",
        //             NotificationManager.IMPORTANCE_DEFAULT);
        //     notificationManager.createNotificationChannel(channel);
        // }

        // notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());
    }
}