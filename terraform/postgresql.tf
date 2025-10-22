# ============================================
# Archivo: postgresql.tf (versión flexible corregida)
# ============================================

resource "azurerm_postgresql_flexible_server" "db" {
  name                   = "techstore-db"
  resource_group_name    = data.azurerm_resource_group.rg.name
  location               = var.location
  version                = "16"
  administrator_login    = "postgres"
  administrator_password = "Santy10-tc1913"
  storage_mb             = 32768
  sku_name               = "B_Standard_B1ms"
  backup_retention_days  = 7
  zone                   = "1"

  # ✅ Ya no existe el bloque "network"
  # Usa este parámetro directo para permitir acceso público
  public_network_access_enabled = true

  authentication {
    password_auth_enabled = true
  }

  tags = {
    Environment = "TechStore"
  }
}

# ✅ Nombre de recurso corregido
# (antes era "azurerm_postgresql_flexible_database" y eso causaba error)
resource "azurerm_postgresql_flexible_server_database" "db_app" {
  name      = "techstore"
  server_id = azurerm_postgresql_flexible_server.db.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}

# ✅ Firewall: configuración correcta para permitir acceso global
resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_all" {
  name             = "allow_all"
  server_id        = azurerm_postgresql_flexible_server.db.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "255.255.255.255"
}
