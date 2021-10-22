module.exports = async (req, res) => {
  res.status(200).json({ data: { message: 'successfully signed out!' } })
};