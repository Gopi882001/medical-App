//
//  NativeBridge.m
//  ProjectM
//
//  Created by RajaReddy on 08/02/24.
//

#import <Foundation/Foundation.h>
#import "NativeBridge.h"
#import <AdSupport/AdSupport.h>
#import "UICKeyChainStore.h"
#import "NUOpenUDID.h"
#import <sys/utsname.h>
#import <objc/runtime.h>
#import <objc/message.h>
#include <mach/mach_host.h>
#import <UserNotifications/UserNotifications.h>
#import <WebKit/WebKit.h>
#import "AppDelegate.h"
#import <AuthenticationServices/AuthenticationServices.h>

//@import GoogleSignIn;

#define OPEN_UDID @"ODID"
#define APP_NAME @"PROJECTM"

@implementation NativeBridge

+ (instancetype)allocWithZone:(struct _NSZone *)zone
{
  static NativeBridge *shared = nil;
  static dispatch_once_t once;
  dispatch_once(&once, ^{
    shared = [super allocWithZone:zone];
  });
  return shared;
}

RCT_EXPORT_MODULE();

+(BOOL) keychainSaveValue:(NSString*) value forKey:(NSString*) key
{
  if(key != nil && value != nil)
  {
    UICKeyChainStore *keychain = [UICKeyChainStore keyChainStoreWithService:APP_NAME];
    [keychain setString:value forKey:key];
    [keychain synchronize];
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setValue:value forKey:key];
    [defaults synchronize];
//    NSLog(@"key: %@ and value: %@",key,value);
    if([key isEqualToString:@"envBeta"])
    {
      
      //[GIDSignIn sharedInstance].clientID = @"32716027sdf270-08jr3bskjkhjkhbb7gefcm73mfvbg5cgku0t7.apps.googleusercontent.com";
    
    }
    else if([key isEqualToString:@"envStage"])
    {
      
      //[GIDSignIn sharedInstance].clientID = @"327160skjjhkhdfs27270-08jr3bskhbb7gefcm73mfvbg5cgku0t7.apps.googleusercontent.com";
    
    }
    else if([key isEqualToString:@"envProd"])
    {
      
      //[GIDSignIn sharedInstance].clientID = @"8989564asdfakjjlksdf43938-gh4hvchn91nve5hafkr05n0nhodqhvpl.apps.googleusercontent.com";
    
    }
    return TRUE;
  }
  return FALSE;
}

+(NSString*) keychainGetValueForKey:(NSString*) key
{
  NSString *value = @"";
  if(key != nil)
  {
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    value = [defaults valueForKey:key];
    
    if(value == nil)
    {
      
      UICKeyChainStore *keychain = [UICKeyChainStore keyChainStoreWithService:APP_NAME];

      value = [keychain stringForKey:key];
      
      if(value == nil)
      {
        value = @"";
      }
    }
  }
  return value;
}

+(UIWindow*) keyWindow {
    UIWindow *windowRoot = nil;
    NSArray  *windows = [[UIApplication sharedApplication] windows];
    for (UIWindow *window in windows) {
        if (window.isKeyWindow) {
            windowRoot = window;
            break;
        }
    }
    return windowRoot;
}

+(NSString *)dateStr: (NSDate *)date {

  if(date==nil)
    return @"";
  NSDateComponents *components = [[NSCalendar currentCalendar] components:NSCalendarUnitDay | NSCalendarUnitMonth | NSCalendarUnitYear | NSCalendarUnitHour | NSCalendarUnitMinute fromDate: date];
  NSString *dateAsString = [NSString stringWithFormat:@"%ld-%ld-%ld %ld:%ld", [components month], [components day], [components year], [components hour], [components minute]];

  return dateAsString;

}


#pragma mark - JS Exposed Methods
#pragma mark getString
RCT_REMAP_METHOD(getString,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter: (RCTPromiseRejectBlock)reject)
{
  NSString *thingToReturn = @"Hello from Native iOS!";
  resolve(thingToReturn);
}

#pragma mark callBackMethod
RCT_EXPORT_METHOD(callBackMethod:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
  callback(@[[input stringByReplacingOccurrencesOfString:@"First" withString:@"Second"]]);
}


#pragma mark getDeviceType
RCT_REMAP_METHOD(getDeviceType,
                 getDeviceTypeResolver: (RCTPromiseResolveBlock)resolve
                 getDeviceTypeRejector: (RCTPromiseRejectBlock)reject)
{
  //    'ipad' 1,'iphone' 2,'ipod' 3,'androidp' 4,'androidt' 5,'pc' 6
  
  NSString* deviceType = @"iphone";
  
  if([[[UIDevice currentDevice] model] rangeOfString:@"iPad"].location!=NSNotFound)
      deviceType = @"ipad";
  else if([[[UIDevice currentDevice] model] rangeOfString:@"iPod"].location!=NSNotFound)
      deviceType = @"ipod";
  
  resolve(deviceType);
}


#pragma mark isIPod
RCT_REMAP_METHOD(isIPod,
                 isIPodResolver: (RCTPromiseResolveBlock)resolve
                 isIPodRejector: (RCTPromiseRejectBlock)reject)
{
  BOOL isPod = FALSE;
  if([[[UIDevice currentDevice] model] rangeOfString:@"iPod"].location!=NSNotFound)
      isPod = TRUE;
  resolve([NSNumber numberWithBool:isPod]);
}

#pragma mark isAndroidPhone
RCT_REMAP_METHOD(isAndroidPhone,
                 isAndroidPhoneResolver: (RCTPromiseResolveBlock)resolve
                 isAndroidPhoneRejector: (RCTPromiseRejectBlock)reject)
{
  BOOL isAndroidPhone = FALSE;
  resolve([NSNumber numberWithBool:isAndroidPhone]);
}

#pragma mark isAndroidTablet
RCT_REMAP_METHOD(isAndroidTablet,
                 isAndroidTabletResolver: (RCTPromiseResolveBlock)resolve
                 isAndroidTabletRejector: (RCTPromiseRejectBlock)reject)
{
  BOOL isAndroidTablet = FALSE;
  resolve([NSNumber numberWithBool:isAndroidTablet]);
}

#pragma mark isIPad
RCT_REMAP_METHOD(isIPad,
                 isIPadResolver: (RCTPromiseResolveBlock)resolve
                 isIPadRejector: (RCTPromiseRejectBlock)reject)
{
  BOOL isIPad = FALSE;
  if([[[UIDevice currentDevice] model] rangeOfString:@"iPad"].location!=NSNotFound)
      isIPad = TRUE;
  
  resolve([NSNumber numberWithBool:isIPad]);
}

#pragma mark isIPhone
RCT_REMAP_METHOD(isIPhone,
                 isIPhoneResolver: (RCTPromiseResolveBlock)resolve
                 isIPhoneRejector: (RCTPromiseRejectBlock)reject)
{
  BOOL isIPhone = FALSE;
  if([[[UIDevice currentDevice] model] rangeOfString:@"iPhone"].location!=NSNotFound)
    isIPhone = TRUE;
  
  resolve([NSNumber numberWithBool:isIPhone]);
}

#pragma mark getStringFromKeychain
RCT_REMAP_METHOD(getStringFromKeychain,
                 key: (NSString* ) key
                 getStringFromKeychainResolver: (RCTPromiseResolveBlock)resolve
                 getStringFromKeychainRejector: (RCTPromiseRejectBlock)reject)
{
  NSString *value = @"";
  value = [NativeBridge keychainGetValueForKey:key];
  resolve(value);
}

#pragma mark setStringIntoKeychain
RCT_REMAP_METHOD(setStringIntoKeychain,
                 setKey: (NSString* ) key
                 setValue: (NSString* ) value
                 getStringFromKeychainResolver: (RCTPromiseResolveBlock)resolve
                 getStringFromKeychainRejector: (RCTPromiseRejectBlock)reject)
{
  BOOL success = [NativeBridge keychainSaveValue:value forKey:key];
  resolve([NSNumber numberWithBool:success]);
}

#pragma mark resetAutoEventId
RCT_REMAP_METHOD(resetAutoEventId,
                 resetAutoEventIdResolver: (RCTPromiseResolveBlock)resolve
                 resetAutoEventIdRejector: (RCTPromiseRejectBlock)reject)
{
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  [defaults setValue:@"" forKey:@"auto_event_id"];
  [defaults setValue:@"" forKey:@"auto_event_message"];
  [defaults synchronize];
  resolve([NSNumber numberWithBool:YES]);
}

#pragma mark getAutoEventId
RCT_REMAP_METHOD(getAutoEventId,
                 getAutoEventIdResolver: (RCTPromiseResolveBlock)resolve
                 getAutoEventIdRejector: (RCTPromiseRejectBlock)reject)
{
  NSString *value = @"";
  value = [NativeBridge keychainGetValueForKey:@"auto_event_id"];
  resolve(value);
}

#pragma mark getAutoEventMessage
RCT_REMAP_METHOD(getAutoEventMessage,
                 getAutoEventMessageResolver: (RCTPromiseResolveBlock)resolve
                 getAutoEventMessageRejector: (RCTPromiseRejectBlock)reject)
{
  NSString *value = @"";
  value = [NativeBridge keychainGetValueForKey:@"auto_event_message"];
  resolve(value);
}

#pragma mark isFTU
RCT_REMAP_METHOD(isFTU,//First time User
                 isFTUResolver: (RCTPromiseResolveBlock)resolve
                 isFTURejector: (RCTPromiseRejectBlock)reject)
{
  BOOL isFTU = FALSE;
  
  NSString *ftuStr = [NativeBridge keychainGetValueForKey:@"ftu"];
  if(ftuStr.length==0)
  {
    isFTU = true;
    [NativeBridge keychainSaveValue:@"1" forKey:@"ftu"];
  }

  resolve([NSNumber numberWithBool:isFTU]);
}


#pragma mark getIDFA
RCT_REMAP_METHOD(getIDFA,
                 getIDFAResolver: (RCTPromiseResolveBlock)resolve
                 getIDFARejector: (RCTPromiseRejectBlock)reject)
{
  NSString* appleIDFA= @"";
  
  if([[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled])
      appleIDFA = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];

  //TODO implement iOS 14 AppTrackingFramework
  
  resolve(appleIDFA);
}

#pragma mark getOpenUDID
RCT_REMAP_METHOD(getOpenUDID,
                 getOpenUDIDResolver: (RCTPromiseResolveBlock)resolve
                 getOpenUDIDRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString *savedODID = [NativeBridge keychainGetValueForKey:OPEN_UDID];
  
  if(savedODID==nil||[savedODID length]==0)
  {
    savedODID = [NUOpenUDID value];
    [NativeBridge keychainSaveValue:savedODID forKey:OPEN_UDID];
  }
  resolve(savedODID);
}

#pragma mark getCountryCode
RCT_REMAP_METHOD(getCountryCode,
                 getCountryCodeResolver: (RCTPromiseResolveBlock)resolve
                 getCountryCodeRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSLocale* currentLocale = [NSLocale currentLocale];  // get the current locale.
  NSString* countryCode = [currentLocale objectForKey:NSLocaleCountryCode];
  
  resolve(countryCode);
}

#pragma mark getCountryName
RCT_REMAP_METHOD(getCountryName,
                 getCountryNameResolver: (RCTPromiseResolveBlock)resolve
                 getCountryNameRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSLocale* currentLocale = [NSLocale currentLocale];  // get the current locale.
  NSString* countryCode = [currentLocale objectForKey:NSLocaleCountryCode];
  
  NSString *country = [currentLocale displayNameForKey: NSLocaleCountryCode value: countryCode];
  
  resolve(country);
}

#pragma mark getSystemLocale
RCT_REMAP_METHOD(getSystemLocale,
                 getSystemLocaleResolver: (RCTPromiseResolveBlock)resolve
                 getSystemLocaleRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSLocale *locale = [NSLocale currentLocale];
  
  NSString *language = [locale displayNameForKey:NSLocaleIdentifier
                                           value:[locale localeIdentifier]];
  
  resolve(language);
}

#pragma mark getCurrentLocale
RCT_REMAP_METHOD(getCurrentLocale,
                 getCurrentLocaleResolver: (RCTPromiseResolveBlock)resolve
                 getCurrentLocaleRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString * language = [[NSLocale preferredLanguages] objectAtIndex:0];
  
  resolve(language);
}

#pragma mark getAppleVenderUDID
RCT_REMAP_METHOD(getAppleVenderUDID,
                 getAppleVenderUDIDResolver: (RCTPromiseResolveBlock)resolve
                 getAppleVenderUDIDRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* appleUUIDForVender= [[[UIDevice currentDevice] identifierForVendor] UUIDString];
  
  resolve(appleUUIDForVender);
}

#pragma mark getMachineName
RCT_REMAP_METHOD(getMachineName,
                 getMachineNameResolver: (RCTPromiseResolveBlock)resolve
                 getMachineNameRejector: (RCTPromiseRejectBlock)reject)
{
  
  struct utsname systemInfo;
  uname(&systemInfo);
  NSString *machineName = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
  resolve(machineName);
}

#pragma mark deviceName
RCT_REMAP_METHOD(deviceName,
                 deviceNameResolver: (RCTPromiseResolveBlock)resolve
                 deviceNameRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* deviceName= [[UIDevice currentDevice] name];
  
  resolve(deviceName);
}

#pragma mark systemName
RCT_REMAP_METHOD(systemName,
                 systemNameResolver: (RCTPromiseResolveBlock)resolve
                 systemNameRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* systemName= [[UIDevice currentDevice] systemName];
  
  resolve(systemName);
}

#pragma mark deviceModel
RCT_REMAP_METHOD(deviceModel,
                 deviceModelResolver: (RCTPromiseResolveBlock)resolve
                 deviceModelRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* deviceModel= [[UIDevice currentDevice] model];
  
  resolve(deviceModel);
}

#pragma mark localizedModel
RCT_REMAP_METHOD(localizedModel,
                 localizedModelResolver: (RCTPromiseResolveBlock)resolve
                 localizedModelRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* localizedModel= [[UIDevice currentDevice] localizedModel];
  
  resolve(localizedModel);
}

#pragma mark getAppVersion
RCT_REMAP_METHOD(getAppVersion,
                 getAppVersionResolver: (RCTPromiseResolveBlock)resolve
                 getAppVersionRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSDictionary* infoDict = [[NSBundle mainBundle] infoDictionary];
  NSString* versionStr = [infoDict objectForKey:@"CFBundleVersion"];
  
  resolve(versionStr);
}

#pragma mark getSystemVersion
RCT_REMAP_METHOD(getSystemVersion,
                 systemVersionResolver: (RCTPromiseResolveBlock)resolve
                 systemVersionRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* systemVersion= [[UIDevice currentDevice] systemVersion];
  
  resolve(systemVersion);
}

#pragma mark getBundleId
RCT_REMAP_METHOD(getBundleId,
                 getBundleIdResolver: (RCTPromiseResolveBlock)resolve
                 getBundleIdRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* bundleId= [[NSBundle mainBundle] bundleIdentifier];
  
  resolve(bundleId);
}

#pragma mark getAvailableExternalMemorySize
RCT_REMAP_METHOD(getAvailableExternalMemorySize,
                 getAvailableExternalMemorySizeResolver: (RCTPromiseResolveBlock)resolve
                 getAvailableExternalMemorySizeRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* availableExternalMemorySize = @"0";
  
  resolve(availableExternalMemorySize);
}

#pragma mark getAvailableInternalMemorySize
RCT_REMAP_METHOD(getAvailableInternalMemorySize,
                 getAvailableInternalMemorySizeResolver: (RCTPromiseResolveBlock)resolve
                 getAvailableInternalMemorySizeRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString *strValue = @"0";
  uint64_t totalFreeSpace = 0;
  NSError *error = nil;
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSDictionary *dictionary = [[NSFileManager defaultManager] attributesOfFileSystemForPath:[paths lastObject] error: &error];
  
  if (dictionary) {
      NSNumber *freeFileSystemSizeInBytes = [dictionary objectForKey:NSFileSystemFreeSize];
      totalFreeSpace = [freeFileSystemSizeInBytes unsignedLongLongValue];
      strValue = [NSString stringWithFormat:@"%lld",totalFreeSpace];
  }
  resolve(strValue);
}

#pragma mark getAvailableRAMSize
RCT_REMAP_METHOD(getAvailableRAMSize,
                 getAvailableRAMSizeResolver: (RCTPromiseResolveBlock)resolve
                 getAvailableRAMSizeRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString *strValue = @"0";
  
  host_basic_info_data_t hostInfo;
  mach_msg_type_number_t infoCount;
  
  infoCount = HOST_BASIC_INFO_COUNT;
  host_info( mach_host_self(), HOST_BASIC_INFO, (host_info_t)&hostInfo, &infoCount ) ;
  
  strValue = [NSString stringWithFormat:@"%lld",hostInfo.memory_size];
  resolve(strValue);
}

#pragma mark getTotalExternalMemorySize
RCT_REMAP_METHOD(getTotalExternalMemorySize,
                 getTotalExternalMemorySizeResolver: (RCTPromiseResolveBlock)resolve
                 getTotalExternalMemorySizeRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* totalExternalMemorySize = @"0";
  
  resolve(totalExternalMemorySize);
}

#pragma mark getTotalInternalMemorySize
RCT_REMAP_METHOD(getTotalInternalMemorySize,
                 getTotalInternalMemorySizeResolver: (RCTPromiseResolveBlock)resolve
                 getTotalInternalMemorySizeRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString *strValue = @"0";
  uint64_t totalSpace = 0;
  NSError *error = nil;
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSDictionary *dictionary = [[NSFileManager defaultManager] attributesOfFileSystemForPath:[paths lastObject] error: &error];
  
  if (dictionary) {
      NSNumber *fileSystemSizeInBytes = [dictionary objectForKey: NSFileSystemSize];
      totalSpace = [fileSystemSizeInBytes unsignedLongLongValue];
      strValue = [NSString stringWithFormat:@"%lld",totalSpace];
  }
  resolve(strValue);
}

#pragma mark getTotalRAMSize
RCT_REMAP_METHOD(getTotalRAMSize,
                 getTotalRAMSizeResolver: (RCTPromiseResolveBlock)resolve
                 getTotalRAMSizeRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString* getTotalRAMSize = [NSString stringWithFormat:@"%lld",[NSProcessInfo processInfo].physicalMemory];
  
  resolve(getTotalRAMSize);
}

#pragma mark getCacheDirectoryPath
RCT_REMAP_METHOD(getCacheDirectoryPath,
                 getCacheDirectoryPathResolver: (RCTPromiseResolveBlock)resolve
                 getCacheDirectoryPathRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
  NSString *cacheDirectory = [paths objectAtIndex:0];

  resolve(cacheDirectory);
}

#pragma mark getGoogleAccountID
RCT_REMAP_METHOD(getGoogleAccountID,
                 getGoogleAccountIDResolver: (RCTPromiseResolveBlock)resolve
                 getGoogleAccountIDRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString *strVal = @"";
  
  resolve(strVal);
}

#pragma mark getManufacturer
RCT_REMAP_METHOD(getManufacturer,
                 getManufacturerResolver: (RCTPromiseResolveBlock)resolve
                 getManufacturerRejector: (RCTPromiseRejectBlock)reject)
{
  
  NSString *strVal = @"Apple";
  
  resolve(strVal);
}

#pragma mark loginDay
RCT_REMAP_METHOD(loginDay,
                 loginDayResolver: (RCTPromiseResolveBlock)resolve
                 loginDayRejector: (RCTPromiseRejectBlock)reject)
{
  int day = 0;
  
  NSTimeInterval timeInterval = [NSDate date].timeIntervalSince1970;
  
  NSString *savedTimeIntervalStr = [NativeBridge keychainGetValueForKey:@"timeInterval"];
  
  NSTimeInterval savedTimeInterval = [savedTimeIntervalStr floatValue];
  if(savedTimeInterval>0)
  {
      int dayDifference = (timeInterval-savedTimeInterval)/(60*60*24);
      
      if(dayDifference>1)
      {
        day =1;
        [NativeBridge keychainSaveValue:[NSString stringWithFormat:@"%f",timeInterval-(60*60*24)] forKey:@"beginTimeInterval"];
        [NativeBridge keychainSaveValue:[NSString stringWithFormat:@"%f",timeInterval] forKey:@"timeInterval"];
      }
      else if(dayDifference>0)
      {
        NSString *beginTimeIntervalStr = [NativeBridge keychainGetValueForKey:@"beginTimeInterval"];
        NSTimeInterval beginTimeInterval = [beginTimeIntervalStr floatValue];
        day = 1+(timeInterval-beginTimeInterval)/(60*60*24);
        if(day>5)
          day = 5;
        [NativeBridge keychainSaveValue:[NSString stringWithFormat:@"%f",timeInterval] forKey:@"timeInterval"];
      }
  }
  else
  {
    day = 1;
    [NativeBridge keychainSaveValue:[NSString stringWithFormat:@"%f",timeInterval] forKey:@"timeInterval"];
  }
  resolve([NSNumber numberWithInt:day]);
}

#pragma mark canOpenURL
RCT_REMAP_METHOD(canOpenURL,
                 canOpenURL:(NSString*) url
                 canOpenURLResolver: (RCTPromiseResolveBlock)resolve
                 canOpenURLRejector: (RCTPromiseRejectBlock)reject)
{
  
  BOOL canOpenUrl = FALSE;
  
  if(url!=nil)
  {
    NSURL *urlObj = [NSURL URLWithString:url];
    canOpenUrl = [[UIApplication sharedApplication] canOpenURL:urlObj];
  }
  
  resolve([NSNumber numberWithBool:canOpenUrl]);
}

#pragma mark nativeLog
RCT_REMAP_METHOD(nativeLog,
                 nativeLog:(NSString*) message
                 nativeLogResolver: (RCTPromiseResolveBlock)resolve
                 nativeLogRejector: (RCTPromiseRejectBlock)reject)
{
  
  
  if(message!=nil)
  {
    NSLog(@"IXN : %@",message);
  }
  
  resolve([NSNumber numberWithBool:true]);
}


#pragma mark GoogleAnalyticsLogEvent
RCT_REMAP_METHOD(logEvent,
                  eventName:(NSString*) eventName
                  parameters:(NSString*) parameters
                 logEventResolver: (RCTPromiseResolveBlock)resolve
                 logEventRejector: (RCTPromiseRejectBlock)reject)
{
  
  
  if(eventName!=nil)
  {
    if(parameters!=nil) {
      NSError *error = nil;
      NSDictionary *parametersDict = [NSJSONSerialization JSONObjectWithData:[parameters dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&error];
      if(error) {
        NSLog(@"Error%@",[error description]);
      }
      else {
        NSLog(@"%@:%@",eventName,parametersDict);
//        [FIRAnalytics logEventWithName:eventName
//                           parameters:parametersDict];
      }
    }
    else {
      NSLog(@"%@:",eventName);
//      [FIRAnalytics logEventWithName:eventName
//                          parameters:@{}];
    }
    
  }
  
  resolve([NSNumber numberWithBool:true]);
}

#pragma mark openURL
RCT_EXPORT_METHOD(openURL:(NSString*) url callback:(RCTResponseSenderBlock)callback)
{
  if(url!=nil)
  {
    NSURL *urlObj = [NSURL URLWithString:url];
    [[UIApplication sharedApplication] openURL:urlObj options:@{} completionHandler:^(BOOL success) {
      callback(@[[NSNumber numberWithBool:success]]);
    }];
  }
  else
  {
    callback(@[[NSNumber numberWithBool:FALSE]]);
  }
}

#pragma mark cancelAllLocalNotifications
RCT_REMAP_METHOD(cancelAllLocalNotifications,
                 cancelAllLocalNotificationsResolver: (RCTPromiseResolveBlock)resolve
                 cancelAllLocalNotificationsRejector: (RCTPromiseRejectBlock)reject)
{
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center removeAllDeliveredNotifications];
  [center removeAllPendingNotificationRequests];
  
}

#pragma mark updateBadgeVal
RCT_REMAP_METHOD(updateBadgeVal,
                 badgeVal:(int) badgeVal
                 cancelAllLocalNotificationsResolver: (RCTPromiseResolveBlock)resolve
                 cancelAllLocalNotificationsRejector: (RCTPromiseRejectBlock)reject)
{
  [[UIApplication sharedApplication] setApplicationIconBadgeNumber:badgeVal];
}

#pragma mark takeNotificationPermission
RCT_EXPORT_METHOD(takeNotificationPermission:(RCTResponseSenderBlock)callback)
{
  NSString *notifyPermissionCountStr = [NativeBridge keychainGetValueForKey:@"notify_permission_taken"];
  
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  
  if([notifyPermissionCountStr length]==0 || [notifyPermissionCountStr isEqualToString:@"1"])
  {
    
    UNAuthorizationOptions options = UNAuthorizationOptionAlert + UNAuthorizationOptionSound + UNAuthorizationOptionBadge
;
    [center requestAuthorizationWithOptions:options completionHandler:^(BOOL granted, NSError * _Nullable error) {
      
      dispatch_async(dispatch_get_main_queue(), ^{
      
        [[UIApplication sharedApplication] registerForRemoteNotifications];
      });
      
      [NativeBridge keychainSaveValue:@"1" forKey:@"notify_permission_taken"];
      if(error)
        callback(@[[NSNumber numberWithBool:granted],error]);
      else
        callback(@[[NSNumber numberWithBool:granted]]);
    }];
      
  }
  else
  {
    [center getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {
      if(settings.alertSetting != UNNotificationSettingEnabled)
      {
        UIAlertController *askConfirmationToGoToSettings = [UIAlertController alertControllerWithTitle:@"Permission" message:@"Please allow notification from Settings-><App Name>->Notifications. Would you like to open now?" preferredStyle:UIAlertControllerStyleAlert];
        [askConfirmationToGoToSettings addAction:[UIAlertAction actionWithTitle:@"Yes" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
          [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString] options:@{} completionHandler:^(BOOL success) {
            callback(@[[NSNumber numberWithBool:FALSE]]);
          }];
        }]];
        [askConfirmationToGoToSettings addAction:[UIAlertAction actionWithTitle:@"No" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
          callback(@[[NSNumber numberWithBool:FALSE]]);
        }]];
        
        dispatch_async(dispatch_get_main_queue(), ^{
        
          [[NativeBridge keyWindow].rootViewController presentViewController:askConfirmationToGoToSettings animated:YES completion:nil];
          
        });
        
      }
    }];
  }
}

#pragma mark clearCookies
RCT_REMAP_METHOD(clearCookies,
                 clearCookiesResolver: (RCTPromiseResolveBlock)resolve
                 clearCookiesRejecter: (RCTPromiseRejectBlock)reject)
{
    if (@available(iOS 11.0, *)) {
          dispatch_async(dispatch_get_main_queue(), ^(){
              WKHTTPCookieStore *cookieStore = [[WKWebsiteDataStore defaultDataStore] httpCookieStore];
              [cookieStore getAllCookies:^(NSArray<NSHTTPCookie *> *allCookies) {
                  for(NSHTTPCookie *currentCookie in allCookies) {
                      
                      NSMutableDictionary<NSHTTPCookiePropertyKey, id> *cookieData =  [NSMutableDictionary dictionary];
                      [cookieData setValue:currentCookie.name forKey:NSHTTPCookieName];
                      [cookieData setValue:currentCookie.value forKey:NSHTTPCookieValue];
                      [cookieData setValue:currentCookie.domain forKey:NSHTTPCookieDomain];
                      [cookieData setValue:currentCookie.path forKey:NSHTTPCookiePath];

                      NSHTTPCookie *newCookie = [NSHTTPCookie cookieWithProperties:cookieData];
                      [cookieStore deleteCookie:newCookie completionHandler:^{}];
                  }
                  resolve(nil);
              }];
          });
      }
      else {
      NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
      for (NSHTTPCookie *c in cookieStorage.cookies) {
          [cookieStorage deleteCookie:c];
      }
      resolve(nil);
    }
}

#pragma mark getPushToken
RCT_REMAP_METHOD(getPushToken,
                 getPushTokenResolver: (RCTPromiseResolveBlock)resolve
                 getPushTokenRejector: (RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^(){
  
//    [[FIRMessaging messaging] tokenWithCompletion:^(NSString *token, NSError *error) {
//      if (error != nil) {
////        NSLog(@"Error getting FCM registration token: %@", error);
//      } else {
//        if(token!= nil && [token length]>0)
//          [((AppDelegate*)[UIApplication sharedApplication].delegate).nativeBridge sendEventWithName:@"DEVICE_PUSH_TOKEN" body:@{@"device_push_token":token }];
//      }
//    }];
  });
}

#pragma mark googleSignIn
RCT_REMAP_METHOD(googleSignIn,
                 googleSignInResolver: (RCTPromiseResolveBlock)resolve
                 googleSignInRejector: (RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^(){
  
    //[GIDSignIn sharedInstance].presentingViewController = [NativeBridge keyWindow].rootViewController;
    //[GIDSignIn sharedInstance].delegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
    //[[GIDSignIn sharedInstance] signIn];
  });
}

#pragma mark googleSignOut
RCT_REMAP_METHOD(googleSignOut,
                 googleSignOutResolver: (RCTPromiseResolveBlock)resolve
                 googleSignOutRejector: (RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^(){
  
    //[[GIDSignIn sharedInstance] signOut];
  });
}

#pragma mark appleSignIn
RCT_REMAP_METHOD(appleSignIn,
                 appleSignInResolver: (RCTPromiseResolveBlock)resolve
                 appleSignInRejector: (RCTPromiseRejectBlock)reject)
{
//  let appleIDProvider = ASAuthorizationAppleIDProvider()
//      let request = appleIDProvider.createRequest()
//      request.requestedScopes = [.fullName, .email]
//
//      let authorizationController = ASAuthorizationController(authorizationRequests: [request])
//      authorizationController.delegate = self
//      authorizationController.presentationContextProvider = self
//      authorizationController.performRequests()
  if (@available(iOS 13.0, *)) {
    
    dispatch_async(dispatch_get_main_queue(), ^(){
    
      NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
      [center addObserver:(AppDelegate*)[UIApplication sharedApplication].delegate selector:@selector(handleSignInWithAppleStateChanged:) name:ASAuthorizationAppleIDProviderCredentialRevokedNotification object:nil];
      
      // A mechanism for generating requests to authenticate users based on their Apple ID.
      ASAuthorizationAppleIDProvider *appleIDProvider = [ASAuthorizationAppleIDProvider new];

      // Creates a new Apple ID authorization request.
      ASAuthorizationAppleIDRequest *request = appleIDProvider.createRequest;
      // The contact information to be requested from the user during authentication.
      request.requestedScopes = @[ASAuthorizationScopeFullName, ASAuthorizationScopeEmail];

      // A controller that manages authorization requests created by a provider.
      ASAuthorizationController *controller = [[ASAuthorizationController alloc] initWithAuthorizationRequests:@[request]];

      // A delegate that the authorization controller informs about the success or failure of an authorization attempt.
      controller.delegate = (AppDelegate*)[UIApplication sharedApplication].delegate;

      // A delegate that provides a display context in which the system can present an authorization interface to the user.
      controller.presentationContextProvider = [NativeBridge keyWindow].rootViewController;

      // starts the authorization flows named during controller initialization.
      [controller performRequests];
  
    });
  }
}

#pragma mark getSystemFonts
RCT_REMAP_METHOD(getSystemFonts,
                 getSystemFontsResolver: (RCTPromiseResolveBlock)resolve
                 getSystemFontsRejector: (RCTPromiseRejectBlock)reject)
{
  NSMutableArray *allFontNames = [NSMutableArray arrayWithCapacity:1];
  NSArray * fontFamilyNames = [UIFont familyNames];
  for (NSString* familyName in fontFamilyNames) {
    if(familyName != nil) {
      NSArray *fontNames = [UIFont fontNamesForFamilyName:familyName];
      if(fontNames != nil && [fontNames count]>0 ) {
        [allFontNames addObjectsFromArray:fontNames];
      }
    }
  }
  NSString *strValue = @"";
  if([allFontNames count]>0) {
    NSDictionary *fontRootDictionary = [NSDictionary dictionaryWithObject:allFontNames forKey:@"system_fonts"];
    NSError *errorObj = NULL;
    NSData *rootData = [NSJSONSerialization dataWithJSONObject:fontRootDictionary options:NSJSONWritingPrettyPrinted error:&errorObj];
    if(rootData != nil && errorObj == NULL) {
      strValue = [[NSString alloc] initWithData:rootData encoding:NSUTF8StringEncoding];
    }
  }
  resolve(strValue);
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"APP_OPENED_VIA_URL",@"DEVICE_PUSH_TOKEN",@"GOOGLE_SIGN_IN",@"APPLE_SIGN_IN",@"PUSH_EVENT_ID"];
}

@end
