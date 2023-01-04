const getUsers = async (req, res) => {
  res.status(200).json({
    message: 'Hello user',
  });
};

const addUsers = async (req, res) => {
  res.status(201).json({
    message: 'Data has been add',
  });
};

module.exports = { getUsers, addUsers };
