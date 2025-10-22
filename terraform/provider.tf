terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.110.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "0c5d71d3-d7c4-4548-ac62-3999325b617b"
}
