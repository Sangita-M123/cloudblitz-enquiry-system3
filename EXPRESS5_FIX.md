# Express 5 Compatibility Fix

## Issue

When using Express 5.x with the wildcard route `app.get("*", ...)`, you may encounter this error:

```
TypeError: Missing parameter name at index 1: *
visit https://git.new/pathToRegexpError for info
```

This is due to changes in Express 5's path-to-regexp dependency.

## Solution

Instead of using a route with wildcard:
```typescript
// ❌ This causes error in Express 5
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
```

Use middleware instead:
```typescript
// ✅ This works in Express 5
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
```

## What Changed

The fix in `backend/src/server.ts`:

```typescript
// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  // Handle React routing using middleware instead of route
  app.use((_req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
```

## Why This Works

- **Middleware** (`app.use()`) doesn't use path-to-regexp for pattern matching
- It acts as a catch-all for any request that reaches it
- Since it's placed after API routes and static file serving, it only catches unmatched routes
- This is exactly what we need for React Router's client-side routing

## Testing

After the fix, both work correctly:

1. **API Endpoints**: `http://localhost:5000/api/health` ✅
2. **Frontend**: `http://localhost:5000/` ✅
3. **React Routes**: `http://localhost:5000/login`, `/dashboard`, etc. ✅

## Status

✅ **Fixed and tested** - Server runs without errors and serves both API and frontend correctly.
