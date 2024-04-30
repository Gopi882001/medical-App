//
//  NativeBridge.h
//  ProjectM
//
//  Created by RajaReddy on 08/02/24.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>
#import <React/RCTEventEmitter.h>

@interface NativeBridge : RCTEventEmitter <RCTBridgeModule>

+(BOOL) keychainSaveValue:(NSString*) value forKey:(NSString*) key;
+(NSString*) keychainGetValueForKey:(NSString*) key;
+(UIWindow*) keyWindow;
+(NSString *)dateStr: (NSDate *)date;
@end
