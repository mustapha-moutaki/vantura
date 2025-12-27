This documentation is designed to help frontend developers understand the API requirements and the structure of the data returned by the backend.

---

# 📑 API Documentation for Frontend

## 1. Authentication & Users

### **Login Request (`LoginDtoRequest`)**
Used for authenticating a user.
| Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `username` | String | **Yes** | User's identifier/email. |
| `password` | String | **Yes** | User's password. |

### **User Registration Request (`UserDtoRequest`)**
Used to create a new user account.
| Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `firstName` | String | **Yes** | Cannot be blank. |
| `lastName` | String | **Yes** | Cannot be blank. |
| `email` | String | **Yes** | Must be a valid email format. |
| `password` | String | **Yes** | Min: 6, Max: 50 characters. |
| `role` | Enum | No | `USER`, `ADMIN`, etc. |

### **User Response (`UserDtoResponse`)**
Data returned when fetching user details.
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Long | Unique ID of the user. |
| `firstName` | String | User's first name. |
| `lastName` | String | User's last name. |
| `email` | String | User's email address. |
| `role` | Enum | Assigned role. |
| `forumsIds` | List<Long> | IDs of forums the user is associated with. |
| `blogsIds` | List<Long> | IDs of blogs created by the user. |

---

## 2. Forums

### **Forum Request (`ForumDtoRequest`)**
Used to create or update a forum.
| Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `title` | String | **Yes** | Cannot be blank. |
| `description` | String | No | Large text field for details. |
| `userId` | Long | No | ID of the creator. |
| `userIds` | List<Long> | No | List of member IDs. |
| `blogsIds` | List<Long> | No | List of blog IDs belonging to this forum. |

### **Forum Response (`ForumDtoResponse`)**
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Long | Unique ID of the forum. |
| `title` | String | Title of the forum. |
| `description` | String | Detailed description. |
| `userIds` | List<Long> | List of IDs of users in the forum. |
| `blogsIds` | List<Long> | List of IDs of blogs in the forum. |

---

## 3. Categories

### **Category Request (`CategoryDtoRequest`)**
| Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `name` | String | **Yes** | Cannot be blank (e.g., "Technology"). |
| `description` | String | No | Optional description of the category. |

### **Category Response (`CategoryDtoResponse`)**
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Long | Unique ID of the category. |
| `name` | String | Category name. |
| `description` | String | Category description. |
| `blogCount` | Integer | Total number of blogs under this category. |

---

## 4. Blog Posts

### **Blog Request (`BlogDtoRequest`)**
Used to create a new blog post.
| Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `title` | String | **Yes** | Title of the post. |
| `content` | String | **Yes** | Main body of the blog. |
| `userId` | Long | **Yes** | The ID of the user writing the blog. |
| `forumId` | Long | **Yes** | The ID of the forum it belongs to. |
| `categoryId` | Long | **Yes** | The ID of the category. |
| `comments` | List | No | Usually handled automatically by the server. |

### **Blog Response (`BlogDtoResponse`)**
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Long | Unique ID of the blog. |
| `title` | String | Blog title. |
| `content` | String | Full content. |
| `authorName` | String | Formatted name of the creator. |
| `categoryName` | String | Name of the assigned category. |
| `forumTitle` | String | Title of the associated forum. |
| `createdAt` | DateTime | Timestamp of creation. |
| `updatedAt` | DateTime | Timestamp of last update. |

---

## 5. Comments

### **Comment Request (`CommentDtoRequest`)**
| Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `content` | String | **Yes** | Max 2000 characters. |
| `userId` | Long | **Yes** | ID of the user commenting. |
| `blogId` | Long | **Yes** | ID of the blog being commented on. |

### **Comment Response (`CommentDtoResponse`)**
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Long | Unique ID of the comment. |
| `content` | String | The comment text. |
| `userId` | Long | ID of the author. |
| `blogId` | Long | ID of the post. |
| `authorName` | String | Name of the person who wrote the comment. |
| `createdAt` | DateTime | When the comment was posted. |
| `updatedAt` | DateTime | Last edit timestamp. |

---

### **General Rules for Frontend:**
1. **Date Formats:** All timestamps (`createdAt`, `updatedAt`) are returned in ISO 8601 format (e.g., `2023-10-27T10:00:00`).
2. **Error Handling:** If a **Required** field is missing or the `@Size` constraint is violated, the server will return a `400 Bad Request` with the specific message defined in the DTO (e.g., *"the title is required"*).
3. **Empty Lists:** For response fields like `blogsIds` or `userIds`, an empty array `[]` will be returned if no data exists.