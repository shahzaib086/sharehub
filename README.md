# ShareHub

ShareHub is a community-focused app that allows users to share food items or other unused products with others who may find them useful. The platform aims to reduce waste, promote sustainability, and bring communities together by encouraging the sharing of resources.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Group Members](#group-members)

## Project Overview

In today's world, a lot of resources, especially food, go to waste while others are in need. ShareHub was created to bridge this gap by enabling people to post items they no longer need and share them with those who could benefit. This project supports sustainable living by giving a second life to otherwise discarded items.

## Features

- **User Registration and Authentication**: Secure login and registration to ensure a trusted community of users.
- **Item Posting**: Users can post items, such as food, books, clothes, and more, for others to see.
- **Categories and Filtering**: Items can be categorized and easily searched or filtered by type, making it convenient for users to find what they need.
- **Favourites**: Users can add categories to their favourites and when there is any new item posted in that category user will be notified by push notifications.
- **Notifications**: Notifications alert users when new items are posted in their area of interest.

## Group Members
- Shahzaib Ahmed SIDDIQUI
- Haleema USHAQ
- Syed Bilal Rashid
- Nour Zbitou
- Muhammad Nasir

## Open the `swagger/openapi.yaml` file in any Swagger editor:
## [Swagger Editor](https://editor.swagger.io/)

# ShareHub API Documentation

# ShareHub API Documentation

## 1. User Registration and Management (`/users`)

### **POST /users**
- **Purpose**: Registers a new user on the platform.
- **Request Body**: 
  - `name`: The name of the user. (Example: `"johndoe"`)
  - `password`: The user's password. (Example: `"password123"`)
  - `email`: The user's email address. (Example: `"johndoe@example.com"`)
  - `lat`: The user's latitude location. (Example: `"44.4268° N"`)
  - `lng`: The user's longitude location. (Example: `"26.1025° E"`)
- **Response**: 
  - **201 Created**: User registered successfully.

### **GET /users**
- **Purpose**: Fetches a list of all registered users in the system.
- **Response**: 
  - **200 OK**: A list of all users.

---

## 2. User's Favorite Categories (`/favorite`)

### **GET /favorite**
- **Purpose**: Retrieves a list of categories that the authenticated user has marked as favorites.
- **Response**: 
  - **200 OK**: A list of favorite categories for the specified user.

### **POST /favorite/create**
- **Purpose**: Adds a new category to the user's list of favorites.
- **Request Body**: 
  - `user_id`: The ID of the user adding the category. (Example: `"12345"`)
  - `user_name`: The name of the user adding the category. (Example: `"johndoe"`)
  - `category_id`: The unique ID of the category being added. (Example: `"abc123"`)
  - `category_name`: The name of the category being added. (Example: `"Electronics"`)
  - `created_at`: Timestamp of when the category was added. (Example: `"2025-01-14T10:30:00Z"`)
- **Response**: 
  - **201 Created**: Favorite category added successfully.

---

## 3. Items Management (`/items`)

### **GET /items**
- **Purpose**: Retrieves a list of all items available on the platform with optional filters and pagination.
- **Query Params**:
  - `page`: The page number to fetch (defaults to 1 if not provided).
  - `limit`: The number of items to return per page (defaults to 10 if not provided).
  - `category_id`: The category ID to filter items by. (Example: `"Food"`)
  - `keyword`: A keyword to search for in item names, descriptions, or other fields. (Example: `"bread"`)
- **Response**: 
  - **200 OK**: A list of items matching the filters.

### **POST /items/create**
- **Purpose**: Adds a new item to the platform for sharing.
- **Request Body**: 
  - `title`: The name of the item. (Example: `"Fresh Bread"`)
  - `price`: The price of the item. (Example: `"12 $"`)
  - `pickup_address`: The address for item pickup. (Example: `"Bulevardul Iuliu Maniu 1-3"`)
  - `Description`: A description of the item. (Example: `"100 grams packet"`)
  - `expiry_date`: The expiry date of the item. (Example: `"18-01-2025"`)
  - `category_id`: The category of the item. (Example: `"Food"`)
- **Response**: 
  - **201 Created**: Item added successfully.

---

## 4. Item Details (`/items/{id}`)

### **GET /items/{id}**
- **Purpose**: Retrieves detailed information about a specific item.
- **Path Parameter**: 
  - `id`: The unique identifier of the item.
- **Response**: 
  - **200 OK**: Details of the requested item.

### **PUT /items/{id}**
- **Purpose**: Updates the details of a specific item.
- **Path Parameter**: 
  - `id`: The unique identifier of the item.
- **Request Body**: 
  - `title`: Updated name of the item. (Example: `"Fresh Bread"`)
  - `price`: Updated price of the item. (Example: `"10 $"`)
  - `pickup_address`: Updated address for item pickup. (Example: `"Bulevardul Iuliu Maniu 1-3"`)
  - `Description`: Updated description of the item. (Example: `"A loaf of fresh bread available for pickup."`)
  - `expiry_date`: Updated expiry date of the item. (Example: `"18-01-2025"`)
  - `category_id`: Updated category of the item. (Example: `"Food"`)
- **Response**: 
  - **200 OK**: Item updated successfully.

### **DELETE /items/{id}**
- **Purpose**: Deletes a specific item.
- **Path Parameter**: 
  - `id`: The unique identifier of the item.
- **Response**: 
  - **200 OK**: Item deleted successfully.

---

This README contains the API documentation for ShareHub, providing details on user registration, favorites, items management, and item details endpoints. For more information or updates, feel free to reach out!


