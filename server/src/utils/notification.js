/* global LoginRooms */
const { Query } = require('./query');

// 通知对方（传入receiver_username或者receiver_id）
const NotificationUser = async data => {
    // 接收者
    let receiver_username = data.receiver_username;
    
    // 如果没有传入receiver_username，则通过receiver_id查询数据库获取用户名
    if (!receiver_username) {
        const sql = `SELECT username FROM user WHERE id = ?`;
        const results = await Query(sql, [data.receiver_id]);
        receiver_username = results[0].username;
    }
    
    // 如果目标用户已登录并存在于LoginRooms中
    if (LoginRooms[receiver_username]) {
        // 通过WebSocket发送通知数据给目标用户
        LoginRooms[receiver_username].ws.send(JSON.stringify(data));
    }
};

// 导出NotificationUser函数供其他模块使用
module.exports = {
    NotificationUser
};
