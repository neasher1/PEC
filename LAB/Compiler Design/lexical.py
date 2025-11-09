import re

char_var_pattern = r'ch_[a-zA-Z0-9][a-zA-Z0-9]*'
int_var_pattern = r'[i-nI-N]_[a-zA-Z0-9]+'
binary_pattern = r'0(0|1)[01]*'
int_number_pattern = r'[1-9][0-9]*'

with open('input.txt', 'r') as file:
    text = file.read()

tokens = re.findall(r'\b\w+|[,.?!]', text)  
output = []

for token in tokens:
    if re.match(char_var_pattern, token):
        output.append('Character variable ' + token)
    elif re.match(int_var_pattern, token):
        output.append('Integer variable ' + token)
    elif re.match(binary_pattern, token):
        output.append('Binary Number ' + token)
    elif re.match(int_number_pattern, token):
        output.append('Integer Number ' + token)
    else:
        output.append('Undefined ' + token)

print("RESULT:\n")
print("Input: " + '"' + text + '"\n')
for item in output:
    print(item)
