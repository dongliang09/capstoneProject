from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo', lastName='User', email='demo@aa.io', password='password')
    abel = User(
        firstName='Abel', lastName='Wang', email='abel@aa.io', password='password')
    enoch = User(
        firstName='Enoch', lastName='Lu', email='enoch@aa.io', password='password')
    noah = User(
        firstName='Noah', lastName='Fang', email='noah@aa.io', password='password')
    me = User(
        firstName='Dongliang', lastName='Li', email='dongliang14@gmail.com', password='password')

    db.session.add(demo)
    db.session.add(abel)
    db.session.add(enoch)
    db.session.add(noah)
    db.session.add(me)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
