import { ITaskRepository } from "../../../src/libs/repository/interfaces";

import * as chai from "chai";

import Task from "../../../src/core/task";
import TaskRepository from "../../../src/libs/repository/memory/taskRepository";

let assert = chai.assert;

describe("Memory TaskRepository", function() {
  it("Create a task", function(done) {
      var repo: ITaskRepository = new TaskRepository();

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
