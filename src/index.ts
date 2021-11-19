import { Module } from "./Module";

// define specific modules
class AppModule extends Module {}
class ConfigModule extends Module {}
class ServerStaticModule extends Module {}
class AuthModule extends Module {}
class ApiModule extends Module {}
class UserModule extends Module {}
class SequelizeModule extends Module {}
class TypeOrmModule extends Module {}

// initialize all modules
const appModule = new AppModule();
const configModule = new ConfigModule();
const serverStaticModule = new ServerStaticModule();
const authModule = new AuthModule();
const apiModule = new ApiModule();
const userModule = new UserModule();
const sequelizeModule = new SequelizeModule();
const typeOrmModule = new TypeOrmModule();

// define some module dependencies
appModule.imports = [configModule, serverStaticModule, apiModule];
serverStaticModule.imports = [authModule];
authModule.imports = [userModule];
apiModule.imports = [sequelizeModule];
userModule.imports = [typeOrmModule];

// calculate all module distances
const modulesStack = [];

function calculateDistance<R extends Module>(moduleRef: R, distance = 1) {
  if (modulesStack.includes(moduleRef)) {
    return;
  }

  modulesStack.push(moduleRef);

  const moduleImports = moduleRef.imports;
  moduleImports.forEach((importedModuleRef) => {
    if (importedModuleRef) {
      importedModuleRef.distance = distance;
      calculateDistance(importedModuleRef, distance + 1);
    }
  });
}

calculateDistance(appModule);

// print all module distances
const map = new Map<string, Module>();

[...new Set(modulesStack)]
  .sort((a, b) => {
    return b.distance - a.distance;
  })
  .forEach((m) => {
    if (m) {
      map.set(m.name, m);
    }
  });

map.forEach((m) => {
  console.log(m.toString());
});
