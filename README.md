# Chef's Menu Manager

## Project Overview
Chef's Menu Manager is a mobile application developed using React Native and Expo. The application allows users to manage a restaurant menu by adding, viewing, searching, filtering, editing and deleting menu items.

## Part 2 Original Application
The application consists of a home screen with two buttons:

- View Menu items
- Add menu Items

### 1. Home Screen
The home screen displays two buttons that allows users to choose whether they want to view existing menu items or add new ones.

### 2. View Menu Items
When the user clicks on the view Menu Items button, they are redirected to a screen where their menu items will be diplayed.
Initially, the screen displays no menu items because the had not added any didshes yet.

### 3. Add menu Items
When the user clicks the Add Menu Items button, they are redirected to a screen containing input fields for entering menu item information.

The screen includes three buttons:
- Cancel: Redirects the user back to the home screen without adding an item.
- Add Item: Adds the entered menu to the View Menu Items screem.
- Done: Initially displayed errors when clicked. This functionality was later corrected and improved in Part 3.

## Part 3 Improvements and Additional Features
Part 3 focuses on improving the original application buy introducing additional functionality, improving the existing features and enhancing the overall user experience.

### 1. Improved Navigation and Button Functionality
- Improved navigation between the different screens.
- Corrected the Done button functionality.
- Changed the Done button to redirect users to the View Menu Items screen instead of displaying errors.
- Improved navigation between the menu list, menu details, add item and edit item screens.

### 2 Improved Form Validation
- Added validation to prevent users from from submitting empty dish names.
- Added validation for empty descriptions.
- Added validation to ensure that a course is selected.
- Added price validation to ensure that the entered price is a valid positive number.
- Added error messages to guide users when information is missing or incorrect.
- Added success feedback when a menu item is added successfully.

### 3 Menu Item Details
- introduced a seperate Menu Details screen
- Allowed users to select a menu item from the menu list.
- Displayed the selected dish's name, description, course and price.
- Added checks to prevent invalid menu item selections.

### 4. Edit menu Items
- Added functionality to edit existing menu items.
- Automatically populated the edit form with the selected item's existing information.
- Allowed users to update the dish name, description, course and price.
- Updated the menu list with the edited information.

### 5. Delete Menu Items
- Added functionality to delete existing menu items.
- Introduced a confirmation message before deleting an item.
- Updated the menu list automatically after an item was deleted.

### 6. Search and Filter Functionality
- Added a search field to search for menu items using their dish names.
- Introduced course filtering.
- Allowed users to filter menu items by Started, Main Course and Dessert.
- Added an All Course option to display all menu items.
- Combined search and filtering functionality.
- Added feedback when no matching menu items are found.

### 7. Menu Statistics
Introduced a menu statistics section that displays:
- Total number of menu items.
- Total value of all items.
- Avergae price of menu items.
- Number of items in each course category.

The statistics updates automatically when menu items are added, edited or deleted.

### 8. Improved user interface and design
- Redesigned the application using a dark-themed interface.
- Introduced orange as the main accent colour.
- Improved text colours for better readability.
- Updated input fields and placeholder text colours.
- Improved menu item cards with borders, rounded corners and spacing.
- Adjusted font sizes and text spacing.
- Improved the overall appearance and consistency of the application.

### 9 Code Quality and Organiazation 
- Improved variable and function names to make the code easier to understand.
- Used React Native's useState hook to manage application data and screen navigation.
- Used FlatList to display menu items.
- Created reusable functions for operations such as adding, editing, deleting and selecting menu items.
- Improved code readability and organisation.
- Added checks to handle invalid menu item selections.
- Improved user feedback through alerts and validation messages.

### Technologies Used
- React Native
- Expo
- TypeScript / TSX
- React Hooks (useState)
- Visual Studio Code
- Git and GitHub

## How to Run the Application
### Requirements
- Node.js
- npm
- Expo Go
- Visual Studio Code

### Installation and SetUp
1. Clone or download the project repository.
2. Open the project folder in Visual Studio Code.
3. Open the intergrated terminal.
4. Install the project dependencies.
   
   _npm install_
5. Start the Expo development server.

   _npx expo start_
6. Press _a_ to open the application in an Android emulator, or scan the QR code using you phone camera andd open expo go using you phone.

# References
React Native, 2026. _Core Components and APIs_ . [online] Available at: <https://reactnative.dev/docs/components-and-apis> [Accessed on: 05 November 2026].
React Native, 2026. _React Fundamentals_ . [online] Available at: <https://reactnative.dev/docs/intro-react> [Accessed on: 05 November 2026].
React Native, 2026. _Using List Views_ . [online] Available at: <https://reactnative.dev/docs/using-a-listview> [Accessed on: 05 November 2026].
React Native, 2026. _Alert_ . [online] Available at<https://reactnative.dev/docs/alert> [Accessed on: 05 November 2026].
React, [n.d.]. _Quick Start_ . [online] Availale: <https://react.dev/learn> [Accessed on: 05 November 2026].
Expo, [n.d.]. _Start Developing_ . [online] Available at: <https://docs.expo.dev/get-started/start-developing/> [Accessed on: 05 November 2026].





