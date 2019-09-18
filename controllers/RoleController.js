var Model = require("../models/Role");

exports.getAll = (req, res) => {
  Model.find()
    .sort({ created_at: -1 })
    .then(items => {
      if (items.length === 0) {
        res.status(200).json({
          message: "Belum Ada Data Role"
        });
      } else if (items === undefined) {
        res.status(404).json({
          message: "Items not found"
        });
      } else {
        res.status(200).json({
          message: "Success get all items",
          data: items
        });
      }
    });
};

exports.create = (req, res) => {
  if (req.body.name === "") {
    res.status(400).json({
      status: 400,
      message: "Name is empty",
      success: false
    });
  } else if (req.body.count === "") {
    res.status(400).json({
      status: 400,
      message: "Count is empty",
      success: false
    });
  } else {
    const newItem = new Model({
      name: req.body.name,
      count: parseInt(req.body.count)
    });
    newItem.save().then(item =>
      res.status(200).json({
        status: 200,
        message: "Succes add new item",
        data: item,
        success: true
      })
    );
  }
};

exports.findById = (req, res) => {
  Model.findById(req.params.id)
    .then(item =>
      res.status(200).json({
        status: 200,
        message: `Succes get data ${req.params.id}`,
        data: item,
        success: true
      })
    )
    .catch(err =>
      res.status(404).json({
        status: 404,
        message: `Failed get data ${req.params.id}. ${err}`,
        success: false
      })
    );
};

exports.updateById = (req, res) => {
  Model.updateById(req.params.id, new Role(req.body), function(err, item) {
    if (err) res.send(err);
    res.json(item);
  });
};

exports.deteleById = (req, res) => {
  Model.findById(req.params.id)
    .then(item =>
      item.remove().then(() =>
        res.status(200).json({
          status: 200,
          message: `Succes remove data ${req.params.id}`,
          success: true
        })
      )
    )
    .catch(err =>
      res.status(404).json({
        status: 404,
        message: `Failed remove data ${req.params.id}. ${err}`,
        success: false
      })
    );
};
