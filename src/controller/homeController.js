// const connectionDB = new ConnectionDB

const getHomePage = (req, res) => {
  res.render('sample', {message: 'Hello World! OK'});
  //   process data
  //   call models ở đây
  //   res.json({message: 'Hello World'});
};

module.exports = {
  getHomePage,
};
