/**
 * Created by army8735 on 2018/6/10.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async tag() {
    const { app, ctx, service } = this;
    let res = await app.model.guideTag.findAll({
      attributes: [
        ['tag_id', 'tagId']
      ],
      where: {
        is_delete: false,
      },
      order: [
        ['weight', 'DESC']
      ],
      raw: true,
    });
    let idList = res.map((item) => {
      return item.tagId;
    });
    let tagList = await service.tag.infoList(idList);
    ctx.body = ctx.helper.okJSON(tagList);
  }

  async followTag() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let idList = body.idList;
    if(idList) {
      let circleIdList = await app.model.circleTagRelation.findAll({
        attributes: [
          ['circle_id', 'circleId']
        ],
        where: {
          tag_id: idList,
          type: 1,
        },
        raw: true,
      });
      let query = circleIdList.map((item) => {
        let id = item.circleId;
        return app.model.userCircleRelation.upsert({
          user_id: uid,
          circle_id: id,
          type: 1,
        }, {
          where: {
            user_id: uid,
            circle_id: id,
          },
          raw: true,
        });
      });
      idList.forEach((id) => {
        query.push(
          app.model.userTagRelation.upsert({
            user_id: uid,
            tag_id: id,
            ref: 1,
            type: 1,
          }, {
            where: {
              user_id: uid,
              tag_id: id,
            },
            raw: true,
          })
        );
      });
      await query;
    }
    app.model.user.update({
      reg_state: 12,
    }, {
      where: {
        id: uid,
      },
    });
    service.user.clearInfoCache(uid);
    ctx.body = ctx.helper.okJSON();
  }
}

module.exports = Controller;
