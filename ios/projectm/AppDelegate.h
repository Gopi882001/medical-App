#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <AuthenticationServices/AuthenticationServices.h>
#import "NativeBridge.h"

@interface AppDelegate : RCTAppDelegate <UIApplicationDelegate, ASAuthorizationControllerDelegate,ASAuthorizationControllerPresentationContextProviding>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) NSString *nativePushToken;
@property (nonatomic, strong) NativeBridge *nativeBridge;

@end
