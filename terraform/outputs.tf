output "vm_public_ip" {
  description = "IP pública de la máquina virtual"
  value       = azurerm_public_ip.vm_ip.ip_address
}

output "resource_group_name" {
  value = data.azurerm_resource_group.rg.name
}

output "vm_name" {
  value = azurerm_linux_virtual_machine.vm.name
}
