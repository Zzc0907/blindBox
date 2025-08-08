@echo off
set JAR_FILE=target\backend-1.0-SNAPSHOT.jar

if not exist %JAR_FILE% (
    echo ❌ 找不到 JAR 文件，请先运行 mvn clean package
    exit /b
)

echo 🔍 检查 JAR 包中是否包含 index.html...
jar tf %JAR_FILE% | find "static/index.html" >nul
if %errorlevel%==0 (
    echo ✅ index.html 存在，可以正常启动
) else (
    echo ❌ index.html 不存在，请确认 dist/ 内容复制到了 src/main/resources/static/
)
pause
