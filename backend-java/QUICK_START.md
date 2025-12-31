# Quick Start Guide

## ✅ You're Almost Ready!

Maven Wrapper is set up and working. Here's what to do:

## Step 1: Fix pom.xml (One-time fix)

Open `Fitcraft/backend-java/pom.xml` and on line 18, change:
```xml
<n>Fitcraft Backend</n>
```
to:
```xml
<name>Fitcraft Backend</name>
```

Or run this PowerShell command from the project root:
```powershell
$content = Get-Content "Fitcraft\backend-java\pom.xml" -Raw
$content = $content -replace '<n>Fitcraft Backend</n>', '<name>Fitcraft Backend</name>'
Set-Content "Fitcraft\backend-java\pom.xml" -Value $content
```

## Step 2: Set JAVA_HOME (One-time setup)

JAVA_HOME has been set for your user account. **Close and reopen your terminal** for it to take effect.

To verify, open a new terminal and run:
```powershell
echo $env:JAVA_HOME
```
It should show: `C:\Program Files\Java\jdk-25`

## Step 3: Run the Application

Open a **new terminal** (to get the updated JAVA_HOME) and run:

```powershell
cd Fitcraft\backend-java
$env:JAVA_HOME = "C:\Program Files\Java\jdk-25"  # Set for this session
.\mvnw.cmd spring-boot:run
```

The application will:
1. Download Maven automatically (first time only)
2. Download dependencies
3. Start the server on `http://localhost:8000`

## That's It! 🎉

Your Java backend is now running. The API endpoints are available at:
- Signup: `POST http://localhost:8000/api/auth/signup`
- Login: `POST http://localhost:8000/api/auth/login`
- Session: `GET http://localhost:8000/api/auth/session`
- Profile: `GET http://localhost:8000/api/auth/profile`

## Troubleshooting

**If you get "JAVA_HOME not found":**
- Make sure you opened a new terminal after setting JAVA_HOME
- Or set it for the current session: `$env:JAVA_HOME = "C:\Program Files\Java\jdk-25"`

**If pom.xml has errors:**
- Make sure you fixed the `<n>` tag to `<name>` on line 18

