const { validateDataForLeave, leave } = require("../models/leave");
const {
  createLeave,
  findOneLeave,
  findAllLeave,
  findLeave,
} = require("../services/leaveRequest");
const { findById } = require("../services/user");
const { findOneUserLeave, findAllUserLeave, findUserLeave } = require("../services/userLeave");
const { userMsg, errorMsg } = require("../utility/message");
const validateDates = require("../utility/validateDates");
const fs = require("fs");
const sendEmail = require("../utility/mail");
const handlebars = require("handlebars");
const {admin, staff, hod } = require("../utility/roleId");
const moment = require("moment");
const { user } = require("../models/user");
const { userLeave } = require("../models/userLeave");

const applyLeave = async (req, res) => {
  try {
    const { id } = req.user;
    const { startDate, endDate, leaveType, reason, requestId } = req.body;

    const { error } = validateDataForLeave(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const userLeaveDetail = await findOneUserLeave(id);

    if (!userLeaveDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.userNotFound });
    }

    if (userLeaveDetail.availableLeave <= 0) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.notApplyForLeave });
    }

    const dates = { startDate, endDate };
    const checkDates = validateDates(dates);
    if (!checkDates.valid) {
      return res.status(400).json({ message: checkDates.message });
    }

    await createLeave(id, startDate, endDate, requestId, leaveType, reason);

    const leaveDet = await findOneLeave(id);
    const studentDetail = await findById(id);
    const staffDetail = await findById(requestId);

    const filePath = "./template/applyLeave.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const start = moment(leaveDet.startDate, "YYYY-MM-DD");
    const end = moment(leaveDet.endDate, "YYYY-MM-DD");
    const emailTemp = template({
      name: staffDetail.name,
      startDate: start.format("YYYY-MM-DD"),
      endDate: end.format("YYYY-MM-DD"),
      day: end.diff(start, "days") + 1,
      reason: leaveDet.reason,
      myname: studentDetail.name,
    });

    const mailOptions = {
      to: staffDetail.email,
      subject: "Leave Application",
      html: emailTemp,
    };
    await sendEmail(mailOptions);

    return res.status(200).json({ success: true, message: userMsg.applyLeave });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const viewLeaveAvailability = async (req, res) => {
  try {
    const { id } = req.user;
    const leaveList = await findAllUserLeave(id);

    if (!leaveList || leaveList.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.noLeave });
    }
    return res.status(200).json({ success: true, data: leaveList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const viewLeaveStatus = async (req, res) => {
  try {
    const { id } = req.user;
    const leaveList = await findAllLeave(id);
    return res.status(200).json({ success: true, data: leaveList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const leaveReport = async (req, res) => {
  try {
    const { id, roleId } = req.user;
    if (!(roleId === staff || roleId === hod)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.notShow });
    }
    const leaveList = await findLeave(id);

    if (!leaveList || leaveList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    return res.status(200).json({ success: true, data: leaveList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const filterLeaveStatus = async (req, res) => {
  try {
    const { id, roleId } = req.user;
    const { leavestatus } = req.query;

    if (!(roleId === staff || roleId === hod)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.notShow });
    }

    if (!["Pending", "Rejected", "Approved"].includes(leavestatus)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.invalidStatus });
    }

    const filter = { status: leavestatus, requestId: id };

    const leaveList = await leave.findAll({ where: filter });

    return res.status(200).json({ success: true, data: leaveList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const setApproval = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === staff || roleId === hod)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.notShow });
    }
    const { id } = req.params;
    const leaveDetail = await leave.findByPk(id, {
      include: [
        { model: user, as: "userDetail" },
        { model: user, as: "requestedTo" },
        { model: userLeave, as: "leaveReport" },
      ],
    });

    if (!leaveDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }

    const start = moment(leaveDetail.startDate, "YYYY-MM-DD");
    const end = moment(leaveDetail.endDate, "YYYY-MM-DD");
    const totalLeaveDays = start.isSame(end, "day")
      ? 0.5
      : end.diff(start, "days") + 1;

    leaveDetail.status = "Approved";
    await leaveDetail.save();

    leaveDetail.leaveReport.usedLeave += totalLeaveDays;
    leaveDetail.leaveReport.availbleLeave =
      leaveDetail.leaveReport.totalLeave - leaveDetail.leaveReport.usedLeave;
    leaveDetail.leaveReport.totalWorkingDays -= totalLeaveDays;
    leaveDetail.leaveReport.attendancePercentage =
      (leaveDetail.leaveReport.totalWorkingDays / 220) * 100;

    await leaveDetail.leaveReport.save();

    const filePath = "./template/approvalLeave.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const emailTemp = template({
      name: leaveDetail.userDetail.name,
      startDate: leaveDetail.startDate,
      endDate: leaveDetail.endDate,
      reason: leaveDetail.reason,
      myname: leaveDetail.requestedTo.name,
      department: leaveDetail.requestedTo.department,
    });

    const mailOptions = {
      to: leaveDetail.userDetail.email,
      subject: "Leave Approval Successfully",
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: userMsg.leaveApproved });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const setReject = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === staff || roleId === hod)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.notShow });
    }
    const { id } = req.params;
    const leaveDetail = await leave.findByPk(id, {
      include: [
        { model: user, as: "userDetail" },
        { model: user, as: "requestedTo" },
      ],
    });
    if (!leaveDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    leaveDetail.status = "Rejected";
    await leaveDetail.save();

    const filePath = "./template/rejectLeave.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const emailTemp = template({
      name: leaveDetail.userDetail.name,
      startDate: leaveDetail.startDate,
      endDate: leaveDetail.endDate,
      reason: leaveDetail.reason,
      myname: leaveDetail.requestedTo.name,
      department: leaveDetail.requestedTo.department,
    });
    const mailOptions = {
      to: leaveDetail.userDetail.email,
      subject: "Leave Rejected",
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: userMsg.leaveRejected });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const leaveReportAdmin = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === admin)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.onlyAdmin });
    }
    const LeaveReportList = await findUserLeave();
    if (!LeaveReportList || LeaveReportList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    return res.status(200).json({ success: true, data: LeaveReportList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { applyLeave, viewLeaveAvailability, viewLeaveStatus,leaveReport,filterLeaveStatus,setApproval,setReject,leaveReportAdmin};
