import { interfaces } from "inversify";
import { IRepositoryConfig, IServerConfig } from "../../configs/interfaces";
import { ITaskRepository } from "../repository/interfaces";

import Configurations from "../../configs/configurations";
import TaskRepository from "../repository/memory/taskRepository";


export default function(kernel: interfaces.Kernel) {
    //Configurations
    kernel.bind<IRepositoryConfig>("IRepositoryConfig").to(Configurations).inSingletonScope();
    kernel.bind<IServerConfig>("IServerConfig").to(Configurations).inSingletonScope();

    //Repositories
    kernel.bind<ITaskRepository>("ITaskRepository").to(TaskRepository).inSingletonScope();
};
