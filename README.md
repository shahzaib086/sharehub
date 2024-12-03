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

- Open the `swagger/openapi.yaml` file in any Swagger editor:
- [Swagger Editor](https://editor.swagger.io/)

## RESTFUL Resources
1. Authentication and User Management

- POST /register
Register a new user with required details (e.g., name, email, password).
Request Body: name, email, password
Response: Status code 201 if successful, with user ID and token.

- POST /login
Authenticate a user and return a JWT token for authorized access.
Request Body: email, password
Response: Status code 200 with JWT token for session management.

- POST /logout
End the user session and invalidate the token.
Response: Status code 200 if successful.

2. Users

- GET /users/{userId}
Retrieve a specific user’s profile information.
Parameters: userId (path)
Response: Status code 200 with user data (e.g., name, email, joinDate, location).

- PUT /users/{userId}
Update the profile information of a user (must be authenticated).
Parameters: userId (path)
Request Body: Optional fields such as name, email, location, preferences
Response: Status code 200 with updated user data.

3. Items

- POST /items
Create a new item listing.
Request Body: title, description, category, location, expiryDate, imageUrl (optional)
Response: Status code 201 with newly created item ID and item details.

- GET /items
Retrieve a list of items based on optional filters.
Query Parameters: category, location, radius, dateRange
Response: Status code 200 with a list of items matching filters.

- GET /items/{itemId}
Retrieve detailed information about a specific item.
Parameters: itemId (path)
Response: Status code 200 with item details.

- PUT /items/{itemId}
Update an item (restricted to the item owner).
Parameters: itemId (path)
Request Body: Fields to update, such as title, description, category, location, expiryDate
Response: Status code 200 with updated item details.

- DELETE /items/{itemId}
Delete an item (restricted to the item owner).
Parameters: itemId (path)
Response: Status code 204 if successful.

4. Categories

- GET /categories
Retrieve a list of all available item categories.
Response: Status code 200 with categories such as Food, Books, Clothes, etc.

- POST /categories
Add a new category (admin-only action).
Request Body: name, description
Response: Status code 201 with category ID and details.

- DELETE /categories/{categoryId}
Delete a category (admin-only action).
Parameters: categoryId (path)
Response: Status code 204 if successful.

5. Notifications

- GET /notifications
Retrieve all notifications for the authenticated user.
Response: Status code 200 with a list of notifications (e.g., new item postings near the user).

- DELETE /notifications/{notificationId}
Delete a specific notification.
Parameters: notificationId (path)
Response: Status code 204 if successful.


