variable "vpc_id" {
  type = string
}

variable "environment" {
  type = string
}

variable "name" {
  type = string
}

variable "username" {
  type = string
}

variable "password" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

provider "aws" {
  version = "~> 2.23"
  region  = "us-east-1"
}

data "aws_vpc" "main" {
  id = var.vpc_id
}

resource "aws_security_group" "default" {
  vpc_id      = var.vpc_id
  name        = format("%s-%s-sg", var.name, var.environment)
  description = format("Security Group for %s-%s", var.name, var.environment)

  ingress {
    protocol    = "tcp"
    from_port   = 5432
    to_port     = 5432
    cidr_blocks = ["${data.aws_vpc.main.cidr_block}"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_db_subnet_group" "default" {
  name        = "${var.name}-${var.environment}"
  description = "${var.name}-${var.environment}"
  subnet_ids  = var.subnet_ids
}

resource "aws_rds_cluster" "default" {
  cluster_identifier      = "${var.name}-${var.environment}"
  vpc_security_group_ids  = ["${aws_security_group.default.id}"]
  db_subnet_group_name    = aws_db_subnet_group.default.name
  database_name           = "servian"
  engine_mode             = "serverless"
  master_username         = var.username
  master_password         = var.password
  backup_retention_period = 7
  skip_final_snapshot     = true
  engine                  = "aurora-postgresql"
  engine_version          = "10.7"

  scaling_configuration {
    auto_pause               = true
    max_capacity             = 2
    min_capacity             = 2
    seconds_until_auto_pause = 300
  }
}

output "endpoint" {
  value = aws_rds_cluster.default.endpoint
}