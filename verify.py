import os, re, sys
ROOT = os.path.dirname(os.path.abspath(__file__))

def strip(code):
    code = re.sub(r'/\*.*?\*/', '', code, flags=re.S)
    out, i, n, prev = [], 0, len(code), ''
    while i < n:
        c = code[i]
        if c in '\'"`':
            q = c; i += 1
            while i < n:
                if code[i] == '\\': i += 2; continue
                if code[i] == q: i += 1; break
                i += 1
            prev = 'a'; continue
        if c == '/':
            if i + 1 < n and code[i + 1] == '/':
                while i < n and code[i] != '\n': i += 1
                prev = 'a'; continue
            if prev == '' or not (prev.isalnum() or prev in '$_.)])'):
                i += 1; cls = False
                while i < n:
                    ch = code[i]
                    if ch == '\\': i += 2; continue
                    if ch == '[': cls = True
                    elif ch == ']': cls = False
                    elif ch == '/' and not cls: i += 1; break
                    i += 1
                prev = 'a'; continue
            out.append(c); prev = c; i += 1; continue
        out.append(c)
        if not c.isspace(): prev = c
        i += 1
    return re.sub(r'//[^\n]*', '', ''.join(out))

def exists(u):
    u = u.split('#')[0].split('?')[0]
    if u.startswith(('/','./')):
        p = u[1:]
        if not p or p.endswith('/'): p += 'index.html'
        return os.path.isfile(os.path.join(ROOT, p))
    return True

anyf = False
for f in sys.argv[1:]:
    p = os.path.join(ROOT, f)
    if not os.path.isfile(p): print('MISSING', f); anyf = True; continue
    c = strip(open(p, encoding='utf-8').read())
    ok = c.count('(')==c.count(')') and c.count('[')==c.count(']') and c.count('{')==c.count('}')
    print(('JS OK  ' if ok else 'JS BAD ') + f)
    if not ok: anyf = True
if not anyf: print('ALL JS OK')