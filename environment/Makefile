up:
	cd infra && terraform init
	cd infra &&	terraform apply --auto-approve

kube-up:
	kops create cluster --state=s3://$(shell cd infra && terraform output kops_state_bucket_name) --name=rmit.k8s.local --zones="us-east-1a,us-east-1b" --master-size=t2.medium --yes
	aws iam attach-role-policy --role-name nodes.rmit.k8s.local --policy-arn arn:aws:iam::aws:policy/AdministratorAccess | echo "Hack"

kube-down:
	aws iam detach-role-policy --role-name nodes.rmit.k8s.local --policy-arn arn:aws:iam::aws:policy/AdministratorAccess | echo "hack"
	kops delete cluster --state=s3://$(shell cd infra && terraform output kops_state_bucket_name) rmit.k8s.local --yes

down:
	cd infra && terraform destroy --auto-approve

kube-validate:
	kops validate cluster --state=s3://$(shell cd infra && terraform output kops_state_bucket_name)
