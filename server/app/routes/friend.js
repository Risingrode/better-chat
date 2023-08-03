const express = require("express");
const router = express.Router();
const friend = require("../../container/friend/index");
const jwt = require("jsonwebtoken");
const secretKey = "xWbiNA3FqnK77MnVCj5CAcfA-VlXj7xoQLd1QaAme6l_t0Yp1TdHbSw";
const { RespTokenErr } = require("../../model/error");

// JWT 校验中间件
function authenticateToken(req, res, next) {
  // 获取 JWT 字符串
  const token = req.headers.authorization;
  if (!token) {
    // 如果没有 JWT，则返回 401 Unauthorized
    return RespError(res, RespTokenErr);
  }

  // 验证 JWT
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // JWT 验证失败，则返回 401 Unauthorized
      return RespError(res, RespTokenErr);
    } else {
      // JWT 验证成功，将 JWT 中的信息存储在请求对象中，并调用 next() 继续处理请求
      req.user = decoded;
      next();
    }
  });
}
module.exports = function () {
  router.get("/friend_list", authenticateToken, friend.getFriendList);
  router.get("/group_list", authenticateToken, friend.getFriendGroupList);
  router.post("/create_group", authenticateToken, friend.createFriendGroup);
  router.post("/search_user", authenticateToken, friend.searchUser);
  router.post("/add_friend", authenticateToken, friend.addFriend);
  router.get("/get_friend", authenticateToken, friend.getFriendById);
  router.post("/update_friend", authenticateToken, friend.updateFriendInfo);
  return router;
};
