/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async worksCommentNum() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    if(uid !== 2018000000000002) {
      return ctx.body = uid;
    }
    let id = ctx.query.id;
    ctx.body = '';
    if(id) {
      let sql = `SELECT *
        FROM works_comment_relation
        WHERE works_id=${id}`;
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
        ctx.body += item.comment_id + ':' + size + '\n';
      }
    }
    else {
      let sql = `SELECT
        works_id,
        comment_id
        FROM works_comment_relation`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      ctx.body = res.length + '\n';
      for(let i = 0, len = res.length; i < len; i++) {
        let item = res[i];
        let sql = `SELECT
          COUNT(*) AS size
          FROM comment
          WHERE root_id=${item.comment_id}
          AND is_deleted=false`;
        let res2 = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
        let size = res2[0].size || 0;
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
        ctx.body += item.works_id + ':' + item.comment_id + ':' + size + '\n';
      }
    }
  }
  async authorCommentNum() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    if(uid !== 2018000000000002) {
      return ctx.body = uid;
    }
    let id = ctx.query.id;
    ctx.body = '';
    if(id) {
      let sql = `SELECT *
        FROM author_comment_relation
        WHERE author_id=${id}`;
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
        ctx.body += item.comment_id + ':' + size + '\n';
      }
    }
    else {
      let sql = `SELECT
        author_id,
        comment_id
        FROM author_comment_relation`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      ctx.body = res.length + '\n';
      for(let i = 0, len = res.length; i < len; i++) {
        let item = res[i];
        let sql = `SELECT
          COUNT(*) AS size
          FROM comment
          WHERE root_id=${item.comment_id}
          AND is_deleted=false`;
        let res2 = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
        let size = res2[0].size || 0;
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
        ctx.body += item.author_id + ':' + item.comment_id + ':' + size + '\n';
      }
    }
  }
}

module.exports = Controller;
