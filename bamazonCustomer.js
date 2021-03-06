var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'root',
    database: 'Bamazon'
});

function promptUserPurchase() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            filter: Number
        }
    ]).then(function (input) {


        var item = input.item_id;
        var quantity = input.quantity;

        // Query db to confirm that the given item ID 
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;


            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                var productData = data[0];


                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('The product you requested is in stock! Placing order!');

                    // Construct the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                           
                    // Update the inventory
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;
                        console.log(data);

                        console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        connection.end();
                    })
                } else {
                    console.log('Sorry, there is not enough product in stock.');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
}

function displayInventory() {

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  ///  ';
			strOut += 'Product Name: ' + data[i].product_name + '  ///  ';
			strOut += 'Department: ' + data[i].department_name + '  ///  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	promptUserPurchase();
	})
}


function runBamazon() {
	// console.log('___ENTER runBamazon___');

	// Display the available inventory
	 displayInventory();
}

// Run the application logic
runBamazon();