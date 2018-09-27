declare interface ValidConfig {
  validFun: (_) => boolean;
  tip?: string;
}

type ValidStyle = ValidConfig | ValidBase;

class ValidBase {
  config: any;
  valid: boolean;
  do(_: any) {
    return true;
  }
}

class ValidGroup extends ValidBase {
  config: { [key: string]: ValidStyle };
  valid = true;
  constructor(config: { [key: string]: ValidStyle }) {
    super();
    this.config = config;
  }

  do(value) {
    Object.keys(this.config).forEach(name => {
      const _valid = this.config[name];
      if (_valid instanceof ValidBase) {
        this.valid = _valid.do(value[name]);
      } else {
        this.valid = _valid.validFun(value[name]);
      }
    });

    return this.valid;
  }
}

class ValidArray extends ValidBase {
  config: ValidBase | { [key: string]: ValidStyle } | ValidValue;
  valid = true;
  constructor(config: ValidBase | { [key: string]: ValidStyle } | ValidValue) {
    super();
    this.config = config;
  }

  do(value: Array<any>) {
    value.forEach(_val => {
      if (this.config instanceof ValidBase) {
        this.valid = this.config.do(_val);
      } else {
        this.valid = new ValidGroup(this.config).do(_val);
      }
    });

    return this.valid;
  }
}

class ValidValue extends ValidBase {
  config: ValidConfig;
  valid = true;

  constructor(config: ValidConfig) {
    super();
    this.config = config;
  }

  do(value) {
    this.valid = this.config.validFun(value);
    return this.valid;
  }
}

export { ValidArray, ValidGroup, ValidValue, ValidBase };
