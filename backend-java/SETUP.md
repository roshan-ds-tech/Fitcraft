# Setup Instructions for Fitcraft Java Backend

## Prerequisites
- Java 17 or higher (✅ You have Java 25 installed)
- Maven (we'll use Maven Wrapper, so no need to install Maven separately)

## Step 1: Fix pom.xml
There's a typo in `pom.xml` on line 18. Please change:
```xml
<n>Fitcraft Backend</n>
```
to:
```xml
<name>Fitcraft Backend</name>
```

## Step 2: Set JAVA_HOME Environment Variable

You need to set the JAVA_HOME environment variable. Here's how:

### Option A: Using PowerShell (Temporary - for current session)
```powershell
# Find Java installation
$javaPath = (Get-Command java).Source
# Navigate to JAVA_HOME (usually 2 levels up from java.exe)
$javaHome = (Get-Item (Split-Path (Split-Path $javaPath))).Parent.Parent.FullName
# Set for current session
$env:JAVA_HOME = $javaHome
```

### Option B: Set Permanently (Recommended)
1. Open PowerShell as Administrator
2. Run:
```powershell
# Find Java installation
$javaPath = (Get-Command java).Source
$javaHome = (Get-Item (Split-Path (Split-Path $javaPath))).Parent.Parent.FullName

# Set JAVA_HOME permanently for current user
[Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "User")

# Verify
Write-Host "JAVA_HOME set to: $javaHome"
```

3. **Close and reopen your terminal** for the change to take effect.

### Option C: Manual Setup
1. Find your Java installation folder (usually `C:\Program Files\Java\jdk-XX` or similar)
2. Right-click "This PC" → Properties → Advanced System Settings → Environment Variables
3. Under "User variables", click "New"
4. Variable name: `JAVA_HOME`
5. Variable value: Path to your Java installation (e.g., `C:\Program Files\Java\jdk-25`)
6. Click OK and restart your terminal

## Step 3: Run the Application

Once JAVA_HOME is set, navigate to the backend directory and run:

```powershell
cd Fitcraft\backend-java
.\mvnw.cmd spring-boot:run
```

The Maven Wrapper (`mvnw.cmd`) will automatically download Maven if needed on first run.

## Troubleshooting

### If you get "JAVA_HOME not found":
- Make sure JAVA_HOME is set (see Step 2)
- Restart your terminal after setting JAVA_HOME
- Verify with: `echo $env:JAVA_HOME` (PowerShell) or `echo %JAVA_HOME%` (CMD)

### If you get "mvnw.cmd not found":
- Make sure you're in the `Fitcraft\backend-java` directory
- The Maven Wrapper will download automatically on first use

### If the application doesn't start:
- Check that port 8000 is not already in use
- Make sure Java 17+ is installed: `java -version`

## API Endpoints

Once running, the API will be available at:
- Base URL: `http://localhost:8000`
- Signup: `POST http://localhost:8000/api/auth/signup`
- Login: `POST http://localhost:8000/api/auth/login`
- Session: `GET http://localhost:8000/api/auth/session`
- Profile: `GET http://localhost:8000/api/auth/profile`

