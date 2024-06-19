const { user } = require("../models/user");

const findByEmail = async (email) => {
  return await user.findOne({ where: { email } });
};

const findById = async (id) => {
  return await user.findByPk(id);
};

const findByEmailAndRoleId = async (email, roleId) => {
  return await user.findOne({ where: { email, roleId } });
};

const findByIdAndRoleId = async (id, roleId) => {
  return await user.findOne({ where: { id, roleId } });
};

const createUser = async (
  name,
  email,
  password,
  gender,
  image,
  phone,
  address,
  department,
  roleId
) => {
  return await user.create({
    name,
    email,
    password,
    gender,
    image,
    phone,
    address,
    department,
    roleId,
  });
};

const updateUser = async (data, id) => {
  return await user.update(data, { where: { id }, individualHooks: true });
};

const countUser = async (roleId) => {
  return await user.count({ where: { roleId } });
};

const findAllUser = async (roleId, object = null) => {
  return await user.findAll({ where: { roleId }, ...object });
};

const deleteUser = async (id) => {
  return await user.destroy({ where: { id } });
};

module.exports = {
  findByEmail,
  createUser,
  findByEmailAndRoleId,
  findById,
  updateUser,
  countUser,
  findAllUser,
  findByIdAndRoleId,
  deleteUser,
};
