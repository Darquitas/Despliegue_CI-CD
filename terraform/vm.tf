# ==========================
# Archivo: vm.tf
# ==========================

# Recurso de IP pública
resource "azurerm_public_ip" "vm_ip" {
  name                = "vm-techstore-ip"
  location            = "canadacentral"
  resource_group_name = data.azurerm_resource_group.rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# Network Security Group para permitir SSH
resource "azurerm_network_security_group" "vm_nsg" {
  name                = "vm-techstore-nsg"
  location            = var.location
  resource_group_name = data.azurerm_resource_group.rg.name

  security_rule {
    name                       = "Allow-SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# Interfaz de red (NIC)
resource "azurerm_network_interface" "vm_nic" {
  name                = "vm-techstore-nic"
  location            = var.location
  resource_group_name = data.azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.vm_ip.id
  }
}

# Asociación entre NIC y NSG
resource "azurerm_network_interface_security_group_association" "nsg_assoc" {
  network_interface_id      = azurerm_network_interface.vm_nic.id
  network_security_group_id = azurerm_network_security_group.vm_nsg.id
}

# Máquina virtual Linux
resource "azurerm_linux_virtual_machine" "vm" {
  name                  = "vm-techstore"
  location              = var.location
  resource_group_name   = data.azurerm_resource_group.rg.name
  network_interface_ids = [azurerm_network_interface.vm_nic.id]
  size                  = "Standard_B1s"

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }

  admin_username = "azureuser"

  admin_ssh_key {
    username   = "azureuser"
    public_key = file("C:/Users/santi/.ssh/id_rsa.pub") # <-- ruta corregida
  }

  computer_name                   = "techstorevm"
  disable_password_authentication = true
  provision_vm_agent              = true

  tags = {
    Environment = "TechStore"
  }
}
