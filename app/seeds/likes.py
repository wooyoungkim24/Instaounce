from app.models import db, Like
from faker import Faker
faker = Faker()


def seed_likes():
    for _ in range(30):
        like = Like(
            user_id= faker.random_int(min=1, max=15),
            post_id= faker.random_int(min=1, max=50)
        )
        db.session.add(like)
        db.session.commit()



def undo_likes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()