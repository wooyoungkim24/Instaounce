from app.models import db, Post
from faker import Faker
faker = Faker()

def seed_posts():
    for _ in range(20):
        post = Post(
            user_id= faker.random_int(min=1,max=2),
            caption= faker.sentence(),
            image= faker.random_element(elements=('https://pixabay.com/get/g7561a68cc492992e8ab6a890c079ccfd59759e55dfedd465325e8c6d55c4c76b80393a4b130a46cac953f46f41898da6_1280.jpg', 'https://pixabay.com/get/g2a80c4e1e688001b7ee013b647b3b19cd08c68ceebea53e631fcf4b4fb749d8cd8b7a8eba4667246731a02b2aeed0658_1280.jpg','https://pixabay.com/get/g2af2007f58911d4f3851c07b3763aef4b13c412685c64b2ad7d9865451c3e1fb12b6cb137de6735a3272a4c6f309615b_1280.jpg',
            'https://pixabay.com/get/g65b7e12f9b102d612d29d695be99335e2ef57c5841a6d69d9a4f877dc6ce1135fd33a82bc6c2c9d909feb27a8dfd4588_1280.jpg')),
        )
        db.session.add(post)
        db.session.commit()



def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
