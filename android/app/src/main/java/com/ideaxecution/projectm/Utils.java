package com.ideaxecution.projectm;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences.Editor;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;

import org.OpenUDID.OpenUDID_manager;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Iterator;
import java.util.Set;

@SuppressLint("ParserError")
public class Utils {
  
  public static boolean ENABLE_LOG = true;
  
  public static String ODID_STRING_PATH = "ixnama";

  public static String md5(String s) throws Exception {
    MessageDigest md = MessageDigest.getInstance("MD5");
    
    md.update(s.getBytes());
    
    byte digest[] = md.digest();
    StringBuffer result = new StringBuffer();
    
    for (int i = 0; i < digest.length; i++) {
      result.append(Integer.toHexString(0xFF & digest[i]));
    }
    return (result.toString());
  }
  
  public static String getExceptionStackTraceAsString(Exception exception) {
    StringWriter sw = new StringWriter();
    exception.printStackTrace(new PrintWriter(sw));
    return sw.toString();
  }
  
  public static String formatSize(long size) {
    String suffix = null;
    
    if (size >= 1024) {
      suffix = "KB";
      size /= 1024;
      if (size >= 1024) {
        suffix = "MB";
        size /= 1024;
      }
    }
    
    StringBuilder resultBuffer = new StringBuilder(Long.toString(size));
    
    int commaOffset = resultBuffer.length() - 3;
    while (commaOffset > 0) {
      resultBuffer.insert(commaOffset, ',');
      commaOffset -= 3;
    }
    
    if (suffix != null)
      resultBuffer.append(suffix);
    return resultBuffer.toString();
  }
  
  public static boolean externalMemoryAvailable() {
    return Environment.getExternalStorageState().equals(
        Environment.MEDIA_MOUNTED);
  }
  
  public static void writeToFile(String data, Context context, String path) {
    try {
      synchronized (MainActivity.sDataLock) {
        context.deleteFile(path);
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(
            context.openFileOutput(path, Context.MODE_APPEND));
        outputStreamWriter.write(data);
        outputStreamWriter.close();
      }
    } catch (IOException e) {
      Log.e("BT-AMA", "File write failed: " + e.toString());
    }
  }
  
  public static String readFromFile(String path, Context context) {
    
    String ret = "";
    try {
      synchronized (MainActivity.sDataLock) {
        InputStream inputStream = context.openFileInput(path);
        
        if (inputStream != null) {
          InputStreamReader inputStreamReader = new InputStreamReader(
              inputStream);
          BufferedReader bufferedReader = new BufferedReader(
              inputStreamReader);
          String receiveString = "";
          StringBuilder stringBuilder = new StringBuilder();
          
          while ((receiveString = bufferedReader.readLine()) != null) {
            stringBuilder.append(receiveString);
          }
          
          inputStream.close();
          ret = stringBuilder.toString();
        }
      }
    } catch (FileNotFoundException e) {
      Log.e("BT-AMA", "File not found: " + e.toString());
    } catch (IOException e) {
      Log.e("BT-AMA", "Can not read file: " + e.toString());
    }
    
    return ret;
  }
  
  private static String convertToHex(byte[] data) {
    StringBuilder buf = new StringBuilder();
    for (byte b : data) {
      int halfbyte = (b >>> 4) & 0x0F;
      int two_halfs = 0;
      do {
        buf.append((0 <= halfbyte) && (halfbyte <= 9) ? (char) ('0' + halfbyte)
            : (char) ('a' + (halfbyte - 10)));
        halfbyte = b & 0x0F;
      } while (two_halfs++ < 1);
    }
    return buf.toString();
  }
  
  public static String SHA1(String text) throws NoSuchAlgorithmException,
      UnsupportedEncodingException {
    MessageDigest md = MessageDigest.getInstance("SHA-1");
    md.update(text.getBytes("iso-8859-1"), 0, text.length());
    byte[] sha1hash = md.digest();
    return convertToHex(sha1hash);
  }
  
  
  public static void writeToSDFile(String data, String fileName) {
    try {
      Environment.getDownloadCacheDirectory();
      if (Utils.externalMemoryAvailable()) {
        File kpDir = new File(
            Environment.getExternalStorageDirectory(), "Android");
        if (!kpDir.mkdirs()) {
          Log.e("BT-AMA", "Directory not created");
          if (kpDir.exists() == false)
            return;
        }
        File file = new File(kpDir, fileName);
        if (file.exists())
          file.delete();
        try {
          FileOutputStream out = new FileOutputStream(file);
          out.write(data.getBytes());
          out.flush();
          out.close();
          
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    } catch (Exception e) {
      Log.e("BT-AMA", "File write failed: " + e.toString());
    }
  }
  
  public static String readFromSDFile(String fileName) {
    
    String ret = "";
    
    try {
      if (Utils.externalMemoryAvailable()) {
        File kpDir = new File(Environment.getExternalStorageDirectory(), "Android");
        if (!kpDir.mkdirs()) {
          Log.e("BT-AMA", "Directory not created");
          if (kpDir.exists() == false)
            return "";
        }
        File file = new File(kpDir, fileName);
        try {
          FileInputStream in = new FileInputStream(file);
          byte[] buffer = new byte[in.available()];
          in.read(buffer);
          ret = new String(buffer);
          in.close();
          
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    } catch (Exception e) {
      Log.e("BT-AMA", "File write failed: " + e.toString());
    }
    
    return ret;
  }
  
  public static boolean validateODID(String odid, Context context) {
    boolean isValid = false;
    
    if (odid == null || odid.trim().length() == 0)
      return false;
    
    try {
      
      String[] idsFromFile = odid.split("-");
      if (idsFromFile.length < 2)
        return false;
      
      String fileODID = idsFromFile[1];
      String fileHashODID = idsFromFile[0];
      
      OpenUDID_manager manager = new OpenUDID_manager(context);
      
      // Try to get the openudid from local preferences
      String localOpenUDID = manager.mPreferences.getString(
          OpenUDID_manager.PREF_KEY, null);
      if (localOpenUDID == null) {
        final Editor e = manager.mPreferences.edit();
        e.putString(OpenUDID_manager.PREF_KEY, fileODID);
        e.commit();
        return true;
      }
      
      String hashOfLocalODID = Utils.SHA1(localOpenUDID);
      
      if (fileODID.equalsIgnoreCase(localOpenUDID)
          && hashOfLocalODID.equalsIgnoreCase(fileHashODID))
        isValid = true;
      
    } catch (Exception e) {
      Log.e("BT-AMA", "Exception in validating ODID:" + e.getMessage());
    }
    
    return isValid;
  }
  
  public static void dumpIntent(Intent i){
    
    Bundle bundle = i.getExtras();
    if (bundle != null) {
      Set<String> keys = bundle.keySet();
      Iterator<String> it = keys.iterator();
      Log.e("Utils","Dumping Intent start");
      while (it.hasNext()) {
        String key = it.next();
        Log.e("Utils","[" + key + "=" + bundle.get(key)+"]");
      }
      Log.e("Utils","Dumping Intent end");
    }
  }
  
}
