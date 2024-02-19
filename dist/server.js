"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/server.ts
var import_config7 = require("dotenv/config");

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/http/controllers/discover/discover-controller.ts
var import_config = require("dotenv/config");

// src/services/devices/add-devices-to-temp.ts
function addToTempDevices(deviceId) {
  return __async(this, null, function* () {
    yield tempDB.save(deviceId);
  });
}

// src/http/controllers/discover/discover-controller.ts
var API_KEY = process.env.API_KEY;
function discoverController(req, res) {
  return __async(this, null, function* () {
    const queryParams = req.query;
    if (!queryParams.deviceId)
      return res.status(404).send("error: device id is null");
    if (queryParams.key !== API_KEY)
      return res.status(403).send("invalid api key");
    yield addToTempDevices(queryParams.deviceId);
    res.status(200).send("ok");
  });
}

// src/http/controllers/discover/routes.ts
function discoverRoute(app2) {
  return __async(this, null, function* () {
    app2.get("/discover", discoverController);
  });
}

// src/repositories/devices/memory-temp-devices-repository.ts
var InMemoryTempDevicesRepository = class _InMemoryTempDevicesRepository {
  constructor() {
    this.TempDevices = [];
  }
  static getInstance() {
    if (_InMemoryTempDevicesRepository.Singleton) {
      return _InMemoryTempDevicesRepository.Singleton;
    }
    _InMemoryTempDevicesRepository.Singleton = new _InMemoryTempDevicesRepository();
    return _InMemoryTempDevicesRepository.Singleton;
  }
  save(id) {
    return __async(this, null, function* () {
      if (this.TempDevices.find((dev) => dev.id === id))
        return;
      this.TempDevices.push({ id });
    });
  }
  findAll() {
    return __async(this, null, function* () {
      return this.TempDevices;
    });
  }
  remove(id) {
    return __async(this, null, function* () {
      const updatedDevices = this.TempDevices.filter((dev) => dev.id !== id);
      this.TempDevices = updatedDevices;
    });
  }
};
var memory_temp_devices_repository_default = InMemoryTempDevicesRepository;

// src/http/controllers/temp-devices/find-all-temp-devices-controller.ts
var import_config2 = require("dotenv/config");

// src/services/devices/find-all-temp-devices.ts
function findAllTempDevices() {
  return __async(this, null, function* () {
    return yield tempDB.findAll();
  });
}

// src/http/controllers/temp-devices/find-all-temp-devices-controller.ts
var API_KEY2 = process.env.API_KEY;
function findAllTempDevicesController(req, res) {
  return __async(this, null, function* () {
    const queryParams = req.query;
    if (queryParams.key !== API_KEY2)
      return res.status(403).send("invalid api key");
    const tempDevices = yield findAllTempDevices();
    res.status(200).send(tempDevices);
  });
}

// src/http/controllers/temp-devices/route.ts
function findAllTempDevicesRoute(app2) {
  return __async(this, null, function* () {
    app2.get("/temp-devices", findAllTempDevicesController);
  });
}

// src/http/controllers/devices/update-device-controller.ts
var import_config3 = require("dotenv/config");

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

// src/services/devices/update-device.ts
function updateDevice(deviceId) {
  return __async(this, null, function* () {
    const device = yield deviceDB.findById(deviceId);
    if (!device)
      return;
    yield deviceDB.update(deviceId);
  });
}

// src/http/controllers/devices/update-device-controller.ts
var API_KEY3 = process.env.API_KEY;
function updateDeviceController(req, res) {
  return __async(this, null, function* () {
    const queryParams = req.query;
    if (!queryParams.deviceId)
      return res.status(404).send("error: device id is null");
    if (queryParams.key !== API_KEY3)
      return res.status(403).send("invalid api key");
    yield updateDevice(queryParams.deviceId);
    res.status(200).send();
  });
}

// src/http/controllers/devices/find-all-devices-controller.ts
var import_config4 = require("dotenv/config");

// src/services/devices/find-all-devices.ts
function findAllDevices(page) {
  return __async(this, null, function* () {
    return yield deviceDB.findMany(page);
  });
}

// src/http/controllers/devices/find-all-devices-controller.ts
var API_KEY4 = process.env.API_KEY;
function findAllDevicesController(req, res) {
  return __async(this, null, function* () {
    const queryParams = req.query;
    if (queryParams.key !== API_KEY4)
      return res.status(403).send("invalid api key");
    const page = queryParams.page ? queryParams.page : 1;
    const devices = yield findAllDevices(page);
    res.status(200).send(devices);
  });
}

// src/http/controllers/devices/remove-device-controller.ts
var import_config5 = require("dotenv/config");

// src/services/devices/remove-device.ts
function removeDevice(deviceId) {
  return __async(this, null, function* () {
    const device = yield deviceDB.findById(deviceId);
    if (!device)
      return;
    yield deviceDB.remove(deviceId);
  });
}

// src/http/controllers/devices/remove-device-controller.ts
var API_KEY5 = process.env.API_KEY;
function removeDeviceController(req, res) {
  return __async(this, null, function* () {
    const queryParams = req.query;
    if (!queryParams.deviceId)
      return res.status(404).send("error: device id is null");
    if (queryParams.key !== API_KEY5)
      return res.status(403).send("invalid api key");
    yield removeDevice(queryParams.deviceId);
    res.status(200).send();
  });
}

// src/http/controllers/devices/save-device-controller.ts
var import_config6 = require("dotenv/config");

// src/services/devices/save-device.ts
function saveDevice(deviceId) {
  return __async(this, null, function* () {
    yield tempDB.remove(deviceId);
    const device = yield deviceDB.findById(deviceId);
    if (device)
      return;
    yield deviceDB.create(deviceId);
  });
}

// src/http/controllers/devices/save-device-controller.ts
var API_KEY6 = process.env.API_KEY;
function saveDeviceController(req, res) {
  return __async(this, null, function* () {
    const queryParams = req.query;
    if (!queryParams.deviceId)
      return yield res.status(404).send("error: device id is null");
    if (queryParams.key !== API_KEY6)
      return yield res.status(403).send("invalid api key");
    yield saveDevice(queryParams.deviceId);
    res.status(201).send();
  });
}

// src/http/controllers/devices/route.ts
function devicesRoute(app2) {
  return __async(this, null, function* () {
    app2.post("/devices", saveDeviceController);
    app2.get("/devices", findAllDevicesController);
    app2.delete("/devices", removeDeviceController);
    app2.get("/devices/ping", updateDeviceController);
  });
}

// src/app.ts
var import_cors = __toESM(require("@fastify/cors"));
var tempDB = memory_temp_devices_repository_default.getInstance();
var app = (0, import_fastify.default)();
app.register(import_cors.default, { origin: "*" });
app.register(discoverRoute);
app.register(findAllTempDevicesRoute);
app.register(devicesRoute);

// src/server.ts
var PORT = 1e4;
void app.listen({
  host: "0.0.0.0",
  port: PORT
}).then(() => {
  console.log(`MyMoo Nexus Server is running on port ${PORT}`);
});
