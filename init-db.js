db.auth('poliark', 'poliark');
db = db.getSiblingDB('chatbot');

db.createUser({
    user: "poliark",
    pwd: "poliark",
    roles: [
        {
            role: "readWrite",
            db: "chatbot"
        }
    ]
});
