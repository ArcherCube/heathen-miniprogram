export class Page {
  dirName: string;
  dirPath: string;
  path: string;
  fullPath: string;
  packageName: string;
  routeConfig?: RouteConfig;
  method?: PageMethod;

  constructor(
    private readonly init: {
      dirName: string;
      dirPath: string;
      path: string;
      fullPath: string;
      packageName: string;
    },
  ) {
    this.dirName = init.dirName;
    this.dirPath = init.dirPath;
    this.path = init.path;
    this.fullPath = init.fullPath;
    this.packageName = init.packageName;
  }
}

export class PageMethod {
  name: string;
  type: string;
  value: string;
  comment: string;

  constructor(
    private readonly init: {
      name: string;
      type: string;
      value: string;
      comment: string;
    },
  ) {
    this.name = init.name;
    this.type = init.type;
    this.value = init.value;
    this.comment = init.comment;
  }
}

export class RouteConfig {
  params?: string;
  backData?: string;
  ext?: string;
}

export class ConfigPage {
  packageRoot: string;
  path: string;
  fullPath: string;

  constructor(
    private readonly init: {
      packageRoot: string;
      path: string;
      fullPath: string;
    },
  ) {
    this.packageRoot = init.packageRoot;
    this.path = init.path;
    this.fullPath = init.fullPath;
  }
}
