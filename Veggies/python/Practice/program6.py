#Write a program to swap two numbers without 
# using a third variable.

a = 30
b = 20

# b,a=a,b
a = a+b
b = a-b
a = a-b

print(a,b)