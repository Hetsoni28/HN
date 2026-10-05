import re

with open('components/organisms/navbar.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace any corrupted arrow after "Start a Project"
text = re.sub(r'Start a Project .*', 'Start a Project &rarr;', text)

with open('components/organisms/navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
