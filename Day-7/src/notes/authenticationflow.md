# 🔐 Authentication System Flow

A secure system typically follows these 4 key steps:

---

## 1. ✅ Validation  
**Goal:** Ensure the data format is correct (e.g., email is valid, password is not empty).

**Example:**
- Check if `email` is in proper format.
- Check if `password` is at least 6 characters.

---

## 2. 🔍 Verification  
**Goal:** Check if the data matches existing records (e.g., user exists in DB).

**Example:**
- Find user in DB by email.
- Compare entered password with hashed password.

---

## 3. 👤 Authentication  
**Goal:** Identify **which user** sent the request (using token, session, or cookie).

**Example:**
- Read JWT token or session cookie.
- Decode token and attach user to request.

---

## 4. 🔒 Authorization  
**Goal:** Check if the user has permission to access the resource.

**Example:**
- Only "admin" can access `/admin-panel`.
- A user can update **only** their own posts.

---

## 🎯 Summary Table

| Step            | Purpose                                | Checks                        |
|-----------------|-----------------------------------------|-------------------------------|
| **Validation**   | Format is correct                      | Syntax, required fields       |
| **Verification** | Data matches in DB                     | Email exists, password match |
| **Authentication** | Who is making the request             | Token, session ID             |
| **Authorization** | Is the user allowed to access resource | Role, ownership               |
