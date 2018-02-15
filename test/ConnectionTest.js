let expect = require("chai").expect;
let Connection = require('../connection/model');
let Collection = require('../connection/collection');

let _ = require('lodash');
let uuid = require('uuid').v1;

describe("Collection", function () {
    let collection;

    beforeEach(function() {
        collection = new Collection();
    });

    it("should be define", function () {
        expect(collection).not.to.be.undefined;
    });

    describe("Collection add, update and delete connection", function () {
        let collection;
        beforeEach(function() {
            collection = new Collection();
        });

        it("should add in both map socket and user", function () {
            let userId = uuid();
            let socketId = uuid();

            collection.add(new Connection(socketId, userId , new Object()));
            expect( _.size(collection.userIdMap)).to.equal(1);
            expect( _.size(collection.sockeIdMap)).to.equal(1);
            expect(collection.userIdMap[userId].player).to.equal(collection.sockeIdMap[socketId].player);
        });

        it("should removeBySocketId in both map socket and user", function () {
            collection.add(new Connection(uuid(), uuid() , new Object()));
            collection.add(new Connection(uuid(), uuid() , new Object()));
            expect( _.size(collection.userIdMap)).to.equal(2);
            expect( _.size(collection.sockeIdMap)).to.equal(2);

            let connection = collection.sockeIdMap[  _.findLastKey(collection.sockeIdMap)];
            collection.removeBySocketId(connection.socketId);

            expect( _.size(collection.sockeIdMap)).to.equal(1);
            expect( _.size(collection.userIdMap)).to.equal(1);

        });

        it("should removeByUserId in both map socket and user", function () {

            collection.add(new Connection(uuid(), uuid() , new Object()));
            collection.add(new Connection(uuid(), uuid() , new Object()));
            expect( _.size(collection.userIdMap)).to.equal(2);
            expect( _.size(collection.sockeIdMap)).to.equal(2);

            let connection = collection.userIdMap[  _.findLastKey(collection.userIdMap)];
            collection.removeByUserId(connection.userId);

            expect( _.size(collection.sockeIdMap)).to.equal(1);
            expect( _.size(collection.userIdMap)).to.equal(1);

        });

        it("should update in both map socket and user the socketId", function () {
            collection.add(new Connection('socket1', 'user1' , new Object()));
            collection.add(new Connection('socket2', 'user2' , new Object()));
            expect( _.size(collection.userIdMap)).to.equal(2);
            expect( _.size(collection.sockeIdMap)).to.equal(2);

            collection.update('user1','socketUpdated');

            expect( _.size(collection.userIdMap)).to.equal(2);
            expect( _.size(collection.sockeIdMap)).to.equal(2);

            expect(collection.sockeIdMap['socketUpdated'].player).to.equal(collection.userIdMap['user1'].player);
            expect(collection.userIdMap['user1'].socketId).to.equal('socketUpdated');
        });
    });
});
