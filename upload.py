import paramiko
import os

host = '62.72.48.180'
port = 65002
username = 'u999140348'
password = 'Soufy@nasasin1430'

local_dir = 'dist'
remote_dir = 'domains/chiffrepro.com/public_html'

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

print("Connecting to host...")
try:
    ssh.connect(host, port, username, password)
    print("Connected!")
    sftp = ssh.open_sftp()
    
    def upload_dir(local_path, remote_path):
        try:
            sftp.stat(remote_path)
        except IOError:
            print(f"Creating directory {remote_path}")
            sftp.mkdir(remote_path)
            
        for item in os.listdir(local_path):
            l_path = os.path.join(local_path, item)
            r_path = f"{remote_path}/{item}"
            if os.path.isdir(l_path):
                upload_dir(l_path, r_path)
            else:
                print(f"Uploading {l_path} -> {r_path}")
                sftp.put(l_path, r_path)
                
    upload_dir(local_dir, remote_dir)
    print("Upload completed successfully!")
    sftp.close()
    ssh.close()
except Exception as e:
    print(f"Error: {e}")
