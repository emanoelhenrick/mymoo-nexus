"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/services/devices/remove-device.ts
var remove_device_exports = {};
__export(remove_device_exports, {
  removeDevice: () => removeDevice
});
module.exports = __toCommonJS(remove_device_exports);

// src/config/prisma/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/devices/prisma-devices-repository.ts
var PrismaDevicesRepository = class {
  findById(id) {
    return __async(this, null, function* () {
      const device = yield prisma.device.findUnique({ where: { id } });
      return device;
    });
  }
  create(id) {
    return __async(this, null, function* () {
      const device = yield prisma.device.create({ data: { id } });
      return device;
    });
  }
  remove(id) {
    return __async(this, null, function* () {
      const device = yield prisma.device.delete({ where: { id } });
      return device;
    });
  }
  update(id) {
    return __async(this, null, function* () {
      const device = yield prisma.device.update({
        where: { id },
        data: {
          id,
          updated_at: /* @__PURE__ */ new Date()
        }
      });
      return device;
    });
  }
  count() {
    return __async(this, null, function* () {
      const count = yield prisma.device.count();
      return count;
    });
  }
  findMany(page) {
    return __async(this, null, function* () {
      const devices = yield prisma.device.findMany({
        take: 20,
        skip: (page - 1) * 20
      });
      return devices;
    });
  }
};
var deviceDB = new PrismaDevicesRepository();

// src/services/devices/remove-device.ts
function removeDevice(deviceId) {
  return __async(this, null, function* () {
    const device = yield deviceDB.findById(deviceId);
    if (!device)
      return;
    yield deviceDB.remove(deviceId);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeDevice
});
