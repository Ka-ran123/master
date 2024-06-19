const { leave } = require("../models/leave");
const { user } = require("../models/user");
const { userLeave } = require("../models/userLeave");

const createLeave = async (
  userId,
  startDate,
  endDate,
  requestId,
  leaveType,
  reason
) => {
  return await leave.create({
    userId,
    startDate,
    endDate,
    requestId,
    leaveType,
    reason,
  });
};

const findOneLeave = async (userId) => {
  return await leave.findOne({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

const findAllLeave = async (userId) => {
  return await leave.findAll({ where: { userId } });
};

const findLeave = async (requestId) => {
  return await leave.findAll({
    where: { requestId },
    include: [
      {
        model: user,
        as: "userDetail",
        attributes: {
          exclude: ["password", "class", "roleId", "createdAt", "updatedAt"],
        },
      },
      {
        model: userLeave,
        as: "leaveReport",
        attributes: {
          exclude: ["id", "userId", "totalLeave", "createdAt", "updatedAt"],
        },
      },
    ],
  });
};

module.exports = { createLeave, findOneLeave, findAllLeave,findLeave };
