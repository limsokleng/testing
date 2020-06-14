# Overview
    Continuous Integration is very good way to do automation deployment. Though,In our recent application, CI seem to be more complicated in processing all the deployment and very time consuming. So, at this moment, we will be using another approach to make life easier by deploying with container. Kubernetes is a very impressive tool to deploy our application in a way of continuous disintegration. It helps reducing expenses and resources. Moreover, it supports with multiple environments and different operating system.

    By using this method, Firstly, we will create helm chart for deploying to kubernetes. Secondly, we will deploy the non production environment to test whether things go as plan or not. In the testing deployment, we will automatically create namespace for the application in Kubernetes. Then, deploying a database to back the application. After creating database, we need to migrate database using script against the one we created before. Lastly of this step, we will deploy helm chart to Kubernetes cluster. Thirdly, if everything is working as expected, we will deploy a production environment. At this stage, stage gate will be added to ask deployer for approval before next deployment. Lastly, we will create aws cloudwatch for checking the logs of the production.

# How to deploy with Kubernetes
- Step 1: make sure all credentials file are correct. (eg: mine is ~/rmit-creds.sh)
- Step 2: Starting up the environment using the command below:

cd environment
make up
make kube-up

- Step 3: After starting the environment, we will get the output of ECR, bucket name, kops bucket name, and dynamo table name. open the Makefile in infra folder and change the value of each parameter. For example:

Outputs:

dynamoDb_lock_table_name = RMIT-locktable-4cac5q
ecr_url = 772976663640.dkr.ecr.us-east-1.amazonaws.com/app
kops_state_bucket_name = rmit-kops-state-4cac5q
state_bucket_name = rmit-tfstate-4cac5q

Then, we need to change Makefile command to this.

terraform init --backend-config="key=state/${ENV}.tfstate" --backend-config="dynamodb_table=RMIT-locktable-4cac5q" --backend-config="bucket=rmit-tfstate-4cac5q"

Run the Makefile when changes are made by "ENV=non-production make init". Once we finish, we need to change the ecr as well, in our example '772976663640.dkr.ecr.us-east-1.amazonaws.com'. Copy this and paste in .circleci/config.yml which in line 115 (package section). And we are done in this step.

- Step 4: By starting the environment, it also creates Elastic Container Register (check in AWS Console to make sure). Then, in AWS Console, we need to copy the VPC ID and subnet ID for deployment. Copy the value and paste those in terraform.tfvars. Then we are good to go.

- Step 5: Before deploying to circleci, we need to make sure the project in circleci has the same credentials as what we input in the start of the program.

- Step 6: Now we are able to deploy the application to circleci. It might take a while. If something unexpected happens and fail, just rerun the deployment.

- Step 7: We can check the application later with:

kubectl get services -n non-production                  (for testing environment)
kubectl get services -n production                      (for production environment)

Then we will get the external-ip which we can use to access the website in browser. this application listens to port 3000. Copy and paste the link in browser including ":3000".

- Step 8: We can also check the logs as well in AWS console as we deploy the application with integrate logging.



# Clean up

To clean everything up:

Remove Non Production:

- Step 1: Reinitialize terraform with test remote backend

cd infra
ENV=non-production make init

- Step 2: Remove the infrastructure we deployed

ENV=non-production make down


Remove Production:

- Step 1: Reinitialize terraform with test remote backend

cd infra
ENV=production make init

- Step 2: Remove the infrastructure we deployed

ENV=production make down


Remove apps:

- Step 1: We need to uninstall helm release

helm list -A

helm uninstall [name] -n non-production
helm uninstall [name] -n production


Remove Kubernetes and other environment:

- Delete cluster and other resources

cd environment
make kube-down
make down