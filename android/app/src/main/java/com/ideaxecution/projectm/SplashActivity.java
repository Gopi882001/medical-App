package com.ideaxecution.projectm;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
  private static final String TAG = "SplashActivity";
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // ATTENTION: This was auto-generated to handle app links.
    Intent appLinkIntent = getIntent();
    if(appLinkIntent != null){
      String appLinkAction = appLinkIntent.getAction();
      Uri appLinkData = appLinkIntent.getData();
      try {
        if(appLinkData != null){
          try {
            SharedPreferences preferences = SplashActivity.this.getSharedPreferences("event_id_on_linking", Activity.MODE_PRIVATE);
            preferences.edit().putString("event_id_on_linking", appLinkData.toString()).apply();
          } catch (Exception ex) {
          }
        }
      } catch(Exception e){
        Log.d("Alert", "No URL");
      }
    }

    }

  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    handleIntent(getIntent());
  }

  private void handleIntent(Intent intent) {
    String appLinkAction = intent.getAction();
    Uri appLinkData = intent.getData();
    if (Intent.ACTION_VIEW.equals(appLinkAction) && appLinkData != null) {
      String recipeId = appLinkData.getLastPathSegment();
      Uri appData = Uri.parse("content://com.ideaxecution.projectm/").buildUpon().build();

    }
  }
  @Override
  protected void onStart() {
    super.onStart();
    Intent intent = new Intent(this, MainActivity.class);
    
//    Utils.dumpIntent(getIntent());
    String extraString = getIntent().getStringExtra("data");
    
    if(extraString != null) {
//      Log.d(TAG,"Extra extraString event_id:"+extraString);
      intent.putExtra("data",extraString);
    }
    startActivity(intent);
    finish();
  }
}
