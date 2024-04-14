#THIS IS A SAMPLE ENV FILE WITH DUMMY CREDENTIALS, USE YOUR OWN CREDENTIALS
export APP_ENV='local'
export PORT='3000'

#DB CREDENTIALS
export PG_USERNAME='hrithikjlocal'
export PG_PASSWORD='hj@local'
export PG_HOST='localhost'
export PG_PORT='5432'
export PG_DATABASE='bsw-h2j-local'

#KEYS
export DELETE_ACCESS_KEY='sampledeletekey'
export WRITE_ACCESS_KEY='samplewritekey'

#RL
export IP_MAX_REQ='50'
export IP_TIME_FRAME='300'
export PATH_MAX_REQ='30'
export PATH_TIME_FRAME='600'

export JWT_SECRET='samplejwtsecret'

# npm run start
npm run dev