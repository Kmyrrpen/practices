# Example MERN app

This was made following this [tutorial](https://www.youtube.com/watch?v=-0exw-9YJBo&t=4s&ab_channel=TraversyMedia) by Brad Traversy.

## Summary
The Backend is built with Express which wraps around a MongoDB Database made with MongoDB Atlas. The frontend is bootstrapped with `npm create vite` and uses React w/ typescript. Authentication was done using JWToken, and validating users by sending Bearer Tokens for each request to a protected route.