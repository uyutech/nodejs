/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { app, ctx, service } = this;
    let uid = ctx.session.uid;
    let worksId = parseInt(ctx.params.worksId);
    let workId = parseInt(ctx.params.workId);
    if(!worksId) {
      return;
    }
    let [info, collection, commentList] = await Promise.all([
      service.works.infoPlusAllAuthor(worksId),
      service.works.collectionFull(worksId, uid, true),
      service.works.commentList(worksId, uid, 0, LIMIT)
    ]);
    if(!info || info.isDelete || info.state === 3) {
      return;
    }
    if(commentList) {
      commentList.limit = LIMIT;
    }
    else {
      let transaction = await app.sequelizeCircling.transaction();
      try {
        let comment = await app.model.comment.create({
          content: worksId,
          user_id: 2018000000008222,
          is_delete: true,
          review: 3,
          root_id: 0,
          parent_id: 0,
        }, {
          transaction,
          raw: true,
        });
        let commentId= comment.id;
        await app.model.worksCommentRelation.create({
          author_id: worksId,
          comment_id: commentId,
        }, {
          transaction,
          raw: true,
        });
        await transaction.commit();
      }
      catch(e) {
        await transaction.rollback();
      }
      commentList = {
        data: [],
        count: 0,
        limit: LIMIT,
      };
    }
    await ctx.render('dworks', {
      worksId,
      workId,
      info,
      collection,
      commentList,
    });
  }
}

module.exports = Controller;
