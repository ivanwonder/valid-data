var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ValidBase = /** @class */ (function () {
        function ValidBase() {
        }
        ValidBase.prototype["do"] = function (_) {
            return true;
        };
        return ValidBase;
    }());
    exports.ValidBase = ValidBase;
    var ValidGroup = /** @class */ (function (_super) {
        __extends(ValidGroup, _super);
        function ValidGroup(config) {
            var _this = _super.call(this) || this;
            _this.valid = true;
            _this.config = config;
            return _this;
        }
        ValidGroup.prototype["do"] = function (value) {
            var _this = this;
            Object.keys(this.config).forEach(function (name) {
                var _valid = _this.config[name];
                if (_valid instanceof ValidBase) {
                    _this.valid = _valid["do"](value[name]);
                }
                else {
                    _this.valid = _valid.validFun(value[name]);
                }
            });
            return this.valid;
        };
        return ValidGroup;
    }(ValidBase));
    exports.ValidGroup = ValidGroup;
    var ValidArray = /** @class */ (function (_super) {
        __extends(ValidArray, _super);
        function ValidArray(config) {
            var _this = _super.call(this) || this;
            _this.valid = true;
            _this.config = config;
            return _this;
        }
        ValidArray.prototype["do"] = function (value) {
            var _this = this;
            value.forEach(function (_val) {
                if (_this.config instanceof ValidBase) {
                    _this.valid = _this.config["do"](_val);
                }
                else {
                    _this.valid = new ValidGroup(_this.config)["do"](_val);
                }
            });
            return this.valid;
        };
        return ValidArray;
    }(ValidBase));
    exports.ValidArray = ValidArray;
    var ValidValue = /** @class */ (function (_super) {
        __extends(ValidValue, _super);
        function ValidValue(config) {
            var _this = _super.call(this) || this;
            _this.valid = true;
            _this.config = config;
            return _this;
        }
        ValidValue.prototype["do"] = function (value) {
            this.valid = this.config.validFun(value);
            return this.valid;
        };
        return ValidValue;
    }(ValidBase));
    exports.ValidValue = ValidValue;
});
