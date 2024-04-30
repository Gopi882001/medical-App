package com.ideaxecution.projectm;


import android.app.backup.BackupAgentHelper;
import android.app.backup.BackupDataInput;
import android.app.backup.BackupDataOutput;
import android.app.backup.FileBackupHelper;
import android.os.ParcelFileDescriptor;
import android.util.Log;

import java.io.IOException;

public class PeepalBackupAgent extends BackupAgentHelper {
  
  // A key to uniquely identify the set of backup data
  static final String FILES_BACKUP_KEY = "ixnpplfiles";
  
  // Allocate a helper and add it to the backup agent
  @Override
  public void onCreate() {
    
    
    FileBackupHelper helper = new FileBackupHelper(this,
        Utils.ODID_STRING_PATH);
    addHelper(FILES_BACKUP_KEY, helper);
    
    Log.d("BT-AMA", "onCreate");
    
    
  }
  
  
  @Override
  public void onBackup(ParcelFileDescriptor oldState, BackupDataOutput data,
                       ParcelFileDescriptor newState) throws IOException {
    // Hold the lock while the FileBackupHelper performs backup
    synchronized (MainActivity.sDataLock) {
      super.onBackup(oldState, data, newState);
    }
    Log.d("BT-AMA", "onBackup");
  }
  
  @Override
  public void onRestore(BackupDataInput data, int appVersionCode,
                        ParcelFileDescriptor newState) throws IOException {
    // Hold the lock while the FileBackupHelper restores the file
    synchronized (MainActivity.sDataLock) {
      super.onRestore(data, appVersionCode, newState);
    }
    Log.d("BT-AMA", "onRestore");
  }
}


