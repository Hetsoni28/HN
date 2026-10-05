import os

corrupted_replacements = {
    'â”€': '─',
    'â€”': '—',
    'â€“': '–',
    'â†’': '→',
    'ΓåÆ': '→',
    'ΓÇö': '—',
    'Â·': '·',
    'ðŸ“Ž': '📎',
    'ðŸ¤ ': '🤝',
    'â• ': '═',
    'ï¸': '',
    'âœ': '✍',
    'âš': '⚙',
}

files_to_check = [
    'app/(main)/contact/actions.ts',
    'app/(main)/contact/page.tsx',
    'app/(main)/cookie-policy/page.tsx',
    'app/(main)/privacy-policy/page.tsx',
    'app/(main)/referral/actions.ts',
    'components/molecules/structured-data.tsx',
    'components/organisms/case-study-sections.tsx',
    'components/organisms/navbar.tsx'
]

for filepath in files_to_check:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove BOM if present
        if content.startswith('\ufeff'):
            content = content[1:]
            
        modified = False
        for bad, good in corrupted_replacements.items():
            if bad in content:
                content = content.replace(bad, good)
                modified = True
                
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Fixed encoding in {filepath}')

