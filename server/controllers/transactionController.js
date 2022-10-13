const { Transaction, User } = require("../models");
const axios = require("axios");
const { signPayloadToToken } = require("../helpers/helpers");

class transactionController {
  static async qrisPayment(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const oneTransaction = await Transaction.findOne({
        where: { UserId },
        include: [User],
      });
      if (oneTransaction) throw { name: "Already Pro Version" };

      let url = "https://wandysresto.web.app/";
      //   let apiKey ="xnd_development_ejOjwPNL7ah7ByNI69x3qoPGWj8QdJ69XzJJbWQCyB8iEVUenVva4zPo22iVz3gR";
      let apiKey =
        "xnd_development_7PAeRBlljCDlnvi8HeT7hf3JDDemRZ5F4nCYWaunwY92AGWnUPtsTBFwAGcni";

      const transactionId = Math.floor(
        Math.random() * 1000000000000000 + 1
      ).toString();
      const response = await axios.post(
        "https://api.xendit.co/qr_codes",
        {
          external_id: transactionId,
          reference_id: transactionId,
          currency: "IDR",
          type: "DYNAMIC",
          callback_url: `${url}`,
          amount: 50000,
        },
        {
          headers: {
            authorization: `Basic ${apiKey}`,
            "content-type": "application/json",
          },
        }
      );
      await Transaction.create({
        transId: trxId,
        payment: "qris",
        url: response.data.callback_url,
        UserId: req.user.id,
      });

      res.status(201).json({
        payment: "qris",
        url: response.data.callback_url,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = transactionController;
