s=open('app3.html').read()
for ph,f in [('/*__CONTENT__*/','content.js'),('/*__CONTENT2__*/','content2.js'),('/*__CONTENT3__*/','content3.js'),('/*__PROGRAM__*/','program.js')]:
    assert ph in s, ph; s=s.replace(ph,open(f).read())
open('index.html','w').write(s)
a=s.index('<script>')+8;b=s.rindex('</script>');open('/tmp/claude-0/x.js','w').write(s[a:b])
