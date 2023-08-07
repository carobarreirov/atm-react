# ATM React App 🏧

A modern, user-friendly ATM application built with React.

## Description

The **ATM React App** provides an intuitive interface for users to perform basic ATM operations such as deposits and withdrawals. Designed with a sleek and minimalistic approach, the application is responsive, ensuring a seamless experience across various devices.

## Features

- **Responsive Design**: Adapts smoothly to different screen sizes.
- **Validation**: Ensures that users can't deposit or withdraw negative amounts and checks for sufficient funds during withdrawals.
- **Instant Updates**: The account balance updates instantly after each transaction.

## How to Run

1. Clone the repository:
   ```bash
   git clone [Your Repository URL]
   ```

2. Navigate to the project directory:
   ```bash
   cd [Your Repository Name]
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm start
   ```

The application should open in your default browser at `http://localhost:3000/`.

## Code Explanation

The application is modular, with each feature encapsulated in its own component, promoting reusability and maintainability. Here's a brief overview:

- **App Component**: The main container that renders the header, the `Account` component, and the footer.
- **Account Component**: Contains the logic for ATM operations, handling deposits, withdrawals, and updating the account balance.
- **ATMDeposit Component**: Handles the UI for deposit and withdrawal operations.

For a more in-depth understanding, students are encouraged to dive into each component and explore the functionalities.
Step-by-step, read [here](README.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## About the Author

Carolina Barreiro is a passionate developer with a knack for teaching. With years of experience in the tech industry, Caro is dedicated to imparting knowledge to budding developers and tech enthusiasts.