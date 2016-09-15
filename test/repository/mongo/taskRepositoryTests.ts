import "reflect-metadata";
import { ITaskRepository } from "../../../src/libs/repository/interfaces";
import {IRepositoryConfig} from "../../../src/configs/interfaces";

import * as chai from "chai";

import Kernel from "../../../src/libs/ioc";
import Task from "../../../src/core/task";
import TaskRepository from "../../../src/libs/repository/mongo/taskRepository";

const configurations = Kernel.get<IRepositoryConfig>("IRepositoryConfig");
const assert = chai.assert;

describe("Mongo TaskRepository", function() {
  it("Create a task", function(done) {
      var repo: ITaskRepository = new TaskRepository(configurations);

      var task: Task = {
          _id: undefined,
          name: "task",
          description: "teste",
          completed: false,
          createdDate: undefined,
          updatedDate: undefined
      };

      repo.create(task).then((createdTask) => {
          assert.isNotNull(task._id);
          assert.isNotNull(task.createdDate);
          done();
      }).catch((error) => {
          done(error);
      });
  });
});
