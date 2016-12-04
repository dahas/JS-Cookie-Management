
# Cookie Management

A script to easily handle cookies.

## Requirements

- jQuery

## Usage

- Include the file after the jQuery library:
<pre>&lt;script src="[your_path]/cookie_mgmt.js" type="text/javascript">&lt;/script></pre> 
- Make an instance:
<pre>var Cookie = new Cookie(name[, expDays, path]);</pre> 
- Adding a value to the cookie (creates cookie, if it doesn´t exist):
<pre>Cookie.set(parameter, value);</pre> 
- Reading a paramter from the cookie:
<pre>Cookie.get(parameter);</pre> 
- Deleting a parameter and its value (removes the cookie, if no further parameters exist):
<pre>Cookie.clear(parameter);</pre> 
- Remove the cookie:
<pre>Cookie.remove();</pre>
