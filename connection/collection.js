let _ = require('lodash');

function Collection() {
     this.sockeIdMap = {};
     this.userIdMap = {};
}

Collection.prototype.add = function (connection) {
    this.sockeIdMap[connection.socketId] = connection;
    this.userIdMap[connection.userId] = connection;
};

Collection.prototype.removeBySocketId = function (id) {
    let connecton = this.sockeIdMap[id];
    _.unset(this.sockeIdMap, id);
    _.unset(this.userIdMap, connecton.userId);
};

Collection.prototype.removeByUserId = function (id) {
    let connecton = this.userIdMap[id];
    _.unset(this.userIdMap, id);
    _.unset(this.sockeIdMap, connecton.socketId);
};

Collection.prototype.update = function (userId, socketId) {
    let connecton = this.userIdMap[userId];
    _.unset(this.sockeIdMap, connecton.socketId);
    connecton.socketId = socketId;
    this.sockeIdMap[socketId] = connecton;
};

module.exports = Collection;




