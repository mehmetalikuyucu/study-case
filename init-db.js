db.auth('bolt', 'bolt');
db = db.getSiblingDB('chatbot');

db.createUser({
    user: "bolt",
    pwd: "bolt",
    roles: [
        {
            role: "readWrite",
            db: "chatbot"
        }
    ]
});
