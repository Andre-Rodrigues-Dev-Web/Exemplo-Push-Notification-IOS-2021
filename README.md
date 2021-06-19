# Exemplo-Push-Notification-IOS-2021
## Exemplo de uso de Pushs para IOS

Criei este exemplo após enfrentar problemas com relação a documentação do Zo0r, na documentação o exemplo de uso do Push não estava batendo com as novas regras de uso. 

## Como configurar o PushNotification em um novo projeto

Caso queira fazer um novo projeto, siga abaixo as orientações para usar o pacote o pacote Zo0r em seu dispositivo.

### Instalação 1

- instale o pacote principal: 

```Comando Terminal
yarn add react-native-push-notification
```

- Depois instale o pacote IOS: 

```Comando Terminal
yarn add @react-native-community/push-notification-ios
```

### Instalação 2

Nessa parte é necessário modificar os arquivos Delegates encontrados no diretório IOS, no caso desse projeto, eles se encontram dentro de pushnotification.

No arquivo Delegate.h, você irá os seguintes trechos: 

```
#import <UserNotifications/UNUserNotificationCenter.h>
```

logo abaixo você vai encontrar a seguinte linha:

```
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
```

substitua ela por essa:

```
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
```

No Arquivo Delegate.m, você irá adicionar os seguintes trechos:

```
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
```

Após adicionar os trechos acima, você irá adicionar esse trecho antes do @end: 

```
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}
```

Para fechar as edições dos Delegates, iremos adicionar as seguintes linhas:

```
//linha já existente- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  // Linhas a ser adicionada
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  // linha já existente return YES;
}

//Linhas para serem adicionadas
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}
```

Feita todas as etapas mencionadas acima, abra a pasta ios no terminal e mande um: pod install, após a execução desse comando é necessário que você abra a pasta IOS no Xcode, e lá você abra o pacote de seu projeto, no meu caso o pushnotification, abaixo as etapas de clicks.

1) Abrir o projeto no Xcode;
2) Abrir o pacote de seu projeto;
3) Clique em: 'Signing & Capabilities';
4) Clique em: 'Capability';
5) Adicione Background, e na tela maior de lado onde foi adicionado o background, clique nele e marque as checkbox de Background-Fetch, Remote Notifications e Background Processing;
6) Após esse processo, você pode ir Capability novamente e adicionar os push notification.

Agora é só você usar o meu exemplo como referência e adicionar o Push em sua aplicação.



