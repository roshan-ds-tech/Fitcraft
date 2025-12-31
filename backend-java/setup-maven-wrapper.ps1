# Maven Wrapper Setup Script
# This script downloads and sets up Maven Wrapper for the project

$ErrorActionPreference = "Stop"

Write-Host "Setting up Maven Wrapper..." -ForegroundColor Green

# Create .mvn/wrapper directory if it doesn't exist
$wrapperDir = ".mvn\wrapper"
if (-not (Test-Path $wrapperDir)) {
    New-Item -ItemType Directory -Path $wrapperDir -Force | Out-Null
}

# Download Maven Wrapper JAR
$wrapperJar = "$wrapperDir\maven-wrapper.jar"
$wrapperUrl = "https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

Write-Host "Downloading Maven Wrapper JAR..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $wrapperUrl -OutFile $wrapperJar -UseBasicParsing
    Write-Host "Maven Wrapper JAR downloaded successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error downloading Maven Wrapper: $_" -ForegroundColor Red
    Write-Host "Please download manually from: $wrapperUrl" -ForegroundColor Yellow
    exit 1
}

# Download Maven distribution (for wrapper)
$mavenVersion = "3.9.6"
$mavenUrl = "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/$mavenVersion/apache-maven-$mavenVersion-bin.zip"

Write-Host "Maven Wrapper setup complete!" -ForegroundColor Green
Write-Host "You can now use: .\mvnw.cmd spring-boot:run" -ForegroundColor Cyan

