// Problem: Order by the Kiosk 

// User database and inventory
const users = [
    { username: 'mori', password: '3344' }, // User 1 credentials
    { username: 'mark', password: '3344' }  // User 2 credentials
];

// Inventory containing categories, each array is empty until the user adds an item
const inventory = {
    Dairy: [],
    Grains: [],
    "Fruits & Vegetables": []
};

// Cart to hold items that the customer adds
const cart = []; 

// Function for user authentication for SELLER
function authenticate(username, password) { // Check if user input matches a username and password in the users array
    return users.some(user => user.username === username && user.password === password);
}

// Function to display inventory
function displayInventory() {
    console.log("\nCurrent Inventory:");
    for (const category in inventory) { // Loop through each category in the inventory
        console.log(`\n${category}:`);
        if (inventory[category].length > 0) { // Check if there are items in the category
            inventory[category].forEach(item => console.log(`- ${item.name}: $${item.price}`)); // Display item name and price
        } else {
            console.log("No items available."); // Notify if the category is empty
        }
    }
}

// Function to sort the cart using bubble sort
function sortCart(cart) { 
    for (let i = 0; i < cart.length - 1; i++) { // Outer loop to ensure all elements are sorted
        for (let j = 0; j < cart.length - i - 1; j++) { // Inner loop for comparing adjacent elements
            if (cart[j].name > cart[j + 1].name) { // Compare item names for alphabetical order
                [cart[j], cart[j + 1]] = [cart[j + 1], cart[j]]; // Swap if out of order
            }
        }
    }
    return cart;
}

// Function to handle seller actions
function sellerActions() {
    const username = prompt("Enter username: "); // Prompt for seller username
    const password = prompt("Enter password: "); // Prompt for seller password

    if (!authenticate(username, password)) { // Check if credentials are valid
        console.log("Invalid credentials!");
        return;
    }

    console.log("Welcome, Seller!");
    while (true) { // Loop for seller actions
        const action = prompt("Choose an action (ADD, REMOVE, LOGOUT): ").toUpperCase();
        if (action === "LOGOUT") { // Exit seller mode
            console.log("Logged out successfully.");
            break;
        }

        const category = prompt("Enter category (Dairy, Grains, Fruits & Vegetables): "); // Prompt for category
        if (!inventory[category]) { // Check if category exists
            console.log("Invalid category.");
            continue;
        }

        if (action === "ADD") { // Adding items to inventory
            while (true) {
                const name = prompt("Enter item name: "); // Prompt for item name
                const price = parseFloat(prompt("Enter item price: ")); // Prompt for item price
                inventory[category].push({ name, price }); // Add item to the selected category
                console.log(`${name} added to ${category}.`);

                const cont = prompt("Continue adding? (yes/no): ").toLowerCase(); // Check if seller wants to continue
                if (cont !== "yes") break;
            }
        } else if (action === "REMOVE") { // Removing items from inventory
            while (true) {
                const name = prompt("Enter item name to remove: "); // Prompt for item name to remove
                const index = inventory[category].findIndex(item => item.name === name); // Find item in category
                if (index !== -1) {
                    inventory[category].splice(index, 1); // Remove item from category
                    console.log(`${name} removed from ${category}.`);
                } else {
                    console.log("Item not found.");
                }

                const cont = prompt("Continue removing? (yes/no): ").toLowerCase(); // Check if seller wants to continue
                if (cont !== "yes") break;
            }
        } else {
            console.log("Invalid action."); // Handle invalid actions
        }
    }
}

// Function to handle customer actions
function customerActions() {
    console.log("Welcome, Customer!");
    while (true) {
        const action = prompt("Choose an action (ORDER, CART, CANCEL): ").toUpperCase(); // Prompt for customer action
        if (action === "CANCEL") { // Exit customer mode
            console.log("Exiting customer menu.");
            break;
        }

        if (action === "ORDER") { // Ordering items
            const category = prompt("Enter category (Dairy, Grains, Fruits & Vegetables): "); // Prompt for category
            if (!inventory[category] || inventory[category].length === 0) { // Check if category exists and has items
                console.log("Invalid category or no items available.");
                continue;
            }

            console.log(`\nAvailable ${category}:`);
            inventory[category].forEach(item => console.log(`- ${item.name}: $${item.price}`)); // Display items in category

            const name = prompt("Enter item name: "); // Prompt for item name
            const item = inventory[category].find(i => i.name === name); // Find item in category
            if (!item) {
                console.log("Item not found.");
                continue;
            }

            const quantity = parseInt(prompt("Enter quantity: "), 10); // Prompt for item quantity
            cart.push({ ...item, quantity }); // Add item and quantity to cart
            console.log(`${quantity} x ${item.name} added to cart.`);
        } else if (action === "CART") { // Viewing and managing cart
            while (true) {
                console.log("\nCurrent Cart:");
                sortCart(cart).forEach(item => console.log(`- ${item.name}: $${item.price} x ${item.quantity} = $${item.price * item.quantity}`)); // Display sorted cart

                const cartAction = prompt("Choose action (PRINT, ADD, REMOVE, CANCEL): ").toUpperCase(); // Prompt for cart action
                if (cartAction === "CANCEL") { // Exit cart management
                    break;
                } else if (cartAction === "PRINT") { // Print cart summary
                    let total = 0;
                    console.log("\nCart Items:");
                    sortCart(cart).forEach(item => {
                        const itemTotal = item.price * item.quantity; // Calculate item total
                        total += itemTotal; // Accumulate total cost
                        console.log(`- ${item.name}: $${item.price} x ${item.quantity} = $${itemTotal}`); // Display item details
                    });
                    console.log(`Total: $${total}`); // Display total cost
                } else if (cartAction === "REMOVE") { // Remove items from cart
                    const name = prompt("Enter item name to remove: "); // Prompt for item name to remove
                    const index = cart.findIndex(item => item.name === name); // Find item in cart
                    if (index !== -1) {
                        cart.splice(index, 1); // Remove item from cart
                        console.log(`${name} removed from cart.`);
                    } else {
                        console.log("Item not found in cart.");
                    }
                } else if (cartAction === "ADD") { // Return to order menu
                    break;
                } else {
                    console.log("Invalid action."); // Handle invalid cart actions
                }
            }
        } else {
            console.log("Invalid action."); // Handle invalid customer actions
        }
    }
}

// Main function to start the program
function main() {
    while (true) {
        const userType = prompt("Are you a SELLER or CUSTOMER? (Type EXIT to quit): ").toUpperCase(); // Prompt for user type
        if (userType === "EXIT") { // Exit the program
            console.log("Exiting program. Thank you for shopping with us!");
            break;
        } else if (userType === "SELLER") { // Enter seller mode
            sellerActions();
        } else if (userType === "CUSTOMER") { // Enter customer mode
            customerActions();
        } else {
            console.log("Invalid choice. Please select SELLER or CUSTOMER."); // Handle invalid user type
        }
    }
}

// Start the program
main();
