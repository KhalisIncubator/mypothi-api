#!/usr/bin/env bash
docker start mypothi_api
# container_name=mypothi_api
# is_running=`docker inspect -f '{{.State.Running}}' $container_name`

# if [ -z "${DB_PORT}" ]; then
#     dbPort=3306
# else
#     dbPort=${DB_PORT}
# fi

# if [[ -z "$is_running" && "$is_running" -eq "false" ]]
# then
#      echo "Starting docker container"
#      docker run -d -e MYSQL_ALLOW_EMPTY_PASSWORD -e MYSQL_DATABASE=mypothi_pothi -d -p $dbPort:3306 --name $container_name khalisfoundation/banidb-dev:latest || docker start $container_name
#      attempt=0
#       while [ $attempt -le 59 ]; do
#         attempt=$(( $attempt + 1 ))
#         echo "Waiting for container to be up (attempt: $attempt)..."
#         result=$(docker exec banidb-api mysqladmin ping -u root -proot 2> /dev/null || echo 'fail' )
#         if grep -q 'mysqld is alive' <<< $result ; then
#               echo "DB container is up"
#               echo "Waiting for connections to stabilize"
#               break
#         fi
#         sleep 10
#       done
#       sleep 20
#       echo "~~~~Ready~~~~~~"
# else
#       echo "Docker container is running"
# fi
