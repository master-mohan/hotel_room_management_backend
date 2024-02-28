class CRUD {
  static async save(model, data) {
    return model
      .create(data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw { message: err.message };
      });
  }

  static async create(model, data) {
    return model
      .create(data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw { message: err.message };
      });
  }

  static async aggregate(model, query) {
    return model
      .aggregate(query)
      .exec()
      .then((result) => {
        return result[0];
      })
      .catch((err) => {
        throw err;
      });
  }

  static async findAll(model, querry) {
    return model
      .find(querry)
      .exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async find(model, querry) {
    const offset = querry?.offset;
    const limit = querry?.pageSize;
    const filter = querry?.filter;
    return model
      .find(filter)
      .skip(offset)
      .limit(limit)
      .exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async updateOne(model, query, updateData) {
    return model
      .updateOne(query, updateData)
      .exec()
      .then((result) => {
        throw result;
      })
      .catch((err) => {
        console.log("err --  ", err);
        throw err;
      });
  }

  static async findOneAndUpdate(model, query, updateData, options = {}) {
    return model
      .findOneAndUpdate(query, updateData, options)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("err --  ", err);
        throw err;
      });
  }

  static async findOne(model, query) {
    return model
      .findOne(query)
      .exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async count(model, query) {
    return model
      .find(query)
      .exec()
      .count()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async distinct(model, uniqueKey, query) {
    return model
      .distinct(uniqueKey, query)
      .exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = { CRUD };
