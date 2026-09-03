import os
import sys
import subprocess
import urllib.request
import paramiko
from pathlib import Path

# Ensure UTF-8 output on Windows console
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

ROOT_DIR = Path(__file__).parent.parent
SCRIPTS_DIR = ROOT_DIR / "scripts"
DIST_DIR = ROOT_DIR / "dist"

print("==================================================")
print("[*] CHIFFREPRO FULL AUTOMATED BUILD & DEPLOY ENGINE")
print("==================================================")

# Step 1: Generate Sitemaps & LLMs.txt
print("\n[1/5] Generating SEO Sitemap, Robots.txt & LLMs.txt...")
res_sitemap = subprocess.run([sys.executable, str(SCRIPTS_DIR / "generate_sitemap.py")], cwd=str(ROOT_DIR))
if res_sitemap.returncode != 0:
    print("[!] Failed to generate sitemap. Aborting.")
    sys.exit(1)

# Step 2: Build Project with TypeScript & Vite
print("\n[2/5] Compiling and Building Production Bundle (tsc + vite)...")
build_cmd = "npm.cmd" if os.name == "nt" else "npm"
res_build = subprocess.run([build_cmd, "run", "build"], cwd=str(ROOT_DIR), shell=True)
if res_build.returncode != 0:
    print("[!] Build failed! Aborting deployment.")
    sys.exit(1)
print("[+] Build succeeded!")

# Step 3: SFTP Upload to Hostinger Production Server
print("\n[3/5] Uploading to Production Server (SFTP)...")
host = '62.72.48.180'
port = 65002
username = 'u999140348'
password = 'Soufy@nasasin1430'
remote_dir = 'domains/chiffrepro.com/public_html'

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect(host, port, username, password)
    sftp = ssh.open_sftp()

    def upload_dir(local_path, remote_path):
        try:
            sftp.stat(remote_path)
        except IOError:
            print(f"Creating remote directory {remote_path}")
            sftp.mkdir(remote_path)

        for item in os.listdir(local_path):
            l_path = os.path.join(local_path, item)
            r_path = f"{remote_path}/{item}"
            if os.path.isdir(l_path):
                upload_dir(l_path, r_path)
            else:
                sftp.put(l_path, r_path)

    upload_dir(str(DIST_DIR), remote_dir)
    sftp.close()
    ssh.close()
    print("[+] Upload completed successfully!")
except Exception as e:
    print(f"[!] Upload Error: {e}")
    sys.exit(1)

# Step 4: Health Check
print("\n[4/5] Performing Live Health Check on https://chiffrepro.com...")
try:
    req = urllib.request.Request(
        "https://chiffrepro.com",
        headers={"User-Agent": "ChiffrePro-Deployer/1.0"}
    )
    with urllib.request.urlopen(req, timeout=10) as response:
        status_code = response.getcode()
        print(f"[+] Live response HTTP {status_code} OK!")
except Exception as e:
    print(f"[?] Health check warning: {e}")

# Step 5: Git Commit and Push
print("\n[5/5] Synchronizing GitHub Repository...")
try:
    subprocess.run(["git", "add", "."], cwd=str(ROOT_DIR))
    subprocess.run(["git", "commit", "-m", "chore(deploy): automated build, programmatic tools and sitemap update"], cwd=str(ROOT_DIR))
    subprocess.run(["git", "push", "origin", "main"], cwd=str(ROOT_DIR))
    print("[+] Git repository synchronized!")
except Exception as e:
    print(f"[?] Git push warning: {e}")

print("\n==================================================")
print("[+] DEPLOYMENT COMPLETE & LIVE ON CHIFFREPRO.COM")
print("==================================================")
