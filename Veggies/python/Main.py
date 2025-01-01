import mysql.connector


class Account_details:
    def __init__(self,a,n,p,b):
        self.acn = a
        self.name = n
        self.pin = p
        self.balance = b
    
    def create_account(self):
        con = getConnection()
        cursor = con.cursor()
        query = """
            INSERT INTO testdb.account_details (account_number, account_holder_name, pincode, current_balance)
            VALUES (%s, %s, %s, %s)
        """

        values = (self.acn, self.name, self.pin, self.balance)
        cursor.execute(query, values)
        con.commit()


def getConnection():
    try:
        connection = mysql.connector.connect(
            host="localhost",     # Replace with your MySQL server host
            user="root",          # Replace with your MySQL username
            password="0000",   # Replace with your MySQL password
            database = "testdb"
        )
        # cursor = connection.cursor()  # Create a cursor object
        return connection
    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return 0

def initializeApplication():
    con = getConnection()
    cursor = con.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS testdb")
    cursor.execute("CREATE TABLE IF NOT EXISTS testdb.account_details("+
	"account_number VARCHAR(10),"+
	"account_holder_name VARCHAR(50),"+
	"pincode VARCHAR(4),"+
	"current_balance INT(10))")

initializeApplication()

ac = Account_details("7894578","Arbaz Faniband","1245",500)
ac.create_account()
