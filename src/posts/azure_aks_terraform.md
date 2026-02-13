---
title: Azure AKS with Terraform
description: This page explains how to provision a production-ready Azure Kubernetes Service (AKS) cluster using Terraform, with automated CI/CD via Azure DevOps and GitOps application management using ArgoCD.
date: Feb/3/2016
tags: azure,azure-devops,terraform,argocd,api-gateway
---
# Introduction
This project provisions an Azure Kubernetes Service (AKS) cluster in Azure, designed to deliver a production-ready infrastructure using Terraform. The solution leverages Azure DevOps for deployment, integrates GitOps methodologies, utilizes Azure DevOps Pipelines, and automates as many steps as possible for both infrastructure and application management.

# Architecture
![imagen](/images/architecture-aks-tf.png)

# Repository Structure
The repository is organized to separate global resources from environment-specific resources, following best practices for scalable infrastructure management:

- **Global Layer (`layers/global`)**: Contains resources that are shared across all environments and do not belong to a specific environment. For example, a general Virtual Network (VNet) with multiple subnets that can be used by different environments. These resources are provisioned only once and do not use Terraform workspaces.

- **Shared Layer (`layers/shared`)**: Contains resources that are environment-specific and leverage Terraform workspaces. Each environment (such as dev, prod, qas) will have its own set of resources, such as an AKS cluster per environment. This allows for isolated infrastructure per environment while reusing the same Terraform code.

Modules are located in the `modules` directory and are used to encapsulate reusable Terraform code for resources like AKS, networking, resource groups, and VM scale sets.

# Azure DevOps
Azure DevOps was chosen for this project due to its strong integration with Azure services. The solution uses Azure DevOps Repos for source control and Azure DevOps Pipelines for CI/CD automation.

The pipelines are configured to use a self-hosted agent pool, which is implemented as an Azure Virtual Machine Scale Set. This decision was made because the free tier of Azure DevOps does not provide default build agents, so a scalable, self-managed pool was required to run the pipelines reliably.

# Azure DevOps Pipelines
There is a dedicated Azure DevOps pipeline for each layer in the repository:

- **Global Layer Pipeline (`azure-pipelines-global.yml`)**: Handles the provisioning of global resources. The pipeline performs the following steps:
    - Installs required dependencies (such as unzip and Terraform).
    - Initializes Terraform in the global layer directory.
    - Runs `terraform plan` to generate an execution plan for the global resources.
    - Requires approval from designated reviewers before executing `terraform apply` to ensure quality gates and prevent unauthorized changes.
    - Publishes the Terraform plan as a build artifact and applies it using `terraform apply` in a separate stage..

- **Shared Layer Pipeline (`azure-pipelines-shared.yml`)**: Manages environment-specific resources. The pipeline includes:
    - Installs dependencies (unzip, Terraform, and kubelogin for AKS authentication).
    - Initializes Terraform in the shared layer directory.
    - Selects the appropriate Terraform workspace based on the environment (dev, prod, etc.).
    - Runs `terraform plan` with environment-specific variables and publishes the plan as an artifact.
    - Requires approval from designated reviewers before executing `terraform apply` to ensure quality gates and prevent unauthorized changes.
    - Downloads the plan artifact and applies it using `terraform apply` in a separate stage.

Each pipeline is designed to automate the provisioning and management of infrastructure, ensuring consistency and repeatability across environments.


# ArgoCD - GitOps
ArgoCD is installed as a cluster extension using Terraform. After installation, an ArgoCD Application is configured to bootstrap the minimum required applications for a production-ready Kubernetes cluster. These applications include:

- **cert-manager**: For managing TLS certificates within the cluster.
- **envoy-gateway**: For ingress and API gateway functionality.
- **prometheus-stack**: For monitoring and observability.

Only the ArgoCD Application files are stored in this Terraform repository. The ArgoCD bootstrap Application is configured to point to this folder and automatically install all defined applications. To install additional applications, simply add a new Application file to this folder, and it will be picked up and deployed by ArgoCD.

