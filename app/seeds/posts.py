from app.models import db, Post
from faker import Faker
import math
from random import random

faker = Faker()

def seed_posts():
    for _ in range(80):
        post = Post(
            user_id= faker.random_int(min=1,max=15),
            caption= faker.sentence(),
            # image= [faker.image_url(), faker.image_url(), faker.image_url(), faker.image_url()]
            ## in url below the first static number is width and the second is height
            image=[f"https://picsum.photos/seed/{faker.random_int(min=1,max=1000)}/875/700" for i in range(math.ceil(random() * 5))]
        )
        db.session.add(post)
        db.session.commit()



def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
