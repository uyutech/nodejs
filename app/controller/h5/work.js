/**
 * Created by army8735 on 2018/4/17.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async addViews() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    service.work.incrementViews(id);
    ctx.body = ctx.helper.okJSON();
  }

  async report() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let uid = ctx.session.uid;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    await service.work.report(id, uid);
    ctx.body = ctx.helper.okJSON();
  }

  async updateSize() {
    const { ctx, app, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let width = parseInt(body.width);
    let height = parseInt(body.height);
    if(!id || !width || !height) {
      return;
    }
    let kind = service.work.getKind(id);
    if(kind === 1) {
      await app.model.video.update({
        width,
        height,
      }, {
        where: {
          id,
        },
        raw: true,
      });
    }
    else if(kind === 3) {
      await app.model.image.update({
        width,
        height,
      }, {
        where: {
          id,
        },
        raw: true,
      });
    }
    ctx.body = ctx.helper.okJSON();
  }

  async updateDuration() {
    const { ctx, app, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let duration = parseInt(body.duration);
    if(!id || !duration) {
      return;
    }
    let kind = service.work.getKind(id);
    if(kind === 1) {
      await app.model.video.update({
        duration,
      }, {
        where: {
          id,
        },
        raw: true,
      });
    }
    else if(kind === 2) {
      await app.model.audio.update({
        duration,
      }, {
        where: {
          id,
        },
        raw: true,
      });
    }
    ctx.body = ctx.helper.okJSON();
  }
}

module.exports = Controller;
