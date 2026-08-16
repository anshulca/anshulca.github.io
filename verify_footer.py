import urllib.request
import sys
import json

pages = [
    ('/', 'Home'),
    ('/jap/', 'Jap Hub'),
    ('/jap/custom-naam-jap/', 'Custom Naam Jap'),
    ('/lekhan/naam-lekhan/', 'Naam Lekhan'),
    ('/lekhan/digital-jap-notebook/', 'Notebook'),
    ('/lekhan/writing-challenges/', 'Challenges'),
]

base = 'http://localhost:8080'
results = []

for path, name in pages:
    try:
        r = urllib.request.urlopen(base + path, timeout=5)
        html = r.read().decode('utf-8')
        ok = True
        msgs = []
        if '&lt;a href' in html or '&lt;a' in html:
            ok = False; msgs.append('escaped HTML in footer')
        if '<a href="https://www.linkedin.com/in/anshulkarwa/"' not in html:
            ok = False; msgs.append('missing LinkedIn link')
        if 'CA Anshul Karwa' not in html:
            ok = False; msgs.append('missing creator name')
        credit_present = ('Built by CA Anshul Karwa' in html or 'By CA Anshul Karwa' in html)
        # Check credit uses real <a> not escaped
        if 'data-credit' in html and '&lt;a' in html:
            ok = False; msgs.append('escaped credit link')
        results.append({'page': name, 'path': path, 'ok': ok, 'credit_found': credit_present, 'messages': msgs})
    except Exception as e:
        results.append({'page': name, 'path': path, 'ok': False, 'error': str(e)})

print(json.dumps(results, indent=2))
