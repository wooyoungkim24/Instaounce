# Instaounce
Where you can share images with family and friends.😊 Try it out and sign up now on our heroku site! [Instaounce](https://instaounce-clone.herokuapp.com/)

## Technologies Used
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React" width="50"/><img src="https://miro.medium.com/max/312/1*SRL22ADht1NU4LXUeU4YVg.png" alt="Redux" width="50"/><img src="https://pngset.com/images/node-js-nodejs-number-symbol-text-recycling-symbol-transparent-png-1383018.png" alt="NodeJS" width="50"/><img src="https://user-images.githubusercontent.com/24623425/36042969-f87531d4-0d8a-11e8-9dee-e87ab8c6a9e3.png" alt="PostgreSQL" width="50"/><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png" alt="Python" width="50"/><img src="https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png" alt="Javascript" width="50"/><img src="https://lms.techxyte.com/assets/technologies-logos/274/3.png" alt="SQLAlchemy" width="50"/><img src="https://sooftware.io/static/13c286ed78e56cb5a139e269d8eaea5f/fe339/flask.png" alt="Flask" width="50"/><img src="https://cdn-icons-png.flaticon.com/512/732/732212.png" alt="HTML" width="50"/><img src="https://cdn4.iconfinder.com/data/icons/iconsimple-programming/512/css-512.png" alt="CSS" width="50"/>

### Index
| [MVP Features List](https://github.com/wooyoungkim24/Instaounce/wiki/Feature-List) | [Database Schema](https://github.com/wooyoungkim24/Instaounce/wiki/Database-Schema) | [Data Diagram](https://github.com/wooyoungkim24/Instaounce/wiki/Database-Schema) | [Routes](https://github.com/wooyoungkim24/Instaounce/wiki/Endpoints) | [Models](https://github.com/wooyoungkim24/Instaounce/wiki/Models) | [User Stories](https://github.com/wooyoungkim24/Instaounce/wiki/User-Stories) | [Wireframe](https://github.com/wooyoungkim24/Instaounce/wiki/Wireframe) |


### Features
Users cannot use any features until authorized.
Logged in users can perform the following actions.

* View/Add a Post
* Edit/Delete their own Posts
* View/Add Comments
* Edit/Delete their own Comments
* View Followers
* Follow and Unfollow other users
* Like and Unlike a post

## Getting started
### Dev Containers (M1 Users, follow this guide)

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. 
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. 
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```
4. Open the repo in VS Code. 
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner. 
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app. 

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br>

### Standard (Traditional)

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |

## Deploy to Heroku

### Abstract
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations. 

### Writing your Dockerfile
In order for the Github action to work effectively, it must have a configured docker file. In order to effectively deploy your site you need to code out the notes found in this [docker file](./Dockerfile)

### Configuring Production Environment Variables 

1. In your Heroku app settings you should have two environment variables set. 

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

2. In your Github Actions Secrets you should have two environment variables set. You can find this webpage at the following address: *github.com/userID/repoName/settings/secrets/actions*

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token |
   | `HEROKU_APP_NAME` | Heroku app name    |

3. To get an Oauth token for Heroku, run the following command in your terminal already authenticated to the Heroku CLI and pull out the string on the Token key. 
   ```bash
   heroku authorizations:create 
   ```
