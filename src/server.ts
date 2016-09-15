import { IPlugin } from "./libs/plugins/interfaces";
import { IServerConfig } from "./configs/interfaces";

import * as fs from "fs";
import * as Hapi from "hapi";
import * as path from "path";

import kernel from "./libs/ioc";
import Routes from "./routes";

const serverConfigs = kernel.get<IServerConfig>("IServerConfig");
const port = process.env.port || serverConfigs.port;
const server = new Hapi.Server();

server.connection({
    port: port,
    routes: {
        cors: true
    }
});

//  Setup Hapi Plugins
const pluginsPath = __dirname + '/libs/plugins/';
const plugins = fs.readdirSync(pluginsPath).filter(file => fs.statSync(path.join(pluginsPath, file)).isDirectory());

plugins.forEach((pluginName: string) => {
    var plugin: IPlugin = (require("./libs/plugins/" + pluginName)).default();
    console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
    plugin.register(server);
});

//Register Routes
Routes(server);

export default server;
