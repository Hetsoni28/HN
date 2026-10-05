import re

with open('components/organisms/featured-work.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'All projects .*', 'All projects &rarr;', text)

with open('components/organisms/featured-work.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
