variable "location" {
  description = "Ubicación donde se desplegarán los recursos"
  default     = "canadacentral"
}

variable "vnet_name" {
  description = "Nombre de la red virtual"
  default     = "vnet-techstore"
}

variable "subnet_name" {
  description = "Nombre de la subred"
  default     = "subnet-techstore"
}