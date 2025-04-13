
<!--
 ProtectedRoute.jsx -> redirects user with no login token to "/"
Login.jsx   -> handleSubmit() : for route protection , animation and connection with backend 
App.jsx     -> ProtectedRoute
Header.jsx  -> handleLogout() 

-->

<!--
    db.meetings.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 30*24*60*60 })
    incase if we get conflict error:
    db.meetings.dropIndex("createdAt_1")
-->

