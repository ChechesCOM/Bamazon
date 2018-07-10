DROP DATABASE IF EXISTS Bamazon;
CREATE database Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	("Shrek 2", "Movies", 5.00, 200),
		("Water Shoes", "Sports", 4.99, 500),
        ("The Hobbit", "Books", 9.99, 400),
        ("Play Station 4", "Video Games", 699.99, 1000),
        ("Football Ball", "Sports", 7.99, 1000),
        ("Iphone 6", "Electronics", 300, 1000),
        ("Shrek", "Movies", 4.99, 200),
        ("Resident Evil 7", "Video Games", 29.99, 1000),
        ("The Bible", "Books", 6.66, 666),
        ("Bicicle Helmet", "Sports", 15.99, 1000),
        ("Toaster", "Electronics", 14.99, 1000);