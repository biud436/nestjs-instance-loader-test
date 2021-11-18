import * as chalk from "chalk";

class Module {
    public imports: Module[];
    public exports: [];
    public controllers: [];
    public providers: [];
    public distance: number = 1;

    public name: string;

    constructor(imports: any = []) {
        this.name = this.constructor.name;
        this.imports = imports;
    }

    toString() {
        // prettier-ignore
        return `${chalk.yellow("[서버 로그] ")}${chalk.white(this.name)}${chalk.green(" 이 초기화되었습니다")}[거리:${chalk.red(this.distance)}]`;
    }
}

class AppModule extends Module {}
class ConfigModule extends Module {}
class ServerStaticModule extends Module {}
class AuthModule extends Module {}
class ApiModule extends Module {}
class UserModule extends Module {}
class SequelizeModule extends Module {}
class TypeOrmModule extends Module {}

const appModule = new AppModule();
const configModule = new ConfigModule();
const serverStaticModule = new ServerStaticModule();
const authModule = new AuthModule();
const apiModule = new ApiModule();
const userModule = new UserModule();
const sequelizeModule = new SequelizeModule();
const typeOrmModule = new TypeOrmModule();

appModule.imports = [configModule, serverStaticModule, apiModule];
serverStaticModule.imports = [authModule];
authModule.imports = [userModule];
apiModule.imports = [sequelizeModule];
userModule.imports = [typeOrmModule];

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
