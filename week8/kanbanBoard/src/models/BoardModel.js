import Model from "../core/Model.js";
import { GROUP, TASK, ADD, DELETE } from "../utils/constants.js";

class BoardModel extends Model {
  constructor() {
    super();
  }

  getBoardData() {
    return this.state.board;
  }

  getGroup(gid) {
    return this.state.board.find((group) => group.groupId === gid);
  }

  getGroupIndex(gid) {
    return this.state.board.findIndex((group) => group.groupId === gid);
  }

  getTask(gid, tid) {
    const group = this.getGroup(gid);
    return group.groupTasks.find((task) => task.taskId === tid);
  }

  getTaskIndex(gid, tid) {
    const group = this.getGroup(gid);
    return group.groupTasks.findIndex((task) => task.taskId === tid);
  }

  changeTaskOrder(gid, tid, targetGroupId, targetIdx) {
    const { board } = this.state;

    const target = this.getTask(gid, tid);
    const targetGroupIdx = this.getGroupIndex(targetGroupId);
    const prevGroupIdx = this.getGroupIndex(gid);
    const prevTaskIdx = this.getTaskIndex(gid, tid);

    board[prevGroupIdx].groupTasks.splice(prevTaskIdx, 1);
    board[targetGroupIdx].groupTasks.splice(targetIdx, 0, target);

    this.setState({ ...this.state });

    if (tid === targetGroupId) return null;

    this.notify({ type: TASK, targetId: tid, targetGroupId });
  }

  addTask(gid, taskTitle, taskAssignee) {
    const { board, taskCurId } = this.state;

    const groupIdx = this.getGroupIndex(gid);
    const newTask = {
      taskId: `T-${taskCurId}`,
      taskTitle,
      taskAssignee,
    };
    board[groupIdx].groupTasks.push(newTask);

    this.setState({
      ...this.state,
      taskCurId: taskCurId + 1,
    });
    this.notify({ type: GROUP, action: ADD, targetId: gid, target: newTask });
  }

  deleteTask(gid, tid) {
    const { board, taskCurId } = this.state;

    const groupIdx = this.getGroupIndex(gid);
    const taskIdx = this.getTaskIndex(gid, tid);

    board[groupIdx].groupTasks.splice(taskIdx, 1);

    this.setState({
      ...this.state,
      taskCurId: taskCurId - 1,
    });
    this.notify({ type: TASK, action: DELETE, targetId: tid });
  }
}

export default new BoardModel();
