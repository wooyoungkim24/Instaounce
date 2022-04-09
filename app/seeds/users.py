from app.models import db, User
from faker import Faker
from random import random
import math
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Demo", last_name="User", profile_image="https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", bio="Hello I am the Demo User")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name="Marnie", last_name="Delgato", profile_image="https://previews.123rf.com/images/fizkes/fizkes2010/fizkes201001384/157765614-profile-picture-of-smiling-indian-female-isolated-on-grey-studio-background-show-optimism-and-positi.jpg", bio="Hello my name is Marnie")
    
    db.session.add(demo)
    db.session.add(marnie)
    for i in range(30): #make 30
        user = User(
            username= fake.user_name(),
            email= fake.email(),
            password= fake.password(),
            first_name= fake.first_name(),
            last_name= fake.last_name(),
            profile_image= f"https://picsum.photos/seed/{i}/500",
            bio= fake.sentence(),
        )
        db.session.add(user)
        db.session.commit()
        
    all_users = User.query.all()
    
    for user in all_users:
        for i in range(math.floor(random() * len(all_users))):
            num = math.floor(random() * len(all_users))
            if num == 0:
                num = 1
            user.follow(User.query.get(num))
            db.session.commit()




    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
