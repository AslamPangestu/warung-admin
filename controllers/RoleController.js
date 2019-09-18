var Role = require("../models/Role");

exports.getAll = (req, res) => {
  Role.find()
    .sort({ created_at: -1 })
    .then(items => {
      if (items.length === 0) {
        res.status(200).json({
          message: "Belum Ada Data Role"
        });
      } else if (items === undefined) {
        res.status(404).json({
          message: "Role tidak ditemukan"
        });
      } else {
        res.status(200).json({
          message: "Daftar role yang ada",
          data: items
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
};

exports.create = (req, res) => {
  const newItem = new Role({
    name: req.body.name,
    description: req.body.description
  });
  newItem
    .save()
    .then(item =>
      res.status(200).json({
        message: "Berhasil menambah Role",
        data: item
      })
    )
    .catch(error => {
      console.log(error);
      res.status(400).json({
        message: error.message.slice(error.message.lastIndexOf(":") + 2)
      });
    });
};

exports.findById = (req, res) => {
  Role.findById(req.params.id)
    .then(item =>
      res.status(200).json({
        message: `Role ${item.name} ditemukan`,
        data: item
      })
    )
    .catch(err =>
      res.status(404).json({
        status: 404,
        message: "Role tidak ditemukan"
      })
    );
};

exports.updateById = (req, res) => {
  Role.findByIdAndUpdate(req.params.id, req.body)
    .then(item =>
      res.status(200).json({
        message: `Berhasi mengubah Role ${item.name}`,
        data: item
      })
    )
    .catch(err =>
      res.status(404).json({
        message: "Role tidak ditemukan"
      })
    );
};

exports.deteleById = (req, res) => {
  Role.findById(req.params.id)
    .then(item =>
      item.remove().then(() =>
        res.status(200).json({
          message: `Berhasih menghapus role ${item.name}`,
        })
      )
    )
    .catch(err =>
      res.status(404).json({
        message: "Role tidak ditemukan"
      })
    );
};
