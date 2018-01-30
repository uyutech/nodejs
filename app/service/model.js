/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Service extends egg.Service {
  async worksInfo(worksId) {
    if(!worksId) {
      return;
    }
    let s = `SELECT
      works.id as worksId,
      works.title as worksTitle,
      works.sub_title as worksSubTitle,
      works.type as worksType,
      works.describe as worksDescribe,
      works.is_authorize as worksIsAuthorize,
      works.state as worksState,
      works.cover as worksCover,
      works.template as worksTemplate,
      works_type.name as worksTypeName,
      works_state.name as worksStateName
    FROM
      works,
      works_type,
      works_state
    WHERE
      works.id=${worksId}
    AND
      works.type=works_type.id
    AND
      works.state=works_state.id
    AND
      works.is_deleted=false
    AND
      works_type.is_deleted=false
    AND
      works_state.is_deleted=false
    LIMIT 1;`;
    let res = await this.app.sequelizeCircling.query(s, { type: Sequelize.QueryTypes.SELECT });
    return res[0];
  }
  async worksWorkList(worksId) {
    if(!worksId) {
      return;
    }
    let s = `SELECT
      work.id as workId,
      work.title as workTitle,
      work.sub_title as workSubTitle,
      work.describe as workDescribe,
      work.url as workUrl,
      work.state as workState,
      work_type.type as workType,
      work_type.name as workTypeName,
      work_type.category as workCategory
    FROM
      work,
      works_work_relation,
      work_type
    WHERE
      works_work_relation.works_id=${worksId}
    AND
      works_work_relation.work_id=work.id
    AND
      work.type=work_type.type
    AND
      work_type.is_deleted=false
    LIMIT 100;`;
    let res = await this.app.sequelizeCircling.query(s, { type: Sequelize.QueryTypes.SELECT });
    // 搜索image，media，text扩展表
    if(res.length) {
      let hash = {};
      let ids = res.map(function(item, i) {
        hash[item.workId] = i;
        return item.workId;
      });
      // 每个id仅在一个扩展表中出现，防止重复出现在多个扩展表问题交由添加业务实现
      let workList = await Promise.all([
        this.app.sequelizeCircling.query(`SELECT work_id as workId, width, height
          FROM work_image WHERE work_id in (${ids.join(', ')})`, { type: Sequelize.QueryTypes.SELECT }),
        this.app.sequelizeCircling.query(`SELECT work_id as workId, width, height, time, rate, cover, lrc
          FROM work_media WHERE work_id in (${ids.join(', ')})`, { type: Sequelize.QueryTypes.SELECT }),
        this.app.sequelizeCircling.query(`SELECT work_id as workId, content
          FROM work_text WHERE work_id in (${ids.join(', ')})`, { type: Sequelize.QueryTypes.SELECT })
      ]);
      workList.forEach(function(arr) {
        arr.forEach(function(item) {
          Object.assign(res[hash[item.workId]], item);
        });
      });
    }
    return res;
  }
  async worksCommentData(worksId, option) {
    if(!worksId) {
      return;
    }
    let res = await Promise.all([
      this.worksCommentSize(worksId),
      this.worksCommentList(worksId, option)
    ]);
    return {
      size: res[0],
      data: res[1],
    };
  }
  async worksCommentSize(worksId) {
    if(!worksId) {
      return;
    }
    let s = `SELECT
      count(*) as size
    FROM
      works,
      works_comment_relation
    WHERE
      works.id=${worksId}
    AND
      works.id=works_comment_relation.works_id;`;
    let res = await this.app.sequelizeCircling.query(s, { type: Sequelize.QueryTypes.SELECT });
    return (res[0] || {}).size || 0;
  }
  async worksCommentList(worksId, option = {
    index: 0,
    length: 10,
    sort: 0,
  }) {
    if(!worksId
      || option.index === undefined
      || option.length === undefined
      || option.index < 0
      || option.length <= 0) {
      return [];
    }
    let s = `SELECT
      works_comment_relation.comment_id as commentId
    FROM
      works,
      works_comment_relation
    WHERE
      works.id=${worksId}
    AND
      works.id=works_comment_relation.works_id
    ORDER BY commentId desc
    LIMIT ${option.index}, ${option.length};`;
    let res = await this.app.sequelizeCircling.query(s, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      let hash = {};
      let commentIdList = res.map(function(item, i) {
        hash[item.commentId] = i;
        return item.commentId;
      });
      let commentList = await this.commentList(commentIdList);
      commentList.forEach(function(item) {
        if(item.isAuthor) {
          delete item.userId;
        }
        else {
          delete item.authorId;
        }
        Object.assign(res[hash[item.commentId]], item);
      });
    }
    return res;
  }
  async commentList(commentIdList) {
    if(!commentIdList.length) {
      return [];
    }
    let s = `SELECT
      id as commentId,
      user_id as userId,
      author_id as authorId,
      is_author as isAuthor,
      content,
      create_time as date
    FROM
      comment
    WHERE
      id in (${commentIdList.join(', ')});`;
    let res = await this.app.sequelizeCircling.query(s, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      let hash = {};
      let userIdList = [];
      let authorIdList = [];
      for(let i = 0, len = res.length; i < len; i++) {
        let item = res[i];
        if(item.isAuthor) {
          authorIdList.push(item.authorId);
          hash[item.authorId] = hash[item.authorId] || [];
          hash[item.authorId].push(i);
        }
        else {
          userIdList.push(item.userId);
          hash[item.userId] = hash[item.userId] || [];
          hash[item.userId].push(i);
        }
      }
      let peopleInfoList = await Promise.all([
        this.userListInfo(userIdList),
        this.authorListInfo(authorIdList)
      ]);
      peopleInfoList[0].forEach(function(item) {
        res[hash[item.userId]].forEach(function(o) {
          Object.assign(o, item);
        });
        Object.assign(res[hash[item.userId]], item);
      });
      peopleInfoList[1].forEach(function(item) {
        res[hash[item.authorId]].forEach(function(o) {
          Object.assign(o, item);
        });
      });
    }
    return res;
  }
  async userListInfo(userIdList) {
    if(!userIdList.length) {
      return [];
    }
    let s = `SELECT
      id as userId,
      name as userName,
      head_url as userHeadUrl,
      sign as userSign
    FROM
      user
    WHERE
      state!=0
    AND
      id in (${userIdList.join(', ')});`;
    let res = await this.app.sequelizeCircling.query(s, { type: Sequelize.QueryTypes.SELECT });
    return res || [];
  }
  async authorListInfo(authorIdList) {
    if(!authorIdList.length) {
      return [];
    }
    let s = `SELECT
      id as authorId
      name as authorName
      head_url as authorHeadUrl
      sign as authorSign
    FROM
      author
    WHERE
      is_deleted=false
    AND
      id in (${authorIdList.join(', ')});`;
    let res = await this.app.sequelizeCircling.query(s, { type: Sequelize.QueryTypes.SELECT });
    return res || [];
  }
}

module.exports = Service;
