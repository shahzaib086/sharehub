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

## 1. User Registration and Management (`/users`)

### **POST /users**
- **Purpose**: Registers a new user on the platform.
- **Request Body**: 
  - `username`: The name of the user. (Example: `"johndoe"`)
  - `password`: The user's password. (Example: `"password123"`)
  - `email`: The user's email address. (Example: `"johndoe@example.com"`)
- **Response**: 
  - **201 Created**: User registered successfully.

### **GET /users**
- **Purpose**: Fetches a list of all registered users in the system.
- **Response**: 
  - **200 OK**: A list of all users.

---

## 2. User's Favorite Categories (`/users/{id}/favorites`)

### **GET /users/{id}/favorites**
- **Purpose**: Retrieves a list of categories that a particular user has marked as favorites.
- **Path Parameter**: 
  - `id`: The unique identifier of the user.
- **Response**: 
  - **200 OK**: A list of favorite categories for the specified user.

### **POST /users/{id}/favorites**
- **Purpose**: Adds a new category to the user's list of favorites.
- **Path Parameter**: 
  - `id`: The unique identifier of the user.
- **Request Body**: 
  - `category`: The name of the category to add as a favorite. (Example: `"Food"`)
- **Response**: 
  - **201 Created**: Favorite category added successfully.

---

## 3. Items Management (`/items`)

### **GET /items**
- **Purpose**: Retrieves a list of all items available on the platform with optional filters.
- **Query Parameters**:
  - `keyword`: A search keyword to filter items by name or description. (Example: `"bread"`)
  - `category`: Filter by item category. (Example: `"Food"`)
  - `location`: Filter by location in latitude,longitude format. (Example: `"40.7128,-74.0060"`)
- **Response**: 
  - **200 OK**: A list of items matching the filters.

### **POST /items**
- **Purpose**: Adds a new item to the platform for sharing.
- **Request Body**: 
  - `name`: The name of the item. (Example: `"Fresh Bread"`)
  - `category`: The category of the item. (Example: `"Food"`)
  - `description`: A detailed description of the item. (Example: `"A loaf of fresh bread available for pickup."`)
  - `location`: The location of the item in latitude and longitude format. (Example: `{"lat": 40.7128, "lon": -74.0060}`)
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
  - `name`: Updated name of the item. (Example: `"Fresh Bread"`)
  - `category`: Updated category of the item. (Example: `"Food"`)
  - `description`: Updated description of the item. (Example: `"A loaf of fresh bread available for pickup."`)
- **Response**: 
  - **200 OK**: Item updated successfully.

### **DELETE /items/{id}**
- **Purpose**: Deletes a specific item.
- **Path Parameter**: 
  - `id`: The unique identifier of the item.
- **Response**: 
  - **200 OK**: Item deleted successfully.



