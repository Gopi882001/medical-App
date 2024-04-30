package com.ideaxecution.projectm;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.StatFs;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;

import org.OpenUDID.OpenUDID_manager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Locale;

public class NativeBridge extends ReactContextBaseJavaModule {
  //constructor
  private static final String TAG = "NativeBridge";
  
  public NativeBridge(ReactApplicationContext reactContext) {
    
    super(reactContext);
  }
  
  //Mandatory function getName that specifies the module name
  @Override
  public String getName() {
    return "NativeBridge";
  }
  
  //Custom function that we are going to export to JS
  @ReactMethod
  void getString(Promise promise) {
    promise.resolve("Hello from Native android!");
  }
  
  @ReactMethod
  public void getOpenUDID(Promise promise) {
    String openUDID = "";
    try {
      String idsFromFile = Utils.readFromFile(Utils.ODID_STRING_PATH, MainActivity.getContext());
      if (Utils.validateODID(idsFromFile, MainActivity.getContext())) {
        String[] idsArray = idsFromFile.split("-");
        openUDID = idsArray[1];
      }
      if (openUDID == null || openUDID.trim().length() != 40) {
        OpenUDID_manager.sync(MainActivity.getContext());
        openUDID = OpenUDID_manager.getOpenUDID();
        String anotherHash = Utils.SHA1(openUDID);
        String idToSave = anotherHash + "-" + openUDID;
        Utils.writeToFile(idToSave, MainActivity.getContext(), Utils.ODID_STRING_PATH);
      }
    } catch (Exception e) {
    
    }
    promise.resolve(openUDID);
  }
  
  @ReactMethod
  void isIPod(Promise promise) {
    promise.resolve(false);
  }
  
  @ReactMethod
  void setStringIntoKeychain(String key, String value, Promise promise) {
    boolean returnVal = false;
    try {
      if (key != null && value != null) {
        SharedPreferences preferences = MainActivity.getContext().getSharedPreferences(AppConstants.PREF_ID, Activity.MODE_PRIVATE);
        preferences.edit().putString(key, value).apply();
        returnVal = true;
        
        if(key.equalsIgnoreCase("envBeta")
            || key.equalsIgnoreCase("envStage")
            || key.equalsIgnoreCase("envProd")
        )
        {
          preferences.edit().putString("env",value).apply();
        }
        
      }
    } catch (Exception e) {
    
    }
    promise.resolve(returnVal);
  }

  @ReactMethod
  void nativeLog(String message, Promise promise) {
    try {
      if (message != null) {
        Log.i("IXN",message);
      }
    } catch (Exception e) {
    
    }
    promise.resolve(true);
  }
  
  @ReactMethod
  void logEvent(String eventName, String parameters, Promise promise) {
    try {
      MainActivity.getContext().logEvent(eventName, parameters);
    } catch (Exception e) {
    
    }
    promise.resolve(true);
  }
  
  @ReactMethod
  void getStringFromKeychain(String key, Promise promise) {
    String val = null;
    if (key != null) {
      try {
        SharedPreferences preferences = MainActivity.getContext().getSharedPreferences(AppConstants.PREF_ID, Activity.MODE_PRIVATE);
        val = preferences.getString(key, "");
      } catch (Exception ex) {
      }
    }
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getAutoEventId(Promise promise) {
    String val = null;
      try {
        SharedPreferences preferences = MainActivity.getContext().getSharedPreferences(AppConstants.PREF_ID, Activity.MODE_PRIVATE);
        val = preferences.getString("auto_event_id", "");
      } catch (Exception ex) {
      
      }
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getAutoEventMessage(Promise promise) {
    String val = null;
    try {
      SharedPreferences preferences = MainActivity.getContext().getSharedPreferences(AppConstants.PREF_ID, Activity.MODE_PRIVATE);
      val = preferences.getString("auto_event_message", "");
    } catch (Exception ex) {
    
    }
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void resetAutoEventId(Promise promise) {
    String val = null;
    try {
      SharedPreferences preferences = MainActivity.getContext().getSharedPreferences(AppConstants.PREF_ID, Activity.MODE_PRIVATE);
      preferences.edit().putString("auto_event_id","").apply();
      preferences.edit().putString("auto_event_message","").apply();
    } catch (Exception ex) {
  
    }
    promise.resolve(true);
  }
  
  
  @ReactMethod
  void isFTU(Promise promise) {
    boolean result = true;
    try {
      String val = Utils.readFromFile("ftu", MainActivity.getContext());
      
      if (val == null || val.trim().length() == 0) {
        result = false;
      }
      
    } catch (Exception e) {
    }
    promise.resolve(result);
  }
  
  @ReactMethod
  void getDeviceType(Promise promise) {
    promise.resolve("androidp");
    //To-do revisit Android tablet test
  }
  
  @ReactMethod
  void getIDFA(Promise promise) {
    AdvertisingIdClient.Info adInfo = null;
    String AdId = "";
    
    try {
      adInfo = AdvertisingIdClient.getAdvertisingIdInfo(MainActivity.getContext());
      if (adInfo.isLimitAdTrackingEnabled())
        AdId = "";
      else
        AdId = adInfo.getId();
    } catch (GooglePlayServicesNotAvailableException e) {
      //To-do revisit error handling
    } catch (GooglePlayServicesRepairableException e) {
      //To-do revisit error handling
      
    } catch (IOException e) {
      //To-do revisit error handling
    } catch (Exception e) {
      //To-do revisit error handling
    }
    promise.resolve(AdId);
  }
  
  @ReactMethod
  void getSystemFonts(Promise promise) {
    ArrayList<String> fontNames = new ArrayList<String>();
    File temp = new File("/system/fonts/");
    String fontSuffix = ".ttf";
  
    for(File font : temp.listFiles()) {
      String fontName = font.getName();
      if(fontName.endsWith(fontSuffix)) {
        fontNames.add(fontName.subSequence(0,fontName.lastIndexOf(fontSuffix)).toString());
      }
    }
    String fontNamesJson = "";
    if(fontNames.size()>0) {
      JSONArray arrayObj = new JSONArray(fontNames);
      JSONObject rootObj = new JSONObject();
      try {
        rootObj.put("system_fonts",arrayObj);
        fontNamesJson = rootObj.toString();
      } catch (JSONException e) {
        e.printStackTrace();
      }
    }
    promise.resolve(fontNamesJson);
  }
  
  @ReactMethod
  void getCountryCode(Promise promise) {
    String val = Locale.getDefault().getCountry();
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getCountryName(Promise promise) {
    String val = Locale.getDefault().getDisplayCountry();
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getSystemLocale(Promise promise) {
    String val = Locale.getDefault().getDisplayLanguage();
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getCurrentLocale(Promise promise) {
    String val = MainActivity.getContext().getResources().getConfiguration().locale.getLanguage();
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getMachineName(Promise promise) {
    String val = null;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      val = TextUtils.join(",", Build.SUPPORTED_ABIS);
    } else {
      val = Build.CPU_ABI;
    }
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void deviceName(Promise promise) {
    String val = null;
    val = Build.DEVICE;
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void systemName(Promise promise) {
    String val = null;
    val = "Android OS";
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getSystemVersion(Promise promise) {
    String val = null;
    val = Build.VERSION.RELEASE;
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void deviceModel(Promise promise) {
    String val = null;
    val = Build.MODEL;
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void localizedModel(Promise promise) {
    String val = null;
    val = Build.BRAND;
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getAppVersion(Promise promise) {
    String val = null;
    PackageManager myPackageMgr = MainActivity.getContext().getPackageManager();
    
    try {
      PackageInfo pInfo = myPackageMgr.getPackageInfo("com.ideaxecution.projectm", 0);
      val = pInfo.versionName;
    } catch (PackageManager.NameNotFoundException e) {
    
    }
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getAppleVenderUDID(Promise promise) {
    promise.resolve("");
  }
  
  @ReactMethod
  void getBundleId(Promise promise) {
    promise.resolve("com.ideaxecution.projectm");
  }
  
  @ReactMethod
  void getGoogleAccountID(Promise promise) {
    String val = null;
    
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//            Intent intent = AccountManager.newChooseAccountIntent(null,null,null,null,null,null,null);
//            MainActivity.getContext().startActivity
    } else {
      Account[] accounts = AccountManager.get(MainActivity.getContext()).getAccountsByType("google");
      
      for (Account account : accounts) {
        if (account.type.contains("google")) {
          val = account.name;
          break;
        }
      }
    }
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getManufacturer(Promise promise) {
    String val = null;
    val = Build.MANUFACTURER;
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void loginDay(Promise promise) {//To-do check this later
    promise.resolve(1);
  }
  
  @ReactMethod
  void getCacheDirectoryPath(Promise promise) {
    String val = null;
    
    File fileObj = MainActivity.getContext().getCacheDir();
    
    if (fileObj == null)
      fileObj = MainActivity.getContext().getFilesDir();
    
    val = fileObj.getAbsolutePath();
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getTotalRAMSize(Promise promise) {
    String val = null;
    
    try {
      ActivityManager actManager = (ActivityManager) MainActivity.getContext().getSystemService(Context.ACTIVITY_SERVICE);
      ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
      actManager.getMemoryInfo(memInfo);
      long totalMemory = memInfo.totalMem;
      val = "" + totalMemory;//Utils.formatSize(totalMemory);
      
    } catch (Exception ex) {
    }
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getTotalInternalMemorySize(Promise promise) {
    String val = null;
    
    try {
      File path = Environment.getDataDirectory();
      StatFs stat = new StatFs(path.getPath());
      long blockSize = 0;
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
        blockSize = stat.getBlockSizeLong();
      } else {
        blockSize = stat.getBlockSize();
      }
      
      long totalBlocks = 0;
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
        
        totalBlocks = stat.getBlockCountLong();
      } else {
        totalBlocks = stat.getBlockCount();
      }
      
      val = "" + totalBlocks * blockSize;//Utils.formatSize(totalBlocks * blockSize);
      
      
    } catch (Exception ex) {
    }
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getTotalExternalMemorySize(Promise promise) {
    String val = null;
    
    try {
      if (Utils.externalMemoryAvailable()) {
        File path = Environment.getExternalStorageDirectory();
        StatFs stat = new StatFs(path.getPath());
        long blockSize = 0;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
          
          blockSize = stat.getBlockSizeLong();
        } else {
          blockSize = stat.getBlockSize();
        }
        
        long totalBlocks = 0;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
          
          totalBlocks = stat.getBlockCountLong();
        } else {
          totalBlocks = stat.getBlockCount();
        }
        val = "" + totalBlocks * blockSize;//Utils.formatSize(totalBlocks * blockSize);
      }
      
    } catch (Exception ex) {
    }
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getAvailableRAMSize(Promise promise) {
    String val = null;
    
    try {
      ActivityManager actManager = (ActivityManager) MainActivity.getContext().getSystemService(Context.ACTIVITY_SERVICE);
      ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
      actManager.getMemoryInfo(memInfo);
      long totalMemory = memInfo.availMem;
      val = "" + totalMemory;//Utils.formatSize(totalMemory);
      
      
    } catch (Exception ex) {
    }
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  
  @ReactMethod
  void getAvailableInternalMemorySize(Promise promise) {
    String val = null;
    
    try {
      File path = Environment.getDataDirectory();
      StatFs stat = new StatFs(path.getPath());
      long blockSize = 0;
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
        
        blockSize = stat.getBlockSizeLong();
      } else {
        blockSize = stat.getBlockSize();
      }
      
      long availableBlocks = 0;
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
        
        availableBlocks = stat.getAvailableBlocksLong();
      } else {
        availableBlocks = stat.getAvailableBlocks();
      }
      
      val = "" + availableBlocks * blockSize;//Utils.formatSize(availableBlocks * blockSize);
      
      
    } catch (Exception ex) {
    }
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void getAvailableExternalMemorySize(Promise promise) {
    String val = null;
    
    try {
      if (Utils.externalMemoryAvailable()) {
        File path = Environment.getExternalStorageDirectory();
        StatFs stat = new StatFs(path.getPath());
        long blockSize = 0;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
          
          blockSize = stat.getBlockSizeLong();
        } else {
          blockSize = stat.getBlockSize();
        }
        
        long availableBlocks = 0;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
          
          availableBlocks = stat.getAvailableBlocksLong();
        } else {
          availableBlocks = stat.getAvailableBlocks();
        }
        val = "" + availableBlocks * blockSize; //Utils.formatSize(availableBlocks * blockSize);
      }
      
    } catch (Exception ex) {
    }
    
    if (val == null)
      val = "";
    promise.resolve(val);
  }
  
  @ReactMethod
  void canOpenURL(String packageName, Promise promise) {
    boolean val = false;
    
    PackageManager pm = MainActivity.getContext().getPackageManager();
    try {
      pm.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
      val = true;
    } catch (PackageManager.NameNotFoundException e) {
    }
    promise.resolve(val);
  }
  
  @ReactMethod
  void openURL(String packageName, Callback successCallback) {
    
    try {
      if(packageName!=null)
      {
        if(packageName.startsWith("http"))
        {
          Intent defaultBrowser = Intent.makeMainSelectorActivity(Intent.ACTION_MAIN, Intent.CATEGORY_APP_BROWSER);
          defaultBrowser.setData(Uri.parse(packageName));
          MainActivity.getContext().startActivity(defaultBrowser);
        }
        else
        {
          MainActivity.getContext().startActivity(MainActivity.getContext().getPackageManager().getLaunchIntentForPackage(packageName));
        }
      }
      
    } catch (Exception e) {
      successCallback.invoke(false);
    }
    successCallback.invoke(true);
  }
  
  @ReactMethod
  void cancelAllLocalNotifications(Promise promise) {
    
    //To-do implement later
    promise.resolve(true);
  }
  
  @ReactMethod
  void updateBadgeVal(Promise promise) {
    
    //To-do implement later
    promise.resolve(true);
  }
  
  @ReactMethod
  void takeNotificationPermission(Callback successCallback) {
    successCallback.invoke(false, null);
    
  }
  
  
  
  @ReactMethod
  void callBackMethod(String message,
                      Callback successCallback) {
    successCallback.invoke(message);
    
  }
  
  @ReactMethod
  void getPushToken(Promise promise) {
    
    MainActivity.getContext().getPushToken();
    promise.resolve(true);
  }

  @ReactMethod
  void clearCookies(Promise promise) {
    promise.resolve(true);
  }
  
  @ReactMethod
  void googleSignIn(Promise promise) {
    
    MainActivity.getContext().startGoogleSignIn();
    promise.resolve(true);
  }
  
  @ReactMethod
  void googleSignOut(Promise promise) {
    
    MainActivity.getContext().startGoogleSignOut();
    promise.resolve(true);
  }


  @ReactMethod
  void getEventIdOnLinking(Promise promise) {
  String eventUrl = MainActivity.getContext().getEventIdOnLinking();
    promise.resolve(eventUrl);
  }
}