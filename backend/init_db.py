import pymysql

DB_USER = "root"
DB_PASS = "Hamsik95@3" # Change this if your MySQL root user has a password!
DB_HOST = "localhost"
DB_NAME = "mediflow_db"

def create_database():
    try:
        # Connect to MySQL Server (no specific database yet)
        connection = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASS)
        cursor = connection.cursor()
        
        # Create the database schema safely
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME};")
        print(f"✅ Schema `{DB_NAME}` successfully created (or already existed)!")
        
        connection.close()
    except pymysql.MySQLError as e:
        if e.args[0] == 1045:
            print("❌ Access denied. If your MySQL 'root' user has a password, please update DB_PASS inside init_db.py AND database.py")
        else:
            print(f"❌ Error creating database: {e}")

if __name__ == "__main__":
    create_database()
