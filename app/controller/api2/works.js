/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    if(!worksId) {
      return;
    }
    let index = body.index || 0;
    let length = body.length || 10;
    let res = await service.works.comment(worksId, index, length);
    ctx.body = ctx.helper.okJSON(res);
  }
  async _commentNum() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    if(uid !== 2018000000000002) {
      return ctx.body = uid;
    }
    let worksId = ctx.query.worksId;
    ctx.body = '';
    if(worksId) {
      let sql = `SELECT *
      FROM works_comment_relation
      WHERE works_id=${worksId}`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      for(let i = 0, len = res.length; i < len; i++) {
        let item = res[i];
        let sql = `SELECT
        COUNT(*) AS size
        FROM comment
        WHERE root_id=${item.comment_id}
        AND is_deleted=false`;
        let res2 = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
        let size = res2[0].size || 0;
        if(size) {
          let obj = await app.model.commentNum.findOne({
            where: {
              comment_id: item.comment_id,
            },
          });
          if(obj) {
            obj.update({
              num: size,
              update_time: new Date(),
            });
          }
          else {
            await app.model.commentNum.create({
              comment_id: item.comment_id,
              type: 0,
              num: size,
              update_time: new Date(),
            });
          }
        }
        ctx.body += item.comment_id + ':' + size + '\n';
      }
    }
    else {
      let sql = `SELECT
        works_id,
        comment_id
      FROM works_comment_relation`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      for(let i = 0, len = res.length; i < len; i++) {
        let item = res[i];
        let sql = `SELECT
        COUNT(*) AS size
        FROM comment
        WHERE root_id=${item.comment_id}
        AND is_deleted=false`;
        let res2 = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
        let size = res2[0].size || 0;
        if(size) {
          let obj = await app.model.commentNum.findOne({
            where: {
              comment_id: item.comment_id,
            },
          });
          if(obj) {
            obj.update({
              num: size,
              update_time: new Date(),
            });
          }
          else {
            await app.model.commentNum.create({
              comment_id: item.comment_id,
              type: 0,
              num: size,
              update_time: new Date(),
            });
          }
        }
        ctx.body += item.comment_id + ':' + size + '\n';
      }
    }
  }
}

module.exports = Controller;
