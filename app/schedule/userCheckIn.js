/**
 * Created by army8735 on 2018/7/31.
 */

'use strict';

const egg = require('egg');
const moment = require('moment');

class Subscription extends egg.Subscription {
  static get schedule() {
    return {
      cron: '0 0 0 * * *',
      type: 'worker',
    };
  }

  async subscribe() {
    const { app } = this;
    let yesterday = moment(moment().format('YYYY-MM-DD')).subtract(1, 'days');
    await app.model.userCheckIn.update({
      num: 0,
    }, {
      where: {
        num: {
          $gt: 0,
        },
        last_date: {
          $lt: yesterday.toDate(),
        },
      },
    });
  }
}

module.exports = Subscription;
