#Write a program to calculate the factorial of a number.
#5! = 5*4*3*2*1
#8! = 8*7*6*5*4*3*2*1

x = 6
factorial = 1
for i in range(x,1,-1):
    factorial = factorial * i
    print(factorial,i)

print(factorial)