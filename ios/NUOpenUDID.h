//
//  Header.h
//  ProjectM
//
//  Created by RajaReddy on 08/02/24.
//

#import <Foundation/Foundation.h>


//
// Usage:
//    #include "OpenUDID.h"
//    NSString* openUDID = [OpenUDID value];
//

#define kOpenUDIDErrorNone          0
#define kOpenUDIDErrorOptedOut      1
#define kOpenUDIDErrorCompromised   2

//
// Support for ARC
//

#if __has_feature(objc_arc)

#define OU_HAS_ARC 1
#define OU_RETAIN(_o) (_o)
#define OU_RELEASE(_o)
#define AUTORELEASE(_o) (_o)

#else

#define OU_HAS_ARC 0
#define OU_RETAIN(_o) [(_o) retain]
#define OU_RELEASE(_o) [(_o) release]
#define OU_AUTORELEASE(_o) [(_o) autorelease]

#endif

@interface NUOpenUDID : NSObject {
}
+ (NSString*) value;
+ (NSString*) valueWithError:(NSError**)error;

@end

