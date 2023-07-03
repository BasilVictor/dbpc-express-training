# DBPC Express Backend Development Training

## Usage
Like every other node project, first run `npm install` to install all node packages.

By running `npm run start`, the express server can be started.

## Git Repository
The training has been split into a few checkpoints, the code base at each of these checkpoints can be found in their own branch. The branch follow a naming convention like `<checkpoint-number>_<breif-description>`. The `master` branch contains the complete latest code.

## 8_password-encrpytion
Here we modify the login endpoint to compare password hashes using the `bcrypt` library. We also add a few lines of code that generates password hashes in the test API endpoint.