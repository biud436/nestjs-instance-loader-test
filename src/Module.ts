import * as chalk from "chalk";

export class Module {
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
