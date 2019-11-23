Sample applications for Worker tier environments. Zip bundle for the application will be attached to the article for reference. Simply upload the zip bundle to beanstalk as usual (add .ebextensions as needed).

The reason for making this sample this is to clear some confusion as to what the cron.yaml exactly does and clarify that one can simply send custom message using an SQS queue to a worker app and trigger their app in anyway they want. The console log output in this application is laid out in a more simpler fashion to help understand better.

1) Node.js platform: The attached Nodejs_worker_app_v1_0_0.zip application can handle JSON body message requests from the SQS queue. The application is supposed to perform as console log upon a POST request on the root URL for localhost. This POST request will be the result of the SQSD daemon making that request once it gets a message from the assigned SQS queue for the environment. The application itself runs on the default port 8081. A test page index.html page is included to handle the default GET requests (to prevent 5xx errors, if someone tries to curl localhost). There is also a Cron.yaml included to post requests on the /<my_path> in this case I am using /scheduled as with our official sample app. The application will handle the /scheduled request similarly, except there wont be a body dumped to console log but just the request headers.

To ensure that the application was correctly installed, please check the /var/log/eb-commandprocessor.log for any errors during installation.

To review the message and message headers/attributes please refer to /var/log/nodejs/nodejs.log. You can run $ tail -f /var/log/nodejs/nodejs.log on the instance as you send messages to review each message as it is received.

Steps:

1) Create Worker tier environment for the NodeJS platform

2) Upload the zip bundle

3) Edit configuration to either add a pre-existing SQS queue or Auto generate one

4) Add AWS pem key to the instance for SSH access

5) Once the environment is ready SSH to the instance

6) run $ tail -f /var/log/nodejs/nodejs.log

7) From the web console navigate to the SQS queue assigned to the enviornment

8) Select the queue and under Queue Actions, select send message

9) On the popup box create a JSON message (example: {"hello":"world"}), optionally add attributes and click send message

10) On the SSH session with the instance you should be able to see the message body and headers as part of /var/log/nodejs/nodejs.log.


