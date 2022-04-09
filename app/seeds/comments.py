from app.models import db, Comment
from faker import Faker
faker = Faker()


def seed_comments():
    for _ in range(100): #make 250
        comment = Comment(
            post_id= faker.random_int(min=1, max=80),
            user_id= faker.random_int(min=1, max=15),
            content= faker.sentence()
        )
        db.session.add(comment)
        db.session.commit()



def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()