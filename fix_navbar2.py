import re

with open('components/organisms/navbar.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('â”€â”€', '──')

with open('components/organisms/navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
