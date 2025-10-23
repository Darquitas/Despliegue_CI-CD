-- Insertar usuarios
INSERT INTO users (username, email, password)
VALUES
('Santiago', 'santiago@example.com', '1234'),
('Laura', 'laura@example.com', 'abcd');

-- Insertar productos
INSERT INTO products (name, category, price, stock, description)
VALUES
('Laptop', 'Tecnología', 2500.00, 5, 'Laptop de alto rendimiento'),
('Teclado', 'Accesorios', 120.00, 20, 'Teclado mecánico RGB');

-- Insertar órdenes (referencia a usuarios y productos)
INSERT INTO orders (userId, products, total, status)
VALUES
(1, '[{"productId": 1, "quantity": 1}]', 2500.00, 'pagado'),
(2, '[{"productId": 2, "quantity": 2}]', 240.00, 'pendiente');

-- Visualizar datos
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;
