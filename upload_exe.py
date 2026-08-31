import paramiko
import os
import sys

host = '62.72.48.180'
port = 65002
username = 'u999140348'
password = 'Soufy@nasasin1430'

local_file = r'C:\Users\1515\OneDrive\Documents\Dev\invoice\src-tauri\target\release\bundle\nsis\Chiffre Pro_1.0.0_x64-setup.exe'
remote_file = 'domains/chiffrepro.com/public_html/downloads/ChiffrePro_Setup.exe'
remote_dir = 'domains/chiffrepro.com/public_html/downloads'

if not os.path.exists(local_file):
    print(f"Error: Local file {local_file} not found!")
    sys.exit(1)

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

print("Connecting to host...")
try:
    ssh.connect(host, port, username, password)
    print("Connected!")
    sftp = ssh.open_sftp()
    
    try:
        sftp.stat(remote_dir)
    except IOError:
        print(f"Creating remote directory {remote_dir}")
        sftp.mkdir(remote_dir)
        
    print(f"Uploading {local_file} -> {remote_file}")
    
    # define progress callback
    def print_progress(transferred, total):
        sys.stdout.write(f"\rTransferred: {transferred/1024/1024:.2f} MB / {total/1024/1024:.2f} MB")
        sys.stdout.flush()

    sftp.put(local_file, remote_file, callback=print_progress)
    print("\nUpload completed successfully!")
    sftp.close()
    ssh.close()
except Exception as e:
    print(f"\nError: {e}")
