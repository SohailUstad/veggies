import tkinter as tk

# Create the main window
root = tk.Tk()
root.title("Hello World App")

# Set the size of the window
root.geometry("300x150")

# Create a label to display the message
message = tk.Label(root, text="Hello, World!", font=("Arial", 16))
message.pack(pady=50)  # Add some padding to position the message

# Start the tkinter main loop
root.mainloop()
