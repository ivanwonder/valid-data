
declare interface ValidConfig {
  validFun: (_) => boolean;
  tip?: string;
}

type ValidStyle = ValidConfig | ValidArray | ValidGroup;

class ValidGroup {
  config: {[key: string]: ValidStyle};
  valid = true;
  constructor(config: {[key: string]: ValidStyle}) {
    this.config = config;
  }

  do(value) {
    Object.keys(this.config).forEach(name => {
      const _valid = this.config[name];
      if (_valid instanceof ValidArray) {
        (<ValidArray>_valid).do(value[name]);
        if (!_valid.valid) {
          this.valid = _valid.valid;
        }
      } else if (_valid instanceof ValidGroup) {
        _valid.do(value[name]);
        if (!_valid.valid) {
          this.valid = _valid.valid;
        }
      } else {
        const res = _valid.validFun(value[name]);
        if (!res) {
          this.valid = res;
        }
      }
    });
  }
}

class ValidArray {
  config: ValidArray | ValidGroup | {[key: string]: ValidStyle};
  valid = true;
  constructor(config: ValidArray | ValidGroup | {[key: string]: ValidStyle}) {
    this.config = config;
  }

  do(value: Array<any>) {
    value.forEach(_val => {
      if (this.config instanceof ValidArray) {
        (<ValidArray>this.config).do(_val);
        if (!this.config.valid) {
          this.valid = this.config.valid;
        }
      } else if (this.config instanceof ValidGroup) {
        this.config.do(_val);
        if (!this.config.valid) {
          this.valid = this.config.valid;
        }
      } else {
        const group = new ValidGroup(this.config);
        group.do(_val);
        if (!group.valid) {
          this.valid = group.valid;
        }
      }
    });
  }
}

export {
  ValidArray,
  ValidGroup
}
